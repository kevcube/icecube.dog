# Using WebGPU Hero Images in Blog Posts

## Quick Start

Add a flowing, animated hero image to any MDX blog post in 3 ways:

### 1. Default Colors (Blue/Purple/Pink)

```mdx
import { WebGPUHero } from '@/components/webgpu-hero';

<WebGPUHero className="w-full h-64 rounded-lg mb-8" />

# Your Blog Post Title

Content goes here...
```

### 2. Preset Color Schemes

```mdx
import { HeroWithPreset } from '@/components/hero-presets';

<HeroWithPreset scheme="sunset" className="w-full h-64 rounded-lg mb-8" />

# Your Blog Post Title

Content goes here...
```

**Available Presets:**
- `default` - Blue, Purple, Pink
- `sunset` - Orange, Pink, Purple
- `ocean` - Deep Blue, Sky Blue, Cyan
- `forest` - Green, Light Green, Dark Green
- `fire` - Red, Orange, Yellow
- `aurora` - Teal, Blue, Purple
- `candy` - Pink, Purple, Light Blue
- `midnight` - Dark Blue, Purple, Almost Black

### 3. Custom Colors

```mdx
import { WebGPUHero } from '@/components/webgpu-hero';

<WebGPUHero
  className="w-full h-64 rounded-lg mb-8"
  colors={[
    [1.0, 0.2, 0.2],  // Red (RGB values 0-1)
    [0.2, 1.0, 0.2],  // Green
    [0.2, 0.2, 1.0],  // Blue
  ]}
/>

# Your Blog Post Title

Content goes here...
```

## Sizing Examples

### Full Width Header
```mdx
<HeroWithPreset scheme="ocean" className="w-full h-96" />
```

### Medium Banner
```mdx
<HeroWithPreset scheme="sunset" className="w-full h-64 rounded-lg" />
```

### Small Accent
```mdx
<HeroWithPreset scheme="fire" className="w-full h-32 rounded-md" />
```

### Card Style
```mdx
<HeroWithPreset scheme="forest" className="w-64 h-48 rounded-xl mx-auto" />
```

## Styling with Tailwind

Common patterns:

```mdx
<!-- Rounded corners -->
<HeroWithPreset scheme="aurora" className="w-full h-64 rounded-2xl" />

<!-- With margin -->
<HeroWithPreset scheme="candy" className="w-full h-64 rounded-lg my-8" />

<!-- With shadow -->
<HeroWithPreset scheme="midnight" className="w-full h-64 rounded-lg shadow-2xl" />

<!-- Responsive height -->
<HeroWithPreset scheme="sunset" className="w-full h-48 md:h-64 lg:h-96 rounded-lg" />
```

## Performance

- **Bundle Impact**: ~3-5KB total (all color schemes included)
- **Runtime**: GPU-accelerated, 60fps
- **Network**: 0 additional requests
- **Browser Support**: WebGPU or CSS fallback

## Color Conversion Helper

RGB values in WebGPU are 0-1, not 0-255. To convert:

```
WebGPU value = RGB value / 255
```

Examples:
- RGB(255, 100, 50) → [1.0, 0.39, 0.20]
- RGB(50, 150, 200) → [0.20, 0.59, 0.78]
- RGB(0, 255, 0) → [0.0, 1.0, 0.0]

## Complete Example

```mdx
import { HeroWithPreset } from '@/components/hero-presets';

<HeroWithPreset
  scheme="ocean"
  className="w-full h-80 rounded-2xl mb-12 shadow-xl"
/>

# Building Modern Web Applications

Discover the latest techniques in web development, from WebGPU
to cutting-edge React patterns.

## Introduction

Your content here...
```

## Browser Compatibility

| Browser | Animated (WebGPU) | Fallback (CSS) |
|---------|-------------------|----------------|
| Chrome 113+ | ✅ | ✅ |
| Edge 113+ | ✅ | ✅ |
| Safari 18+ | ✅ | ✅ |
| Firefox | ⚠️ (flag) | ✅ |
| Older browsers | ❌ | ✅ |

All browsers get a hero image - modern browsers get the animated version!
