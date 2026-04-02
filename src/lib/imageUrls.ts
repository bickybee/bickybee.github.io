import manifestJson from '../generated/responsiveImageManifest.json' with { type: 'json' }
import { encodePublicAssetPath } from './encodePublicAssetPath'

export type WebpVariant = { w: number; src: string }

const manifest = manifestJson as Record<string, WebpVariant[]>

/** PNG/JPEG paths (GIF/SVG unchanged). Manifest covers optimized masters under /media/projects and /media/about. */
export function isRasterWebpCandidate(src: string): boolean {
  return /\.(png|jpe?g)$/i.test(src)
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
