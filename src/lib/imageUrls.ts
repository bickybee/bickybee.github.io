import manifestJson from '../generated/responsiveImageManifest.json' with { type: 'json' }

export type WebpVariant = { w: number; src: string }

const manifest = manifestJson as Record<string, WebpVariant[]>

/** Paths in data/markdown point at PNG/JPEG masters; GIFs and SVGs stay as-is. */
export function isRasterWebpCandidate(src: string): boolean {
  return /\.(png|jpe?g)$/i.test(src)
}

/** Encode path segments for URLs (spaces etc. in /public filenames). */
export function encodePublicAssetPath(assetPath: string): string {
  if (!assetPath.startsWith('/')) {
    return assetPath
      .split('/')
      .map((seg) => encodeURIComponent(seg))
      .join('/')
  }
  const rest = assetPath.slice(1)
  return (
    '/' +
    rest
      .split('/')
      .map((seg) => encodeURIComponent(seg))
      .join('/')
  )
}

export function getWebpVariants(masterSrc: string): WebpVariant[] | undefined {
  const list = manifest[masterSrc]
  if (!list?.length) return undefined
  return list
}

/** Comma-separated srcset for `<source>`; descriptors match intrinsic widths on disk. */
export function webpSrcSetFromManifest(masterSrc: string): string | undefined {
  const variants = getWebpVariants(masterSrc)
  if (!variants?.length) return undefined
  return variants
    .map((v) => `${encodePublicAssetPath(v.src)} ${v.w}w`)
    .join(', ')
}
