/**
 * Batch-convert JPG/PNG images to WebP using sharp.
 *
 * Usage:  node optimize-images.mjs
 *
 * Targets:
 *   - public/assets/*.{jpg,png}   → public/assets/*.webp
 *   - img/build/*.jpg             → img/build/*.webp
 *   - img/*.png                   → img/*.webp
 */

import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const QUALITY = 80

const targets = [
    { dir: 'public/assets', extensions: ['.jpg', '.jpeg', '.png'] },
    { dir: 'img/build', extensions: ['.jpg', '.jpeg'] },
    { dir: 'img', extensions: ['.png'], maxDepth: 0 },
]

async function convertDir({ dir, extensions, maxDepth }) {
    let files
    try {
        files = await readdir(dir)
    } catch {
        console.log(`⏭  Skipping ${dir} (not found)`)
        return
    }

    for (const file of files) {
        const filePath = join(dir, file)
        const fileStat = await stat(filePath)

        // Skip directories (unless we want recursion, but we don't for img/ root)
        if (fileStat.isDirectory()) continue

        const ext = extname(file).toLowerCase()
        if (!extensions.includes(ext)) continue

        const outName = basename(file, extname(file)) + '.webp'
        const outPath = join(dir, outName)

        try {
            const info = await sharp(filePath)
                .webp({ quality: QUALITY })
                .toFile(outPath)

            const originalKB = (fileStat.size / 1024).toFixed(0)
            const newKB = (info.size / 1024).toFixed(0)
            const savings = (((fileStat.size - info.size) / fileStat.size) * 100).toFixed(0)
            console.log(`✅ ${filePath} → ${outPath}  (${originalKB}KB → ${newKB}KB, -${savings}%)`)
        } catch (err) {
            console.error(`❌ Failed: ${filePath} — ${err.message}`)
        }
    }
}

console.log('🖼  Converting images to WebP...\n')

for (const target of targets) {
    await convertDir(target)
}

console.log('\n✨ Done!')
