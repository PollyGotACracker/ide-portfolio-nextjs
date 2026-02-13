import Image from "next/image";
import Link from "next/link";

export default function ImageBox({ src, alt }: { src: string; alt: string; }) {

  return (
    src.endsWith('.gif') ? (
      <Link href={`/api${src}`} prefetch={false}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api${src}`}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
        />
      </Link>
    ) : (
      <Link href={`/api${src}`} prefetch={false}>
        <Image
          src={`/api${src}`}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} />
      </Link>)
  );
}