/**
 * Removes checkerboard transparency pattern from image while strictly preserving
 * the exact subject, face, sunglasses, clothing, and proportions.
 */
export function removeCheckerboardBackground(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0);
  let imgData;
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    // If tainted by CORS, return original image
    return img.src;
  }

  const { width, height, data } = imgData;
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper: check if a pixel belongs to the neutral light-gray/white checkerboard pattern
  const isCheckerboardPixel = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // Already transparent
    if (a < 20) return true;

    // Check if nearly neutral (achromatic) and light
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const colorDiff = maxVal - minVal;
    const avg = (r + g + b) / 3;

    return colorDiff <= 15 && avg >= 170;
  };

  // 1. Seed queue with outer border pixels
  for (let x = 0; x < width; x++) {
    // Top border
    const topIdx = (0 * width + x) * 4;
    if (isCheckerboardPixel(topIdx)) {
      visited[x] = 1;
      queue.push(x, 0);
    }
    // Bottom border
    const botIdx = ((height - 1) * width + x) * 4;
    if (isCheckerboardPixel(botIdx)) {
      visited[(height - 1) * width + x] = 1;
      queue.push(x, height - 1);
    }
  }

  for (let y = 0; y < height; y++) {
    // Left border
    const leftIdx = (y * width + 0) * 4;
    if (!visited[y * width + 0] && isCheckerboardPixel(leftIdx)) {
      visited[y * width + 0] = 1;
      queue.push(0, y);
    }
    // Right border
    const rightIdx = (y * width + (width - 1)) * 4;
    if (!visited[y * width + (width - 1)] && isCheckerboardPixel(rightIdx)) {
      visited[y * width + (width - 1)] = 1;
      queue.push(width - 1, y);
    }
  }

  // 2. BFS flood-fill outwards from the borders
  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const idx = (y * width + x) * 4;

    // Clear alpha to transparent
    data[idx + 3] = 0;

    // 4-neighborhood
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          const nIdx = nPos * 4;
          if (isCheckerboardPixel(nIdx)) {
            visited[nPos] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // 3. Optional edge smoothing: soften 1-pixel boundary
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pos = y * width + x;
      const idx = pos * 4;
      if (data[idx + 3] > 0) {
        const adjacentCleared =
          data[((y - 1) * width + x) * 4 + 3] === 0 ||
          data[((y + 1) * width + x) * 4 + 3] === 0 ||
          data[(y * width + (x - 1)) * 4 + 3] === 0 ||
          data[(y * width + (x + 1)) * 4 + 3] === 0;

        if (adjacentCleared) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxVal = Math.max(r, g, b);
          const minVal = Math.min(r, g, b);
          if (maxVal - minVal < 25 && (r + g + b) / 3 > 160) {
            data[idx + 3] = 0;
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}
