// import { getAllAuthors, getPostsByAuthor } from "@/utils/authors";
// import Layout from "@/components/Layout";
// import Head from "next/head";

// export async function getStaticPaths() {
//   const authors = await getAllAuthors();
//   const paths = authors.map(author => ({
//     params: { slug: author.name.toLowerCase() },
//   }));

//   return { paths, fallback: false }; // fallback: false ensures non-existent slugs show 404
// }

// export async function getStaticProps({ params }) {
//   const posts = await getPostsByAuthor(params.slug);
//   return { props: { author: params.slug, posts } };
// }

// export default function AuthorPage({ author, posts }) {
//   return (
    
//     <Layout>
//       <Head>
//         <title>Posts by {author} | Peternz</title>
//         <meta
//           name="description"
//           content={`Explore all posts written by ${author} on Peternz. Discover insights, stories, and expertise.`}
//         />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href={`https://peternz.vercel.app/blog/authors/${author}`} />
//       </Head>
//       <div className="max-w-4xl mx-auto pt-8">
//         <h1 className="text-4xl font-bold text-center mb-6 capitalize">
//           Posts by {author}
//         </h1>
//         {posts.length > 0 ? (
//           <div className="space-y-6">
//             {posts.map(post => (
//               <div key={post.id} className="p-4 border rounded-lg">
//                 <h2 className="text-2xl font-semibold">{post.title}</h2>
//                 <p className="text-gray-600 my-2">{post.description}</p>
//                 <p className="text-sm text-gray-500">
//                   By {post.author || "Unknown"} | {post.readingTime} |{" "}
//                   {new Date(post.date).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-lg text-gray-500">
//             No posts available from this author.
//           </p>
//         )}
//       </div>
//     </Layout>
//   );
// }
import { getAllAuthors, getPostsByAuthor } from "@/utils/authors";
import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Filters from "@/components/Filters";
import SingleBlogTemplate from "@/components/SingleBlogTemplate";

export async function getStaticPaths() {
  const authors = await getAllAuthors();
  const paths = authors.map(author => ({
    params: { slug: author.name.toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByAuthor(params.slug);
  const authors = await getAllAuthors();
  const author = authors.find(a => a.name.toLowerCase() === params.slug);
  
  // Transformer les posts pour qu'ils aient le même format que les blogs
  const formattedPosts = posts.map(post => ({
    ...post,
    // S'assurer que le format correspond à celui de SingleBlogTemplate
    id: post.id || post.slug,
    slug: post.slug || post.title?.toLowerCase().replace(/ /g, '-'),
    image: post.image || "/blog-placeholder.jpg",
    readingTime: post.readingTime || `${Math.ceil((post.content?.length || 0) / 1000)} min read`,
    views: post.views || 0
  }));

  return { 
    props: { 
      author: params.slug, 
      posts: formattedPosts,
      authorImage: author?.image || "/default-avatar.png",
      initialBlogs: formattedPosts // Même nom que dans BlogPage
    } 
  };
}

// Loader style iOS - EXACTEMENT le même
const IPhoneLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-gray-400 dark:border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

export default function AuthorPage({ author, posts, authorImage, initialBlogs }) {
  // MÊMES STATES que BlogPage
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent');
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // MÊMES CONSTANTES que BlogPage
  const INITIAL_POSTS = 6;
  const POSTS_INCREMENT = 6;

  // MÊME useEffect pour le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedBlogs(filteredBlogs.slice(0, INITIAL_POSTS));
      setIsInitialLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [filteredBlogs]);

  // MÊME fonction simulateLoading
  const simulateLoading = (callback) => {
    setShowMoreLoading(true);
    setTimeout(() => {
      callback();
      setShowMoreLoading(false);
    }, 1000);
  };

  // MÊME fonction applyFilters
  const applyFilters = () => {
    let updatedBlogs = [...initialBlogs];
    updatedBlogs.sort((a, b) => {
      switch (sortOrder) {
        case 'mostRecent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0);
        case 'leastViewed':
          return (a.views || 0) - (b.views || 0);
        default:
          return 0;
      }
    });
    setFilteredBlogs(updatedBlogs);
  };

  // MÊME useEffect pour les filtres
  useEffect(() => {
    applyFilters();
  }, [sortOrder]);

  // MÊME fonction handleShowMore
  const handleShowMore = () => {
    simulateLoading(() => {
      const newPostsCount = displayedBlogs.length + POSTS_INCREMENT;
      setDisplayedBlogs(filteredBlogs.slice(0, newPostsCount));
    });
  };

  return (
    <Layout>
      <Head>
        <title>Posts by {author} | Peternz</title>
        <meta
          name="description"
          content={`Explore all posts written by ${author} on Peternz. Discover insights, stories, and expertise.`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://peternz.vercel.app/blog/authors/${author}`} />
      </Head>

      {/* MÊME structure HTML que BlogPage */}
      <div className="min-h-screen dark:bg-black bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header adapté pour l'auteur */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <img
                src={authorImage}
                alt={author}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight capitalize">
              {author}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {posts.length} {posts.length === 1 ? 'article publié' : 'articles publiés'} • Découvrez tous les écrits de cet auteur
            </p>
          </div>

          {/* MÊME composant Filters */}
          <div className="mb-12">
            <Filters
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={() => {
                setSortOrder('mostRecent');
                setFilteredBlogs([...initialBlogs]);
                setDisplayedBlogs(initialBlogs.slice(0, INITIAL_POSTS));
              }}
            />
          </div>

          {/* MÊME logique de chargement et affichage */}
          {isInitialLoading ? (
            <IPhoneLoader />
          ) : (
            <>
              {/* MÊME grid avec MÊME composant SingleBlogTemplate */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedBlogs.map((blog) => (
                  <div 
                    key={blog.id} 
                    className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  >
                    <SingleBlogTemplate blog={blog} />
                  </div>
                ))}
              </div>

              {/* MÊME bouton "Charger plus" */}
              {displayedBlogs.length < filteredBlogs.length && (
                <div className="flex justify-center">
                  {showMoreLoading ? (
                    <IPhoneLoader />
                  ) : (
                    <button
                      onClick={handleShowMore}
                      className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                      Charger plus d'articles
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* MÊME message de fin */}
          {displayedBlogs.length >= filteredBlogs.length && displayedBlogs.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {posts.length === 1 ? "Vous avez vu l'article" : "Vous avez vu tous les articles"}
              </p>
            </div>
          )}

          {/* MÊME état vide */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Aucun article publié
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Cet auteur n'a pas encore publié d'articles.
              </p>
              <Link href="/blog/authors">
                <span className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                  Retour aux auteurs
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}