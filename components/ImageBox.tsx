import Image from "next/image";
import Link from "next/link";

export default function ImageBox({ src, alt }: { src: string; alt: string; }) {

  return (
    src.endsWith('.gif') ? (
      <Link href={`/api${src}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api${src}`}
          alt={alt}
          style={{ width: '100%', height: 'auto' }}
        />
      </Link>
    ) : (
      <Link href={`/api${src}`}>
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