---

id: 9
featured: true
element: false
views: 650
title: "How Does Apple Make Their Product Design So Wondrous"
author: "Peter Nzana"
authorGender: M
authorImage: "/peterNz.jpg"
category: "Technology"
description: "About that question , we're down the hall to give some response, How Does Apple Make Their Product Design So Wondrous "
date: "2024-10-10T00:00:00Z"
lastUpdated: "2024-11-21T00:00:00Z"
image: "/blog/apple.jpg"
tags:
 - "apple"
 - "computer"
 - "product design"
seo:
  metaDescription: "Discover the benefits of learning Mandarin for engineers in a globalized world."
  keywords: "Mandarin, engineers, technology, language learning"
toc:
  - text: "Introduction"
    anchor: "introduction"
  - text: "Step 1: Vocabulary"
    anchor: "step-1-vocabulary"
  - text: "Step 2: Practice"
    anchor: "step-2-practice"
resources:
  - title: "Learning Mandarin for Engineers"
    url: "https://example.com/mandarin-for-engineers"
  - title: "Docker Installation Guide"
    url: "https://example.com/docker-install"

---

```jsx
   // pages/search.js
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import { format } from "date-fns";
import Link from "next/link";
export default function SearchResultsPage({ blogs }) {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useRouter();

  useEffect(() => {
    if (query.query) {
      setLoading(true);
      const fuse = new Fuse(blogs, {
        keys: ["title", "description", "tags", "category"],
        includeScore: true,
        threshold: 0.4,
      });
      const results = fuse.search(query.query);
      setFilteredBlogs(results.map((r) => r.item));
      setLoading(false);
    }
  }, [query.query, blogs]);

  return (
    <Layout>

    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <Link key={blog.id} href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`}>

              <div key={index} className="my-3 py-2 border-b border-gray-200">
                <h2 className="text-xl underline font-semibold">{blog.title}</h2>
                <p className="my-3">{blog.description}</p>

                <div className="flex gap-2 items-center justify-between">
                <p className="flex items-center gap-2">

                <img src={blog.authorImage} width="24" className="rounded-full ring-2  object-cover"/>
                <span className="dark:text-gray-50 text-gray-700">{blog.author}</span>
                </p>
                <div className="text-gray-600 mb-1 dark:text-gray-300 text-sm">
                {format(new Date(blog.date), 'MMMM dd, yyyy')}</div>

                <div className="text-sm text-blue-500 mb-1 hidden sm:block">{blog.category}</div>

              </div>              </div></Link>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
    </Layout>
  );
}

// Fetch blogs data at build time from blogs.json
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "markdown", "blogs.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const blogs = JSON.parse(jsonData);

  return {
    props: {
      blogs,
    },
  };
}
```

---
## data/categories.js 

Quelle sont les manieres le plus directe pour remplacer dans un fichier ce qui le rend facile a faire

```jsx
export const categories = [
    {
      id: 1,
      name: 'Well-being',
      description: 'Tips and tricks to improve your wellness.',
      slug: 'well-being',
      icon: '/icons/wellbeing-icon.png',
    },
    {
      id: 2,
      name: 'Life',
      description: 'Articles about life balance and lifestyle.',
      slug: 'life',
      icon: '/icons/life-icon.png',
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Find peace in everyday life.',
      slug: 'marketing',
      icon: '/icons/peaceful-life-icon.png',
    },
    {
      id: 4,
      name: 'English ',
      description: 'Where you will find best english course.',
      slug: 'english',
      icon: '/icons/peaceful-life-icon.png',
    },
  ];
  ```
