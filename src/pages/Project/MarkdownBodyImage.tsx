import type { ImgHTMLAttributes } from 'react'
import { encodePublicAssetPath } from '../../lib/encodePublicAssetPath'

export function MarkdownBodyImage({
  src,
  alt,
  className,
  style,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
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
