import React from 'react';
import SingleBlog from './SingleBlog';
import SingleBlogTemplate from './SingleBlogTemplate';

const MostViewedBlogs = ({ posts }) => {
  return (
    <div>
      <div className="grid px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {posts.map((blog, index) => (
          <SingleBlogTemplate key={index} blog={blog} />
          
        ))}
      </div>
    </div>
  );
};

export default MostViewedBlogs;