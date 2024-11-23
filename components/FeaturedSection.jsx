import Link from 'next/link';
import { format } from 'date-fns';
import SingleBlog from './SingleBlog';
import { Plus } from 'lucide-react';
import SingleBlogTemplate from './SingleBlogTemplate';

const FeaturedSection = ({ featuredPosts }) => {
  if (!featuredPosts || featuredPosts.length === 0) {
    return null; // Handle case when featuredPosts is not available
  }

  const mainPost = featuredPosts[4];
  const sidePosts = featuredPosts.slice(1, 4); // Get up to three additional posts

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <section className="text-left py-2 mt-0  bg-red container mx-auto">
      <h2 className="text-4xl play font-bold text-center mt-0 mb-10">Featured Blogs</h2>
      <div className="">
        <div className="w-full rounded-lg relative">
          <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
            <div className="relative mx-auto group">
              <img
                src={mainPost.image}
                alt={mainPost.title}
                className="w-full sm:h-[450px] bg- md:h-[550px] h-64 object-cover my-2 main-feature-img"
              />
              <div className="absolute hidden sm:block p-3 w-full bottom-0 h-[300px] left-0 bg-gradient-to-t from-black via-transparent to-transparent opacity opacity-100 lg:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4">
                  <h1 className="play w-9/12 dark:text-gray-00 text-3xl text-white font-bold text-left mt-4">
                    {mainPost.description}
                  </h1>
                  <div className="text-sm flex items-center justify-between text-gray-200 mt-4">
                    <div className="flex items-center gap-3 font-bold">
                      <img
                        src={mainPost.authorImage}
                        alt={mainPost.title}
                        className="size-9 rounded-full ring-4 object-cover my-2"
                      />
                      {mainPost.author}
                      <span className="size-1 bg-black rounded-full"></span>
                      <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
                    </div>

                    <div className="w-max">
                      {/* Check if tags exist before mapping */}
                      {mainPost.tags && mainPost.tags.length > 0 ? (
                        mainPost.tags.map((tag) => (
                          <span
                            href={`/tags/${tag.toLowerCase()}`}
                            key={tag}
                            className="mx-2 dark:text-gray-100 rounded-full px-3 py-1 border-2 border-r-gray-100 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-600 duration-300 transition-all"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span>No Tags</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <span className="mx-2 absolute top-3 right-3 text-white rounded-full px-5 py-2  bg-black">
                {mainPost.category.toUpperCase()} + Category
              </span>
            </div>
          </Link>
          <div className="block sm:hidden px-6">
            <h1 className="play dark:text-gray-00 text-2xl font-bold text-left mt-4">{mainPost.title}</h1>
            <p className="text-gray-600 mt-2 text-left dark:text-slate-100">
              {truncateText(mainPost.description, 200)}
            </p>
            <div className="text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-3 font-bold">
                <img
                  src={mainPost.authorImage}
                  alt={mainPost.title}
                  className="size-9 rounded-full ring-4 object-cover my-2"
                />
                {mainPost.author}
                <span className="size-1 bg-black rounded-full"></span>
                <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 ">
        <h1 className="text-4xl font-bold text-center my-5 play">Nos Articles le plus populaires</h1>
        <p className="text-blue-600 mb-5 flex gap-1 b font-bold">VOIR TOUS <Plus/> </p>
        </div>
        <div className="grid px-6 grid-cols-1 text-left gap-6 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
          {sidePosts.map((post, index) => (
            <SingleBlogTemplate key={index} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;