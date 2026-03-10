# 🎨 WebGPU Hero - Quick Reference

## 📝 Add to Any Blog Post

```mdx
import { HeroWithPreset } from '@/components/hero-presets';

<HeroWithPreset scheme="ocean" className="w-full h-64 rounded-lg mb-8" />

# Your Post Title
```

## 🎨 Color Schemes

| Scheme | Colors | Vibe |
|--------|--------|------|
| `default` | Blue/Purple/Pink | Modern/Tech |
| `sunset` | Orange/Pink/Purple | Warm/Vibrant |
| `ocean` | Deep Blue/Sky/Cyan | Cool/Calm |
| `forest` | Green/Light Green/Dark | Natural/Eco |
| `fire` | Red/Orange/Yellow | Energetic |
| `aurora` | Teal/Blue/Purple | Mystical |
| `candy` | Pink/Purple/Light Blue | Playful |
| `midnight` | Dark Blues/Purple | Dramatic |

## 📐 Common Sizes

```mdx
<!-- Large header -->
<HeroWithPreset scheme="sunset" className="w-full h-96" />

<!-- Medium banner -->
<HeroWithPreset scheme="ocean" className="w-full h-64 rounded-lg" />

<!-- Small accent -->
<HeroWithPreset scheme="fire" className="w-full h-32" />
```

## 🎨 Custom Colors

```mdx
import { WebGPUHero } from '@/components/webgpu-hero';

<WebGPUHero
  colors={[
    [1.0, 0.2, 0.2],  // Red (0-1 range)
    [0.2, 1.0, 0.2],  // Green
    [0.2, 0.2, 1.0],  // Blue
  ]}
  className="w-full h-64"
/>
```

## ✨ Benefits

- **3-5 KB** bundle (vs 50-500 KB images)
- **60 FPS** GPU animation
- **0 network** requests
- **Auto fallback** for old browsers

## 📱 See Demo

[/blog/2025/webgpu-hero-demo](http://localhost:3000/blog/2025/webgpu-hero-demo)
