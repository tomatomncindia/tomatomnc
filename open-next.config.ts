import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext adapter that compiles the Next.js build into a Cloudflare Worker.
// The site is mostly static + one server action (contact form), so the
// default config (no extra caches) is all we need.
export default defineCloudflareConfig();
