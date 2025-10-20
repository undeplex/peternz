// import Link from "next/link";
// import Layout from "@/components/Layout";
// import { getAllAuthors } from "@/utils/authors";
// import Head from "next/head";

// export async function getStaticProps() {
//   const authors = await getAllAuthors();
//   return { props: { authors } };
// }

// export default function AuthorsPage({ authors }) {
//   return (
//     <Layout>
//       <Head>
//         <title>All Authors | Peternz</title>
//         <meta
//           name="description"
//           content="Discover all authors contributing to Peternz. Explore their profiles and writings."
//         />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://peternz.vercel.app/blog/authors" />
//       </Head>
//       <div className="max-w-4xl mx-auto px-6 pt-8">
//         <h1 className="text-4xl font-bold text-center mb-6">All Authors</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {authors.map(author => (
//             <div key={author.name} className="border p-4 rounded-lg text-center">
//               <img
//                 src={author.image || "/default-avatar.png"} // Fallback if no image exists
//                 alt={author.name}
//                 className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
//               />
//               <h2 className="text-2xl font-semibold mb-4">{author.name}</h2>
//               <Link href={`/blog/authors/${author.name.toLowerCase()}`}>
//                 <span className="my-4 px-4 py-2  underline">
//                   View Posts
//                 </span>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllAuthors } from "@/utils/authors";
import Head from "next/head";

export async function getStaticProps() {
  const authors = await getAllAuthors();
  
  // Compter le nombre de blogs par auteur
  const authorsWithCount = await Promise.all(
    authors.map(async (author) => {
      const { getPostsByAuthor } = await import("@/utils/authors");
      const posts = await getPostsByAuthor(author.name.toLowerCase());
      return {
        ...author,
        postCount: posts.length
      };
    })
  );

  return { props: { authors: authorsWithCount } };
}

export default function AuthorsPage({ authors }) {
  return (
    <Layout>
      <Head>
        <title>All Authors | Peternz</title>
        <meta
          name="description"
          content="Discover all authors contributing to Peternz. Explore their profiles and writings."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://peternz.vercel.app/blog/authors" />
      </Head>
      
      <div className="min-h-screen dark:bg-black bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
              Our Authors
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Meet the talented writers and experts behind our content
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {authors.map(author => (
              <div 
                key={author.name} 
                className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Author Avatar */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:border-blue-500 transition-colors duration-300">
                      <img
                        src={author.image || "/default-avatar.png"}
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Post Count Badge */}
                    {author.postCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                        {author.postCount} {author.postCount === 1 ? 'post' : 'posts'}
                      </div>
                    )}
                  </div>

                  {/* Author Name */}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {author.name}
                  </h2>

                  {/* Post Count Text */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {author.postCount === 0 
                      ? 'No posts yet' 
                      : `${author.postCount} ${author.postCount === 1 ? 'article' : 'articles'} published`
                    }
                  </p>

                  {/* View Posts Button */}
                  {author.postCount > 0 && (
                    <Link href={`/blog/authors/${author.name.toLowerCase()}`}>
                      <span className="inline-flex items-center px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium group-hover:border-blue-500 group-hover:text-blue-500">
                        View Posts
                        <svg 
                          className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {authors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Authors Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                There are no authors to display at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}