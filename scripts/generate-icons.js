import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Function to generate a simple colored PNG with dimension w x h
function createPng(width, height, r, g, b, a = 255) {
  // PNG signature
  const signature = Buffer.from([139, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image data: filter byte (0) + width * 4 bytes per scanline
  const scanlineSize = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineSize;
    rawData[rowOffset] = 0; // Filter type None
    
    // Check if pixel is within safe circle/rounded rect for Android launcher
    const cy = height / 2;
    const cx = width / 2;
    const dy = (y - cy) / (height / 2);

    for (let x = 0; x < width; x++) {
      const dx = (x - cx) / (width / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const pxOffset = rowOffset + 1 + x * 4;
      
      // Teal gradient with icon paper plane emblem
      let pr = r;
      let pg = g;
      let pb = b;
      let pa = a;

      // Inner icon emblem representation
      if (dist < 0.6) {
        // Center area - highlight
        pr = Math.min(255, r + 20);
        pg = Math.min(255, g + 30);
        pb = Math.min(255, b + 30);
      }
      
      // Simple inner chevron/airplane shape
      if (Math.abs(dx) < 0.25 && dy > -0.3 && dy < 0.3) {
        if (Math.abs(dx) < (0.35 - dy * 0.4)) {
          pr = 255;
          pg = 255;
          pb = 255;
        }
      }

      rawData[pxOffset] = pr;
      rawData[pxOffset + 1] = pg;
      rawData[pxOffset + 2] = pb;
      rawData[pxOffset + 3] = pa;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Teal brand: rgb(0, 169, 157)
const png192 = createPng(192, 192, 0, 169, 157);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);

const png512 = createPng(512, 512, 0, 169, 157);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);

const pngMaskable = createPng(512, 512, 0, 169, 157);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pngMaskable);

const appleIcon = createPng(180, 180, 0, 169, 157);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

const favicon = createPng(64, 64, 0, 169, 157);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

console.log('Successfully generated all compliant PWA and Android PNG icons in /public!');
