import { useState } from 'react'
import {
  encodePublicAssetPath,
  isRasterWebpCandidate,
  webpSrcSetFromManifest,
} from '../lib/imageUrls'

type ResponsiveImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  id?: string
  title?: string
  style?: React.CSSProperties
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  id,
  title,
  style,
  loading = 'lazy',
  fetchPriority,
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false)

  if (!isRasterWebpCandidate(src)) {
    return (
      <img
        id={id}
        title={title}
        src={encodePublicAssetPath(src)}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  const srcSet = webpSrcSetFromManifest(src)
  const fallback = encodePublicAssetPath(src)

  if (!srcSet) {
    return (
      <img
        id={id}
        title={title}
        src={fallback}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  return (
    <picture style={{ display: 'block', width: '100%' }}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        id={id}
        title={title}
        src={fallback}
        alt={alt}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0.92,
          transition: 'opacity 0.2s ease-out',
        }}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
      />
    </picture>
  )
}
