# MDX Blog Setup

This blog is powered by Next.js 15 with MDX support. You can write blog posts using Markdown with JSX (MDX) and they will be automatically rendered.

## File Structure

```
site/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog index page (lists all posts)
│   │   └── [year]/
│   │       └── [slug]/
│   │           ├── page.tsx      # Individual blog post page
│   │           └── not-found.tsx # 404 page for missing posts
│   ├── layout.tsx
│   └── page.tsx
├── blog/
│   └── [year]/
│       └── [slug].mdx            # Your MDX blog posts
└── components/
    └── mdx-components.tsx        # Custom MDX component styling
```

## Writing Blog Posts

1. Create a new `.mdx` file in the `blog/[year]/` directory (e.g., `blog/2025/my-post.mdx`)
2. Start with a markdown heading for the title:

```mdx
# My Blog Post Title

This is the content of my blog post.

## Subheading

You can use all standard markdown features:
- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks
- And more!

You can also use React components:

<CustomComponent prop="value" />
```

3. The post will be automatically available at `/blog/[year]/[slug]`

## URL Structure

- All posts: `/blog`
- Individual post: `/blog/2025/devtest` (for `blog/2025/devtest.mdx`)

## Custom Components

You can customize how MDX elements are rendered by editing `components/mdx-components.tsx`. This file includes:
- Styled headings (h1, h2, h3)
- Code block styling
- Link handling (internal vs external)
- Image optimization with Next.js Image
- List and blockquote styling

## Adding New Features

### Frontmatter Support

To add frontmatter (metadata) support, you can use `gray-matter`:

```bash
bun add gray-matter
```

Then update your blog post pages to parse frontmatter.

### Syntax Highlighting

For code syntax highlighting, add `rehype-highlight`:

```bash
bun add rehype-highlight
```

Update `next.config.mjs`:

```javascript
import rehypeHighlight from 'rehype-highlight'

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeHighlight],
  },
})
```

### Table of Contents

For automatic table of contents generation, use `remark-toc`:

```bash
bun add remark-toc remark-slug
```

## Development

Start the dev server:
```bash
bun run dev
```

Build for production:
```bash
bun run build
```

Start production server:
```bash
bun run start
```
