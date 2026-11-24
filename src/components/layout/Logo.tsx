import Link from "next/link";
import Image from "next/image";

// One full-colour wordmark works on both the light navbar and the dark footer.
export function Logo() {
  return (
    <Link href="/" aria-label="Tomato M&C India, Home" className="inline-flex items-center">
      <Image
        src="/tomatomncindia.webp"
        alt="Tomato M&C India"
        width={1066}
        height={444}
        priority
        sizes="(max-width: 768px) 140px, 160px"
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
