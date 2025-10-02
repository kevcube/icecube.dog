# WebGPU Hero Component

A lightweight, GPU-accelerated hero image component for blog posts with flowing tricolor gradients.

## Features

✨ **Tiny Bundle Size** - No image assets, just shader code (~3KB)
🚀 **60 FPS Animation** - Smooth GPU-accelerated rendering
🎨 **Customizable Colors** - Easy color palette configuration
🔄 **Fallback Support** - CSS gradient for browsers without WebGPU
⚡ **Zero Dependencies** - Just React and WebGPU

## Usage

### Basic Usage

```tsx
import { WebGPUHero } from '@/components/webgpu-hero';

<WebGPUHero className="w-full h-64 rounded-lg" />
```

### Custom Colors

```tsx
<WebGPUHero
  className="w-full h-64"
  colors={[
    [1.0, 0.2, 0.2],  // Red (RGB 0-1)
    [0.2, 1.0, 0.2],  // Green
    [0.2, 0.2, 1.0],  // Blue
  ]}
/>
```

### In MDX Blog Posts

```mdx
import { WebGPUHero } from '@/components/webgpu-hero';

<WebGPUHero className="w-full h-64 rounded-lg mb-8" />

# My Blog Post

Your content here...
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS classes for styling |
| `colors` | `[number, number, number][]` | Blue/Purple/Pink | Array of 3 RGB colors (0-1 range) |

## How It Works

The component uses WebGPU to render a fullscreen quad with a custom WGSL fragment shader:

1. **Vertex Shader** - Creates a fullscreen triangle strip
2. **Fragment Shader** - Generates flowing gradients using sine waves
3. **Animation Loop** - Updates time uniform for smooth animation
4. **Fallback** - CSS gradient for unsupported browsers

### Shader Magic

The shader combines multiple sine waves based on UV coordinates and time:

```wgsl
let wave1 = sin(uv.x * 3.0 + time * 0.5) * 0.5 + 0.5;
let wave2 = sin(uv.y * 4.0 - time * 0.3) * 0.5 + 0.5;
let wave3 = sin((uv.x + uv.y) * 2.0 + time * 0.4) * 0.5 + 0.5;

var color = mix(color1, color2, wave1);
color = mix(color, color3, wave2 * wave3);
```

## Browser Support

### WebGPU (Animated Gradient)
- ✅ Chrome 113+ (Desktop & Android)
- ✅ Edge 113+
- ✅ Safari 18+ (macOS Sonoma+)
- ✅ Firefox Nightly (with flag)

### Fallback (CSS Gradient)
- ✅ All modern browsers

## Performance

- **GPU Memory**: ~4 bytes (one float for time)
- **CPU Usage**: Minimal (just time updates)
- **Network**: 0 KB (no image downloads)
- **Bundle**: ~3 KB (component + shader code)

## Installation

The component is already set up in this project. To use it:

1. Import in your MDX:
   ```tsx
   import { WebGPUHero } from '@/components/webgpu-hero';
   ```

2. Add to your post:
   ```tsx
   <WebGPUHero className="w-full h-64 rounded-lg" />
   ```

## Customization Ideas

### Different Color Schemes

```tsx
// Sunset
colors={[
  [1.0, 0.4, 0.0],  // Orange
  [1.0, 0.2, 0.4],  // Pink
  [0.5, 0.1, 0.5],  // Purple
]}

// Ocean
colors={[
  [0.0, 0.4, 0.8],  // Deep Blue
  [0.2, 0.7, 0.9],  // Sky Blue
  [0.3, 0.9, 0.8],  // Cyan
]}

// Forest
colors={[
  [0.2, 0.5, 0.2],  // Green
  [0.4, 0.7, 0.3],  // Light Green
  [0.1, 0.3, 0.2],  // Dark Green
]}
```

### Different Sizes

```tsx
// Full width header
<WebGPUHero className="w-full h-96" />

// Card size
<WebGPUHero className="w-64 h-48 rounded-xl" />

// Banner
<WebGPUHero className="w-full h-32" />
```

## Technical Details

- **Language**: WGSL (WebGPU Shading Language)
- **Pipeline**: Render pipeline with vertex + fragment shaders
- **Topology**: Triangle list (6 vertices for fullscreen quad)
- **Uniforms**: Single float for animation time
- **Precision**: 32-bit float operations

## See It In Action

Check out the demo blog post: `/blog/2025/webgpu-hero-demo`

## Credits

Built with:
- [WebGPU API](https://www.w3.org/TR/webgpu/)
- [WGSL](https://www.w3.org/TR/WGSL/)
- React 19
- Next.js 15
