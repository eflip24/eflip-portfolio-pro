

## Geometric Mesh Hero Background

Replace the current floating shapes with a full-screen animated geometric mesh using an HTML canvas element rendered behind the hero content.

### How it works
- Create a `GeometricMesh` React component using `<canvas>` with `requestAnimationFrame`
- Draw a field of points that form triangles/polygons via Delaunay-style connections
- Points drift slowly with sine-wave motion, edges glow orange (`#FF6600`) at low opacity
- Triangles fill with very subtle orange gradients that pulse
- On scroll, the mesh subtly shifts perspective (parallax)
- Canvas is absolutely positioned behind hero text, full viewport

### Changes
1. **New file**: `src/components/GeometricMesh.tsx` — canvas-based animated mesh
2. **Edit**: `src/pages/Index.tsx` — remove `FloatingShape` components, add `<GeometricMesh />` in hero section background

### Visual details
- ~80 randomly placed vertices across the viewport
- Connect vertices within a distance threshold to form triangles
- Orange wireframe lines at 15-20% opacity, triangle fills at 3-5% opacity
- Vertices slowly orbit their origin points
- Responsive: recalculates on window resize

