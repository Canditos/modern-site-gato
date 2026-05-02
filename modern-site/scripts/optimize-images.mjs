import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './public/images';
const QUALITY = 80; // Slightly lower for better savings
let converted = 0, skipped = 0, saved = 0;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await getFiles(full));
    else files.push(full);
  }
  return files;
}

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  if (filePath.includes('node_modules')) return;

  const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  try {
    const srcStat = await stat(filePath);
    
    // Always convert and overwrite to ensure resizing is applied

    const metadata = await sharp(filePath).metadata();
    const isTeam = filePath.includes('team') || ['rita', 'catarina', 'claudia', 'raquel', 'ana', 'marco', 'carla', 'joao'].some(name => filePath.includes(name));
    
    let pipeline = sharp(filePath);
    
    // Resize team photos to 800px max (still high res for retina)
    if (isTeam && metadata.width > 800) {
        pipeline = pipeline.resize(800, null, { withoutEnlargement: true });
    } else if (metadata.width > 1200) {
        // Resize other large images to 1200px max
        pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(outPath);
      
    const dstStat = await stat(outPath);
    const savedKB = Math.round((srcStat.size - dstStat.size) / 1024);
    
    if (savedKB > 0) {
        saved += savedKB;
        converted++;
        console.log(`✅ ${basename(filePath)} (${Math.round(srcStat.size/1024)}KB) → ${basename(outPath)} (${Math.round(dstStat.size/1024)}KB) [Saved ${savedKB}KB]`);
    } else {
        // If webp is larger, keep it anyway but log it
        converted++;
        console.log(`ℹ️ ${basename(filePath)} → ${basename(outPath)} (No savings)`);
    }
  } catch (err) {
    console.error(`❌ ${filePath}: ${err.message}`);
  }
}

const files = await getFiles(IMAGES_DIR);
console.log(`\n🔍 Found ${files.length} files in ${IMAGES_DIR}\n`);
// Run sequentially to avoid memory issues with many sharp instances
for (const file of files) {
    await convertToWebP(file);
}
console.log(`\n🎉 Done! Converted: ${converted} | Skipped: ${skipped} | Saved: ~${Math.round(saved/1024)}MB\n`);
