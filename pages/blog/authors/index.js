import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllAuthors } from "@/utils/authors";
import Head from "next/head";

export async function getStaticProps() {
  const authors = await getAllAuthors();
  return { props: { authors } };
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
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <h1 className="text-4xl font-bold text-center mb-6">All Authors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(author => (
            <div key={author.name} className="border p-4 rounded-lg text-center">
              <img
                src={author.image || "/default-avatar.png"} // Fallback if no image exists
                alt={author.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-semibold mb-4">{author.name}</h2>
              <Link href={`/blog/authors/${author.name.toLowerCase()}`}>
                <span className="my-4 px-4 py-2  underline">
                  View Posts
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}