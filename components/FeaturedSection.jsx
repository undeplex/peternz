// import Link from 'next/link';
// import { format } from 'date-fns';
// import SingleBlog from './SingleBlog';
// import { Plus } from 'lucide-react';
// import SingleBlogTemplate from './SingleBlogTemplate';

// const FeaturedSection = ({ featuredPosts }) => {
//   if (!featuredPosts || featuredPosts.length === 0) {
//     return null; // Handle case when featuredPosts is not available
//   }

//   const mainPost = featuredPosts[4];
//   const sidePosts = featuredPosts.slice(1, 4); // Get up to three additional posts

//   // Helper function to truncate text
//   const truncateText = (text, limit) => {
//     return text.length > limit ? `${text.substring(0, limit)}...` : text;
//   };

//   return (
//     <section className="text-left py-2 mt-0  bg-red container mx-auto">
//       <h2 className="text-4xl play font-bold text-center mt-0 mb-10">Featured Blogs</h2>
//       <div className="">
//         <div className="w-full rounded-lg relative">
//           <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
//             <div className="relative mx-auto group">
//               <img
//                 src={mainPost.image}
//                 alt={mainPost.title}
//                 className="w-full sm:h-[450px] bg- md:h-[550px] h-64 object-cover my-2 main-feature-img"
//               />
//               <div className="absolute hidden sm:block p-3 w-full bottom-0 h-[300px] left-0 bg-gradient-to-t from-black via-transparent to-transparent opacity opacity-100 lg:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-0 p-4">
//                   <h1 className="play w-9/12 dark:text-gray-00 text-3xl text-white font-bold text-left mt-4">
//                     {mainPost.description}
//                   </h1>
//                   <div className="text-sm flex items-center justify-between text-gray-200 mt-4">
//                     <div className="flex items-center gap-3 font-bold">
//                       <img
//                         src={mainPost.authorImage}
//                         alt={mainPost.title}
//                         className="size-9 rounded-full ring-4 object-cover my-2"
//                       />
//                       {mainPost.author}
//                       <span className="size-1 bg-black rounded-full"></span>
//                       <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
//                     </div>

//                     <div className="w-max">
//                       {/* Check if tags exist before mapping */}
//                       {mainPost.tags && mainPost.tags.length > 0 ? (
//                         mainPost.tags.map((tag) => (
//                           <span
//                             href={`/tags/${tag.toLowerCase()}`}
//                             key={tag}
//                             className="mx-2 dark:text-gray-100 rounded-full px-3 py-1 border-2 border-r-gray-100 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-600 duration-300 transition-all"
//                           >
//                             {tag}
//                           </span>
//                         ))
//                       ) : (
//                         <span>No Tags</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <span className="mx-2 absolute top-3 right-3 text-white rounded-full px-5 py-2  bg-black">
//                 {mainPost.category.toUpperCase()} + Category
//               </span>
//             </div>
//           </Link>
//           <div className="block sm:hidden px-6">
//             <h1 className="play dark:text-gray-00 text-2xl font-bold text-left mt-4">{mainPost.title}</h1>
//             <p className="text-gray-600 mt-2 text-left dark:text-slate-100">
//               {truncateText(mainPost.description, 200)}
//             </p>
//             <div className="text-sm text-gray-500 mt-4">
//               <div className="flex items-center gap-3 font-bold">
//                 <img
//                   src={mainPost.authorImage}
//                   alt={mainPost.title}
//                   className="size-9 rounded-full ring-4 object-cover my-2"
//                 />
//                 {mainPost.author}
//                 <span className="size-1 bg-black rounded-full"></span>
//                 <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="px-6 ">
//         <h1 className="text-4xl font-bold text-center my-5 play">Nos Articles le plus populaires</h1>
//         <p className="text-blue-600 mb-5 flex gap-1 b font-bold">VOIR TOUS <Plus/> </p>
//         </div>
//         <div className="grid px-6 grid-cols-1 text-left gap-6 md:grid-cols-3 sm:grid-cols-2 ">
//           {sidePosts.map((post, index) => (
//             <SingleBlogTemplate key={index} blog={post} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedSection;

import Link from 'next/link';
import { format } from 'date-fns';
import SingleBlog from './SingleBlog';
import { Plus, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import SingleBlogTemplate from './SingleBlogTemplate';

const FeaturedSection = ({ featuredPosts }) => {
  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  const mainPost = featuredPosts[4];
  const sidePosts = featuredPosts.slice(1, 4);

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <section className="p mt-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Articles à la Une
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez nos contenus les plus populaires et soigneusement sélectionnés
          </p>
        </div>

        {/* Main Featured Post */}
        <div className="mb">
          <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="lg:flex lg:min-h-[500px]">
                {/* Image Container */}
                <div className="lg:w-1/2 relative overflow-hidden">
                  <img
                    src={mainPost.image}
                    alt={mainPost.title}
                    className="w-full h-64 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {mainPost.category}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {mainPost.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {truncateText(mainPost.description, 180)}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-4 mb-6">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {mainPost.author}
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(mainPost.date), 'dd MMMM yyyy')}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    {mainPost.tags && mainPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {mainPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Popular Articles Section */}
        <div className="mb-3 text-left">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Articles Populaires
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Les contenus les plus appréciés par notre communauté
              </p>
            </div>
            <Link href="/blog" passHref>
              <button className="group flex items-center gap-2 p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 font-semibold">
                All
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          {/* Side Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sidePosts.map((post, index) => (
              <div 
                key={index} 
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <SingleBlogTemplate blog={post} />
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 text-gray-400 dark:text-gray-600">
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm font-medium">Continuez à explorer</span>
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .group:hover .main-feature-img {
          transform: scale(1.05);
        }
        
        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedSection;