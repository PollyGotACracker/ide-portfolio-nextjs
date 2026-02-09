import Image from "next/image";
import Link from "next/link";

export default function ImageBox({ src, alt }: { src: string; alt: string; }) {
  return (
    <Link href={`/api${src}`}>
      <Image
        src={`/api${src}`}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }} />
    </Link>
  );
}