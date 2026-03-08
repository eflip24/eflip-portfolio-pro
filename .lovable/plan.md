

# Convert Uploaded Images to WebP

## Approach
Use the browser Canvas API to convert images to WebP format client-side before uploading to storage. This avoids needing a backend function.

## Changes

**`src/pages/AdminProjectEdit.tsx`**:

1. Add a `convertToWebP` utility function that:
   - Reads the file as a data URL via `FileReader`
   - Draws it onto an offscreen `<canvas>`
   - Exports as `image/webp` at 0.85 quality via `canvas.toBlob()`
   - Returns a new `File` object with `.webp` extension

2. Update `uploadImage` to call `convertToWebP(file)` before uploading, and use a `.webp` extension in the storage path.

This applies to all image uploads: project image, SEO image, and gallery section images — since they all flow through the same `uploadImage` function.

