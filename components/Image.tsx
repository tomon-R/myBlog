import NextImage, { ImageProps } from "next/image";

const basePath = process.env.NODE_ENV === "production" ? "/myBlog" : "";

export default function Image({ src, ...props }: ImageProps) {
  const imgSrc = typeof src === "string" ? `${basePath}${src}` : src;

  return <NextImage src={imgSrc} {...props} />;
}
