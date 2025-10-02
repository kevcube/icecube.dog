# Adding New Blog Posts

Your blog now uses pure MDX imports with no file system reading. Here's how to add new posts:

## Steps to Add a New Post

### 1. Create the MDX file

Create your blog post as an `.mdx` file in the appropriate year folder:

```bash
site/blog/2025/my-new-post.mdx
```

### 2. Write your content

```mdx
# My New Post Title

This is the content of my post...
```

### 3. Add the post to the index

Open `site/blog/posts.ts` and:

1. Import your MDX file:
```typescript
import MyNewPost from './2025/my-new-post.mdx';
```

2. Add it to the `allPosts` array:
```typescript
export const allPosts: BlogPost[] = [
  {
    year: '2025',
    slug: 'my-new-post',
    title: 'My New Post Title',
    description: 'A brief description of the post',
    date: 'October 1, 2025', // Optional
    component: MyNewPost,
  },
  // ... other posts
];
```

### 4. That's it!

Your post is now available at `/blog/2025/my-new-post`

## Complete Example

### File: `site/blog/2025/typescript-tips.mdx`
```mdx
# TypeScript Tips and Tricks

Here are some useful TypeScript patterns...

## Type Guards

Use type guards for runtime type checking:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
\`\`\`
```

### File: `site/blog/posts.ts` (add to imports and array)
```typescript
import TypeScriptTips from './2025/typescript-tips.mdx';

export const allPosts: BlogPost[] = [
  {
    year: '2025',
    slug: 'typescript-tips',
    title: 'TypeScript Tips and Tricks',
    description: 'Useful TypeScript patterns for everyday development',
    date: 'October 1, 2025',
    component: TypeScriptTips,
  },
  // ... existing posts
];
```

## Benefits of This Approach

✅ **Type-safe** - MDX files are imported as typed components
✅ **No file system reads** - Pure JavaScript imports
✅ **Build-time optimization** - Next.js can statically optimize imports
✅ **Explicit control** - You explicitly define metadata for each post
✅ **Better performance** - No runtime file system operations
✅ **Static generation** - All routes are pre-rendered at build time

## Post Metadata

Each post requires:
- `year` - The year folder (e.g., '2025')
- `slug` - The URL slug (must match filename without .mdx)
- `title` - Display title
- `component` - The imported MDX component

Optional:
- `description` - Brief summary (shows on blog index)
- `date` - Publication date (shows on blog index)

## URL Structure

Posts are available at: `/blog/{year}/{slug}`

Examples:
- `/blog/2025/devtest`
- `/blog/2025/getting-started-with-mdx`
- `/blog/2025/my-new-post`
