/**
 * HTTP byte-range support for static assets served by the Worker.
 *
 * Why: Workers Static Assets ignores `Range` and always answers 200 with the
 * whole file. Safari (macOS + iOS) refuses to play <video> from a server that
 * doesn't answer its `Range: bytes=0-1` probe with 206 Partial Content, and
 * seeking in every browser relies on ranges. The worker entry routes
 * /videos/* here (wrangler.jsonc → assets.run_worker_first).
 *
 * Sizes come from worker/video-sizes.json (written by
 * scripts/encode-videos.mjs), because the ASSETS binding gives no
 * Content-Length inside the worker.
 *
 * Cost: no buffering — the asset is streamed and only the requested slice is
 * forwarded, so CPU stays tiny (the Free plan allows 10 ms per request).
 */

type ByteRange = { start: number; end: number };

/** Workers-runtime stream that sends a Content-Length for a streamed body. */
declare const FixedLengthStream:
  | (new (length: number) => TransformStream<Uint8Array, Uint8Array>)
  | undefined;

/**
 * Parses a single `bytes=` range (RFC 9110 §14.1.2) against a known size.
 * Returns null when the header is absent, malformed or multi-range — the
 * spec allows ignoring it and sending the full 200 response.
 */
export function parseRange(
  header: string | null,
  size: number,
): ByteRange | "unsatisfiable" | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;

  let start: number;
  let end: number;
  if (m[1] === "") {
    // Suffix range: the last N bytes.
    const n = Number(m[2]);
    if (n === 0) return "unsatisfiable";
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return "unsatisfiable";
  return { start, end };
}

/** Streams only bytes [start, end] (inclusive) of `body`, then cancels it. */
function sliceStream(
  body: ReadableStream<Uint8Array>,
  start: number,
  end: number,
): ReadableStream<Uint8Array> {
  let pos = 0;
  const sliced = body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        const chunkStart = pos;
        pos += chunk.byteLength;
        if (pos <= start) return; // entirely before the range
        const from = Math.max(0, start - chunkStart);
        const to = Math.min(chunk.byteLength, end + 1 - chunkStart);
        controller.enqueue(chunk.subarray(from, to));
        if (chunkStart + to > end) controller.terminate(); // range complete
      },
    }),
  );

  if (typeof FixedLengthStream === "undefined") return sliced;
  const fixed = new FixedLengthStream(end - start + 1);
  sliced.pipeTo(fixed.writable).catch(() => {});
  return fixed.readable;
}

type AssetFetcher = { fetch(request: Request): Promise<Response> };

/**
 * Serves an asset from the ASSETS binding, honouring `Range`.
 *
 * `knownSize` is the file's byte length from worker/video-sizes.json: the
 * ASSETS binding streams bodies without a Content-Length header, and a 206
 * response must state the total size. Without a size we fall back to 200.
 */
export async function serveWithRanges(
  request: Request,
  assets: AssetFetcher,
  knownSize?: number,
) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return assets.fetch(request);
  }

  // Fetch the full asset (the store ignores Range anyway); keep conditional
  // headers so 304 revalidation still works.
  const upstreamHeaders = new Headers(request.headers);
  upstreamHeaders.delete("range");
  const res = await assets.fetch(
    new Request(request.url, { method: "GET", headers: upstreamHeaders }),
  );
  if (res.status !== 200 || !res.body) return res;

  const size = Number(res.headers.get("content-length")) || knownSize || 0;
  const headers = new Headers(res.headers);
  headers.set("accept-ranges", "bytes");

  const range = size > 0 ? parseRange(request.headers.get("range"), size) : null;
  const isHead = request.method === "HEAD";

  if (range === null) {
    if (!headers.has("content-length")) headers.set("content-length", String(size));
    if (isHead) await res.body.cancel();
    return new Response(isHead ? null : res.body, { status: 200, headers });
  }

  if (range === "unsatisfiable") {
    await res.body.cancel();
    headers.set("content-range", `bytes */${size}`);
    headers.delete("content-length");
    return new Response(null, { status: 416, headers });
  }

  headers.set("content-range", `bytes ${range.start}-${range.end}/${size}`);
  headers.set("content-length", String(range.end - range.start + 1));
  if (isHead) {
    await res.body.cancel();
    return new Response(null, { status: 206, headers });
  }
  return new Response(sliceStream(res.body, range.start, range.end), {
    status: 206,
    headers,
  });
}
