# Quick Reference: Import-Based Blog

## ✨ How It Works

Your blog uses **pure JavaScript imports** - no file system reading at runtime!

## 📝 Add a New Post (3 Steps)

### 1. Create MDX file
```bash
site/blog/2025/my-awesome-post.mdx
```

### 2. Write content
```mdx
# My Awesome Post

This is my blog post content...
```

### 3. Register in `blog/posts.ts`
```typescript
// Add import at top
import MyAwesomePost from './2025/my-awesome-post.mdx';

// Add to allPosts array
{
  year: '2025',
  slug: 'my-awesome-post',
  title: 'My Awesome Post',
  description: 'An awesome post about coding',
  date: 'October 1, 2025',
  component: MyAwesomePost,
}
```

## 🔗 URL Format
```
/blog/{year}/{slug}
```

Example: `/blog/2025/my-awesome-post`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `blog/posts.ts` | Registry - imports all MDX, defines metadata |
| `app/blog/page.tsx` | Blog index - lists all posts |
| `app/blog/[year]/[slug]/page.tsx` | Post renderer - displays MDX |
| `blog/2025/*.mdx` | Your blog posts |

## ✅ Benefits

- **Fast** - Zero file I/O at runtime
- **Type-safe** - Full TypeScript support
- **Simple** - Pure imports, no magic
- **Optimized** - Build-time compilation

## 🚀 Current Posts

- `/blog/2025/devtest`
- `/blog/2025/getting-started-with-mdx`

## 📚 Documentation

- `BLOG_ARCHITECTURE.md` - Detailed architecture
- `ADDING_BLOG_POSTS.md` - Step-by-step guide
- `MDX_BLOG_README.md` - MDX features guide
