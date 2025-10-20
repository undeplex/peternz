// import Link from "next/link";
// import Layout from "@/components/Layout";
// import { getAllCategories } from "@/utils/categories";
// import Head from "next/head"; // Import next/head for managing SEO

// export async function getStaticProps() {
//   const categories = await getAllCategories();
//   return { props: { categories } };
// }

// export default function CategoriesPage({ categories }) {
//   const seoTitle = "All Blog Categories - Your Website Name"; // Page title for SEO
//   const seoDescription =
//     "Explore all available categories on our blog. Find posts about various topics that interest you."; // Page description for SEO
//   const seoKeywords = "blog categories, topics, blogs, explore categories"; // Keywords for SEO
//   const seoImage = "/default-category-image.jpg"; // A default image for SEO
//   const seoUrl = "https://peternz.vercel.app/categories"; // The URL of this page

//   return (
//     <Layout>
//       {/* SEO Implementation with next/head */}
//       <Head>
//         <title>{seoTitle}</title>
//         <meta name="description" content={seoDescription} />
//         <meta name="keywords" content={seoKeywords} />
//         <meta name="author" content="Your Website Name" />

//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content={seoTitle} />
//         <meta property="og:description" content={seoDescription} />
//         <meta property="og:image" content={seoImage} />
//         <meta property="og:url" content={seoUrl} />

//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={seoTitle} />
//         <meta name="twitter:description" content={seoDescription} />
//         <meta name="twitter:image" content={seoImage} />

//         {/* Favicon */}
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="max-w-4xl mx-auto pt-8">
//         <h1 className="text-4xl font-bold text-center mb-6">All Categories</h1>
//         <ul className="list-disc list-inside">
//           {categories.map((category) => (
//             <li key={category} className="text-lg my-2">
//               <Link href={`/blog/category/${category.toLowerCase()}`}>
//                 <span className="text-blue-500 hover:underline">{category}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </Layout>
//   );
// }
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllCategories } from "@/utils/categories";
import Head from "next/head";
import { useState, useEffect } from 'react';

export async function getStaticProps() {
  const categories = await getAllCategories();
  
  // Compter le nombre d'articles par catégorie
  const { getPostsByCategory } = await import("@/utils/categories");
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const posts = await getPostsByCategory(category);
      return {
        name: category,
        postCount: posts.length,
        slug: category.toLowerCase()
      };
    })
  );

  return { props: { categories: categoriesWithCount } };
}

// Loader style iOS cohérent
const IPhoneLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-gray-400 dark:border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

export default function CategoriesPage({ categories }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const seoTitle = "All Blog Categories | Peternz";
  const seoDescription = "Explore all available categories on our blog. Find posts about various topics that interest you.";
  const seoKeywords = "blog categories, topics, blogs, explore categories";
  const seoImage = "/default-category-image.jpg";
  const seoUrl = "https://peternz.netlify.app/categories";

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
        </Head>
        <div className="min-h-screen dark:bg-black bg-gray-50 flex items-center justify-center">
          <IPhoneLoader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Peternz" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={seoUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <link rel="canonical" href={seoUrl} />
      </Head>

      <div className="min-h-screen dark:bg-black bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
              Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore all topics and categories covered in our blog
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href={`/blog/category/${category.slug}`}>
                  <div className="relative overflow-hidden rounded-2xl p-6 h-32 backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-900/60">
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Category Name and Count */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
                        </p>
                      </div>

                      {/* Animated Arrow */}
                      <div className="flex justify-between items-center">
                        <div className="relative">
                          <div className="on-300 flex items-center justify-center ">
                            <svg 
                              className="w-4 h-4 text-teal-800 dark:text-white transition-all duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          {/* Pulse effect on hover */}
                        </div>
                      </div>
                    </div>

                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-100/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                There are no categories to display at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}