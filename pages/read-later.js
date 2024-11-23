// pages/read-later.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { addToReadLater, removeFromReadLater, isInReadLater } from '@/utils/readlater';
import SingleBlog from '@/components/SingleBlog';

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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 pt-14">
        <h1 className="text-4xl font-bold mb-8">Read Later</h1>

        {/* Flush Button */}
        <button
          onClick={handleFlush}
          className="px-4 py-2 bg-red-500 text-white rounded mb-6"
        >
          Flush All
        </button>

        {readLaterBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {readLaterBlogs.map((blog) => (
              <div key={blog.slug} className="border p-4 rounded-lg shadow-lg">
                <SingleBlog blog={blog} />
                <button
                  onClick={() => handleDelete(blog.slug)}
                  className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Remove from Read Later
                </button>
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