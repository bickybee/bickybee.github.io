#!/usr/bin/env node
/**
 * Generates WebP derivatives next to each source image under public/media/projects
 * using withoutEnlargement. Files are named {basename}-{intrinsicWidth}.webp.
 * Writes src/generated/responsiveImageManifest.json mapping master URL -> variant list.
 */
import { readdir, unlink, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('public/media/projects')
const PUBLIC_ROOT = path.resolve('public')
const MANIFEST_PATH = path.resolve('src/generated/responsiveImageManifest.json')
const TARGET_WIDTHS = [600, 900, 1200]
const WEBP = { quality: 85, effort: 4 }

const rasterExt = /\.(png|jpe?g)$/i

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toPublicUrl(absFile) {
  const rel = path.relative(PUBLIC_ROOT, absFile).replace(/\\/g, '/')
  return '/' + rel
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

function shouldProcess(filePath) {
  const base = path.basename(filePath)
  if (base.startsWith('.') || base.endsWith('~')) return false
  if (!rasterExt.test(base)) return false
  return true
}

async function removeStaleWebpVariants(dir, stem) {
  const re = new RegExp(`^${escapeRegExp(stem)}-(\\d+)\\.webp$`)
  let names
  try {
    names = await readdir(dir)
  } catch {
    return
  }
  for (const name of names) {
    if (!re.test(name)) continue
    await unlink(path.join(dir, name))
  }
}

async function main() {
  /** @type {Record<string, { w: number; src: string }[]>} */
  const manifest = {}
  let fileCount = 0
  let variantCount = 0

  for await (const abs of walk(ROOT)) {
    if (!shouldProcess(abs)) continue

    const dir = path.dirname(abs)
    const stem = path.basename(abs, path.extname(abs))
    await removeStaleWebpVariants(dir, stem)

    const masterUrl = toPublicUrl(abs)
    /** @type { { w: number; src: string }[] } */
    const variants = []
    let lastWidth = -1

    for (const tw of TARGET_WIDTHS) {
      const { data, info } = await sharp(abs)
        .rotate()
        .resize({
          width: tw,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp(WEBP)
        .toBuffer({ resolveWithObject: true })

      const w = info.width
      if (w == null || w === lastWidth) continue
      lastWidth = w

      const outName = `${stem}-${w}.webp`
      const outAbs = path.join(dir, outName)
      await sharp(data).toFile(outAbs)

      variants.push({ w, src: toPublicUrl(outAbs) })
      variantCount += 1
    }

    if (variants.length > 0) {
      manifest[masterUrl] = variants
    }
    fileCount += 1
    console.log(path.relative(process.cwd(), abs))
  }

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
  const sorted = Object.keys(manifest)
    .sort()
    .reduce((acc, key) => {
      acc[key] = manifest[key]
      return acc
    }, {})
  await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf8')

  console.error(
    `Processed ${fileCount} source image(s), wrote ${variantCount} WebP variant(s). Manifest: ${path.relative(process.cwd(), MANIFEST_PATH)}`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
