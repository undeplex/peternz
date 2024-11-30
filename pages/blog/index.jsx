import React, { useState, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Layout from '@/components/Layout';
import SingleBlog from '@/components/SingleBlog';
import Filters from '@/components/Filters';
import SEOBlog from '@/components/SEOBlog';
import SkeletonLoader from '@/components/SkeletonLoader';
import SingleBlogTemplate from '@/components/SingleBlogTemplate';

export async function getStaticProps() {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const fileNames = await fs.readdir(markdownDir);

  const blogs = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(markdownDir, fileName);
      const fileContents = await fs.readFile(filePath, 'utf8');

      const { data: frontMatter, content } = matter(fileContents);
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);

      return {
        id: fileName.replace(/\.md$/, ''),
        slug: frontMatter.title.toLowerCase().replace(/ /g, '-'),
        ...frontMatter,
        content: processedContent.toString(),
      };
    })
  );

  return {
    props: { blogs },
  };
}

const BlogPage = ({ blogs }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent');

  const INITIAL_POSTS = 5;
  const POSTS_INCREMENT = 2;

  useEffect(() => {
    // Initialize with the first set of blogs
    setDisplayedBlogs(filteredBlogs.slice(0, INITIAL_POSTS));
  }, [filteredBlogs]);

  const simulateLoading = (callback) => {
    setShowMoreLoading(true);
    setTimeout(() => {
      callback();
      setShowMoreLoading(false);
    }, 1500); // 1.5 seconds delay
  };

  const applyFilters = () => {
    simulateLoading(() => {
      let updatedBlogs = [...blogs];
      updatedBlogs.sort((a, b) => {
        switch (sortOrder) {
          case 'mostRecent':
            return new Date(b.date) - new Date(a.date);
          case 'oldest':
            return new Date(a.date) - new Date(b.date);
          case 'mostViewed':
            return b.views - a.views;
          case 'leastViewed':
            return a.views - b.views;
          default:
            return 0;
        }
      });
      setFilteredBlogs(updatedBlogs);
    });
  };

  useEffect(() => {
    applyFilters();
  }, [sortOrder]);

  const handleShowMore = () => {
    simulateLoading(() => {
      const newPostsCount = displayedBlogs.length + POSTS_INCREMENT;
      setDisplayedBlogs(filteredBlogs.slice(0, newPostsCount));
    });
  };

  return (
    <Layout>
      {/* SEO Component */}
      <SEOBlog
        title="Blog Page"
        description="Discover the latest blogs, articles, and updates from our website."
        url="https://www.example.com/blog"
        image="/blog-header.jpg" // Replace with a relevant image URL
      />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Catalogue Complet des articles</h1>

        {/* Filters */}
        <Filters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          resetFilters={() => {
            setSortOrder('mostRecent');
            setFilteredBlogs([...blogs]);
            setDisplayedBlogs(blogs.slice(0, INITIAL_POSTS));
          }}
        />

        {showMoreLoading && <SkeletonLoader />}

        {!showMoreLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedBlogs.map((blog) => (
              <div key={blog.id} className="cursor-pointer">
                <SingleBlogTemplate blog={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {displayedBlogs.length < filteredBlogs.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              disabled={showMoreLoading}
            >
              {showMoreLoading ? 'Loading...' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;