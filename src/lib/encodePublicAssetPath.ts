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
