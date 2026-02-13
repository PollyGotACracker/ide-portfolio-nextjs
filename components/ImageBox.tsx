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
  const isUnoptimize = src.endsWith('.gif');

  const fullStyle = { width: '100%', height: 'auto' };
  const sizeProps = isUnoptimize
    ? { style: fullStyle }
    : { width: 0, height: 0, sizes: "100vw", style: fullStyle };


  const Img = !isUnoptimize ?
    <Image
      src={url}
      alt={alt}
      {...sizeProps}
      {...props}
    /> :
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        {...sizeProps}
        {...props}
      />
    </>;

  if (isLink) {
    return <Link href={url} prefetch={false}>{Img}</Link>;
  } else {
    return Img;
  }
}
