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
import ReactPaginate from 'react-paginate';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [sortOrder, setSortOrder] = useState('mostRecent');
  const [loading, setLoading] = useState(false);

  const POSTS_PER_PAGE = 10;

  const simulateLoading = (callback) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 2000); // 2 seconds delay
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

  const pageCount = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    currentPage * POSTS_PER_PAGE,
    (currentPage + 1) * POSTS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    simulateLoading(() => {
      setCurrentPage(selected);
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
            setCurrentPage(0);
          }}
        />

        {loading ? (
        
          <SkeletonLoader/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-6">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="cursor-pointer">
              
                <SingleBlogTemplate blog={blog}/>
             
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 list-none">
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center space-x-2'}
            pageClassName={'mx-2'}
            pageLinkClassName="px-4 py-2 border rounded-md hover:bg-gray-100"
            activeLinkClassName="bg-blue-500 text-white"
            previousLinkClassName="px-4 py-2 border rounded-md mr-2"
            nextLinkClassName="px-4 py-2 border rounded-md ml-2"
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;