import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join('C:', 'Users', 'ASUS', '.gemini', 'antigravity', 'brain', '9f108619-4d94-4847-84d5-ce2117475cfc');
const destDir = path.join(__dirname, 'public', 'assets');

async function removeWhiteBg(inputPath, outputPath) {
  // Read the image as raw pixel data
  const image = sharp(inputPath);
  const { width, height, channels } = await image.metadata();

  // Ensure we have RGBA
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();

  // Threshold: pixels close to white become transparent
  const threshold = 240;
  for (let i = 0; i < rawBuffer.length; i += 4) {
    const r = rawBuffer[i];
    const g = rawBuffer[i + 1];
    const b = rawBuffer[i + 2];

    if (r > threshold && g > threshold && b > threshold) {
      rawBuffer[i + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  await sharp(rawBuffer, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('OK:', path.basename(outputPath));
}

const files = [
  ['cta_kids_left_1773815406905.png', 'cta-kids-reading.webp'],
  ['cta_kids_right_1773815424655.png', 'cta-kids-playing.webp'],
  ['cta_school_doodle_1773813034348.png', 'cta-doodles.webp'],
];

for (const [src, dest] of files) {
  await removeWhiteBg(path.join(srcDir, src), path.join(destDir, dest));
}
console.log('All done! Backgrounds removed and converted to WebP.');
