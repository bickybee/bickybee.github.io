import type { ImgHTMLAttributes } from 'react'
import { encodePublicAssetPath } from '../../lib/imageUrls'

type MarkdownBodyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wideImages?: boolean
}

export function MarkdownBodyImage({
  src,
  alt,
  className,
  style,
  wideImages: _wideImages,
  ...rest
}: MarkdownBodyImageProps) {
  if (!src) return null

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
