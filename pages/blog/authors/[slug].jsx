import { getAllAuthors, getPostsByAuthor } from "@/utils/authors";
import Layout from "@/components/Layout";

export async function getStaticPaths() {
  const authors = await getAllAuthors();
  const paths = authors.map(author => ({
    params: { slug: author.name.toLowerCase() },
  }));

  return { paths, fallback: false }; // fallback: false ensures non-existent slugs show 404
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByAuthor(params.slug);
  return { props: { author: params.slug, posts } };
}

export default function AuthorPage({ author, posts }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-center mb-6 capitalize">
          Posts by {author}
        </h1>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="p-4 border rounded-lg">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 my-2">{post.description}</p>
                <p className="text-sm text-gray-500">
                  By {post.author || "Unknown"} | {post.readingTime} |{" "}
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No posts available from this author.
          </p>
        )}
      </div>
    </Layout>
  );
}