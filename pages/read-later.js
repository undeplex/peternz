// pages/read-later.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { addToReadLater, removeFromReadLater, isInReadLater } from '@/utils/readlater';
import SingleBlog from '@/components/SingleBlog';
import Head from 'next/head';
import { TrashIcon } from '@heroicons/react/24/outline';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { FaCopy } from 'react-icons/fa';
const ReadLater = () => {
  const [readLaterBlogs, setReadLaterBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('readLater')) || [];
    setReadLaterBlogs(savedBlogs);
  }, []);

  const handleDelete = (slug) => {
    const updatedBlogs = readLaterBlogs.filter((blog) => blog.slug !== slug);
    localStorage.setItem('readLater', JSON.stringify(updatedBlogs));
    setReadLaterBlogs(updatedBlogs);
  };

  const handleFlush = () => {
    localStorage.removeItem('readLater');
    setReadLaterBlogs([]);
  };
// Calculate reading time
function calculateReadingTime(content) {
  const processor = remark().use(remarkParse);
  const plainText = processor.processSync(content).toString();
  const wordsPerMinute = 200;
  const words = plainText.split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}
  return (
    <Layout>
       <Head>
        <title>Read Later | Peternz</title>
        <meta
          name="description"
          content="In order to read some blog later they've got to be added in here using the bookmark icon provided for each blog post"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://peternz.netlify.app/read-later" />
      </Head>
      <div className="max-w-6xl mx-auto p-6 pt-14">
       
        <h1 className="text-4xl font-bold mb-8">Read Later</h1>

        {/* Flush Button */}
        <button
          onClick={handleFlush}
          className="px-4 py-3 bg-opacity-25 text-red-500 bg-red-500 rounded mb-6"
        >
          Flush All
        </button>

        {readLaterBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {readLaterBlogs.map((blog) => (
              <div key={blog.slug} className="">
                <p className="text-2xl font-bold">{blog.title}</p>
                <p className="text-gray-500">{blog.description}</p>
                <div className="flex justify-between items-center">
                <p className="text-gray-500">Par {blog.author}</p>
                <p className="flex items-center gap-2">{calculateReadingTime(blog.content)}</p>

                  
                <button
                  onClick={() => handleDelete(blog.slug)}
                  className="mt-2 px-4 py-2 size-12 grid place-content-center rounded-full bg-opacity-15  dark:text-gray-400 bg-gray-500 text-gray-600 "
                >
                  <TrashIcon className="size-7"/>
                </button>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs in your Read Later list.</p>
        )}
      </div>
    </Layout>
  );
};

export default ReadLater;