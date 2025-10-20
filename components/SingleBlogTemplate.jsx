
// // export default SingleBlogTemplate;
// import React from 'react';
// import Link from 'next/link';
// import { format, formatDistanceToNow } from 'date-fns';
// import { remark } from 'remark';
// import remarkParse from 'remark-parse';
// import Image from 'next/image';
// import TruncateText from './TruncateText';

// // Calculate reading time
// function calculateReadingTime(content) {
//   const processor = remark().use(remarkParse);
//   const plainText = processor.processSync(content).toString();
//   const wordsPerMinute = 200;
//   const words = plainText.split(/\s+/).length;
//   const time = Math.ceil(words / wordsPerMinute);
//   return `${time} min`;
// }

// // Calculate elapsed time since published
// function getElapsedTime(date) {
//   return formatDistanceToNow(new Date(date), { addSuffix: true });
// }

// const SingleBlogTemplate = ({ blog }) => {
//   // Determine fallback author image based on gender
//   const defaultAuthorImage =
//     blog.authorGender === 'F'
//       ? '/default-avatar-2.png'
//       : '/default-avatar.png';

//   return (
//     <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-gray-200">
//       <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
//         <div className="flex gap-4">
//           {/* Content Section */}
//           <div className="flex-1 min-w-0">
//             {/* Category Badge */}
//             <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-3">
//               {blog.category}
//             </div>

//             {/* Title */}
//             <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
//               <TruncateText text={blog.title} limit={7} truncateBy="word" />
//             </h3>

//             {/* Description */}
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
//               <TruncateText text={blog.description} limit={15} truncateBy="word" />
//             </p>

//             {/* Author and Metadata */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <img
//                     src={blog.authorImage || defaultAuthorImage}
//                     width={32}
//                     height={32}
//                     alt={blog.author}
//                     className="rounded-full border-2 border-white shadow-sm object-cover"
//                   />
//                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">{blog.author}</span>
//               </div>

//               {/* Reading Time */}
//               <div className="flex items-center gap-1 text-xs text-gray-500">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span>{calculateReadingTime(blog.content)}</span>
//               </div>
//             </div>

//             {/* Date and Views */}
//             <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//               <span className="text-xs text-gray-500">
//                 {getElapsedTime(blog.date)}
//               </span>
//               <div className="flex items-center gap-1 text-xs text-gray-500">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//                 <span>{blog.views || 0} vues</span>
//               </div>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden relative">
//             <Image
//               src={blog.image}
//               alt={blog.title}
//               fill
//               className="object-cover group-hover:scale-110 transition-transform duration-500"
//               placeholder="blur"
//               blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjxwYXRoIGQ9Ik0zNSA0MGgzME0zNSA1MGgyME0zNSA2MGgyNSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4="
//               sizes="(max-width: 768px) 96px, 96px"
//             />
            
//             {/* Gradient overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default SingleBlogTemplate;
import React from 'react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import Image from 'next/image';
import TruncateText from './TruncateText';

// Calculate reading time
function calculateReadingTime(content) {
  const processor = remark().use(remarkParse);
  const plainText = processor.processSync(content).toString();
  const wordsPerMinute = 200;
  const words = plainText.split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min`;
}

// Calculate elapsed time since published
function getElapsedTime(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

const SingleBlogTemplate = ({ blog }) => {
  // Determine fallback author image based on gender
  const defaultAuthorImage =
    blog.authorGender === 'F'
      ? '/default-avatar-2.png'
      : '/default-avatar.png';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-300 group hover:border-gray-200 dark:hover:border-gray-600">
      <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
        <div className="flex gap-4">
          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Category Badge */}
            <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium mb-3 transition-colors">
                            <TruncateText text={blog.category} limit={10} truncateBy="char" />

            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors leading-tight">
              <TruncateText text={blog.title} limit={7} truncateBy="word" />
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              <TruncateText text={blog.description} limit={15} truncateBy="word" />
            </p>

            {/* Author and Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={blog.authorImage || defaultAuthorImage}
                    width={32}
                    height={32}
                    alt={blog.author}
                    className="rounded-full border-2 border-white dark:border-gray-800 shadow-sm object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {blog.author}
                </span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateReadingTime(blog.content)}</span>
              </div>
            </div>

            {/* Date and Views */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {getElapsedTime(blog.date)}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{blog.views || 0} vues</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden relative">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjxwYXRoIGQ9Ik0zNSA0MGgzME0zNSA1MGgyME0zNSA2MGgyNSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4="
              sizes="(max-width: 768px) 96px, 96px"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Dark mode overlay */}
            <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-900/40 opacity-0 dark:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleBlogTemplate;