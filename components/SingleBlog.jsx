import React from 'react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import Image from 'next/image';
import TruncateText from './TruncateText'; // Import the component

// Calculate reading time
function calculateReadingTime(content) {
  const processor = remark().use(remarkParse);
  const plainText = processor.processSync(content).toString();
  const wordsPerMinute = 200;
  const words = plainText.split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

// Calculate elapsed time since published
function getElapsedTime(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

const SingleBlog = ({ blog }) => {
  // Determine fallback author image based on gender
  const defaultAuthorImage =
    blog.authorGender === 'F'
      ? '/default-avatar-2.png'
      : '/default-avatar.png';

  return (
    <div className="dark:text-gray-500 border-b border-gray-500 pb-4 transition-all duration-500 group">
      {/* Blog Image */}
      <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
        <div className="w-full h-[150px] overflow-hidden mb-2 rounded-xl relative">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-xl group-hover:scale-[110%] group-hover:transition-all duration-500"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIiAvPjwvc3ZnPg=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-2xl font-bold dark:text-white play group-hover:underline">
          {blog.title}
        </p>
        <p className="dark:text-gray-400  text-gray-700 my-3">
          <TruncateText text={blog.description} limit={14} truncateBy="word" />
        </p>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-1 items-center">
            <img
              src={blog.authorImage || defaultAuthorImage}
              width={34}
              height={34}
              alt={blog.author}
              className="rounded-full ring-2 object-cover"
            />
            <span className="dark:text-gray-50 text-gray-700">{blog.author}</span>
          </div>
          <div className="text-sm text-blue-500 mb-1">{blog.category}</div>
        </div>

        <div className="text-gray-600 flex justify-between mt-3 dark:text-gray-300 text-sm">
          <div>
            {/* {format(new Date(blog.date), 'dd MMMM, yyyy')}  */}
            <span className="ml-2">{getElapsedTime(blog.date)}</span>
          </div>
          <p className="flex items-center gap-2">{calculateReadingTime(blog.content)}</p>
        </div>
      </Link>
    </div>
  );
};

export default SingleBlog;