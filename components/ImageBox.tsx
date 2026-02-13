import Image, { ImageProps } from "next/image";
import Link from "next/link";

type ImageBoxProps = Omit<ImageProps, 'src'> & { src: string; isRemote?: boolean; isLink?: boolean; };
export default function ImageBox({
  src,
  alt,
  isRemote = false,
  isLink = true,
  ...props
}: ImageBoxProps) {
  const url = !isRemote ? `/api${src}` : src;
  const isUnoptimized = src.endsWith('.gif');
  const sizeProps = { width: 0, height: 0, sizes: "100vw", style: { width: '100%', height: 'auto' } };

  const Img =
    <Image
      src={url}
      alt={alt}
      {...sizeProps}
      {...props}
      {...(isUnoptimized && { unoptimized: true })}
    />;

  if (isLink) {
    return <Link href={url} prefetch={false}>{Img}</Link>;
  } else {
    return Img;
  }
}
