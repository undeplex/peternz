---

id: 11
featured: true
element: false
views: 1200
title: "Build a Blog Application with Next.js 14: A Step-by-Step Tutorial "
author: "Peter Nzana"
authorImage: "/profiler2.jpg"
category: "Technology"
description: "In this tutorial, we’ll build a fully functional  blog application using Next.js 14, leveraging its newest features for dynamic routing, SEO, and performance optimization. This project is designed to help you learn practical Next.js 14 concepts step-by-step. "
date: "2024-11-24T00:12:00Z"
lastUpdated: "2024-11-24T00:14:00Z"
image: "/blog/next-js.png"
tags:
 - "web-development"
 - "application"
seo:
  metaDescription: "Discover the benefits of learning Mandarin for engineers in a globalized world."
  keywords: "Mandarin, engineers, technology, language learning"
toc:
  - text: "1. Project Overview"
    anchor: "Project Overview"
  - text: "2. Setting Up the Environment?"
    anchor: "Setting Up the Environment"
  - text: "3. Creating a Dynamic Blog App"
    anchor: "Creating a Dynamic Blog App"
  - text: "4. Adding SEO Optimization"
    anchor: "4. Adding SEO Optimization"
  - text: "5. Deploying the Application"
    anchor: "Deploying the Application"
  - text: "6. Additional Resources"
    anchor: "Additional Resources"



resources:
  - title: "Documentation Officielle Next Js"
    url: "https://vercel.app/next-js"
  - title: "How Do I Create Web App Using Next Js ?"
    url: "https://vercel.app"
  - title: "Blogging App Using Next Js For A Full-Stack Application"
    url: "https://medium.com"
  - title: "JSONPlaceholder API (Mock Data)"
    url: "https://medium.com"
  - title: "Vercel Deployment Guide"
    url: "https://medium.com"

---

## Project Overview
In this project, we’ll build a dynamic blog application with the following features:

- Dynamic routes for blog posts.

- Real-time fetching of blog content from a mock API.

- SEO-optimized pages using Next.js 14 metadata tools.

- Responsive design with CSS modules.

By the end of this tutorial, you will have a deployable blog application.

## Setting Up the Environment

1. Install Node.js
Ensure you have Node.js version 18 or higher installed on your system.


2. Initialize the Project
Run the following command to set up a new Next.js project:
```bash
npx create-next-app@latest blog-app
cd blog-app
```


3. Start the Development Server
Launch the server to view the app:
```bash
npm run dev
```
Open your browser and navigate to 

<p className="bg-yellow-200 px-3 py-2 rounded-lg">
http://localhost:3000.
</p>


## Creating a Dynamic Blog App

1. Setting Up the Blog Structure

Create a folder for the blog pages under the app directory:
```bash
mkdir -p app/blog/[slug]
```
2. Dynamic Routing with App Router

Create a dynamic route for blog posts:
```jsx
// app/blog/[slug]/page.js
import { use } from 'react';

async function fetchPost(slug) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

export default function BlogPost({ params }) {
  const post = use(fetchPost(params.slug));

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```
Key Concepts:

Dynamic Routing: [slug] allows the app to handle different URLs dynamically.

Server-Side Rendering: use(fetchPost) fetches data on the server for better SEO.


3. Fetching Blog Posts

To display a list of blog posts, create an index page:
```jsx
// app/blog/page.js
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <section>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```
4. Styling the Application

Add styles using CSS Modules:
```css
/* styles/blog.module.css */
.container {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 800px;
  padding: 1rem;
}

h1 {
  color: #333;
}
```

Import the styles in your components:
```jsx
import styles from './styles/blog.module.css';

export default function Blog() {
  // Use `styles.container` for styling
}
```

## Adding SEO Optimization

Use the Metadata API to add SEO tags to the blog:

```js
export const metadata = {
  title: 'Dynamic Blog App | Next.js 14',
  description: 'A fully functional blog app built with Next.js 14.',
};
```
For individual blog posts, generate dynamic metadata:
```js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  return {
    title: `${post.title} | Blog`,
    description: post.body.substring(0, 150),
  };
}
```
## Deploying the Application

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy the App:
Run the following command and follow the prompts:
```bash
vercel
```

3. Live URL: Your app will be live at a unique URL provided by Vercel.


