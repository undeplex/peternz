---
id: 11
featured: true
element: false
views: 1200
title: "Build a Dynamic Blog with Next.js 14"
author: "Peter Nzana"
authorImage: "/peterNz.jpg"
category: "Technology"
description: "Step-by-step guide to build a modern blog with Next.js 14 App Router, dynamic routing and SEO optimization."
date: "2024-11-24T00:12:00Z"
lastUpdated: "2024-11-24T00:14:00Z"
image: "/blog/next-js.png"
tags:
 - "nextjs"
 - "web-development"
 - "react"
seo:
  metaDescription: "Build a fast, SEO-friendly blog with Next.js 14. Learn dynamic routing, data fetching and deployment."
  keywords: "Next.js 14, blog tutorial, dynamic routing, React"
toc:
  - text: "Setup"
    anchor: "setup"
  - text: "Blog Structure"
    anchor: "structure"
  - text: "Dynamic Pages"
    anchor: "dynamic-pages"
  - text: "Deployment"
    anchor: "deployment"

resources:
  - title: "Next.js Documentation"
    url: "https://nextjs.org/docs"
  - title: "Vercel Deployment"
    url: "https://vercel.com/docs"
---

## Setup {#setup}

Create a new Next.js 14 project:

```bash
npx create-next-app@latest nextjs-blog
cd nextjs-blog
npm run dev

Blog Listing Page

Create app/blog/page.js:

```jsx
import Link from 'next/link';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Our Blog</h1>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 50)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Dynamic Blog Pages {#dynamic-pages}

Create app/blog/[slug]/page.js:

```jsx
async function getPost(slug) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: `${post.title} | Next.js Blog`,
    description: post.body.substring(0, 160),
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

Deployment {#deployment}

1. Push code to GitHub
2. Import project on Vercel
3. Deploy automatically

Your blog will be live at your-app.vercel.app

```