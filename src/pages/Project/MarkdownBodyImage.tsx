import type { ImgHTMLAttributes } from 'react'
import { ResponsiveImage } from '../../components/ResponsiveImage'
import { encodePublicAssetPath, isRasterWebpCandidate } from '../../lib/imageUrls'

type MarkdownBodyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wideImages?: boolean
}

export function MarkdownBodyImage({
  src,
  alt,
  className,
  style,
  wideImages,
  ...rest
}: MarkdownBodyImageProps) {
  if (!src) return null

  if (/\.gif$/i.test(src)) {
    return (
      <img
        {...rest}
        src={encodePublicAssetPath(src)}
        alt={alt ?? ''}
        className={className}
        style={style}
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (!isRasterWebpCandidate(src)) {
    return (
      <img
        {...rest}
        src={encodePublicAssetPath(src)}
        alt={alt ?? ''}
        className={className}
        style={style}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <ResponsiveImage
      src={src}
      alt={alt ?? ''}
      sizes={
        wideImages
          ? '(max-width: 900px) 96vw, min(1000px, 85vw)'
          : '(max-width: 900px) 92vw, min(800px, 72vw)'
      }
      loading="lazy"
      className={className}
      style={style}
    />
  )
}
