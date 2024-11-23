import { getAllTags, getPostsByTag } from "@/utils/tags";
import Layout from "@/components/Layout";
import BreadcrumbsTags from "@/components/BreadcrumbsTags";
import Head from "next/head"; // Import next/head for managing SEO
import SingleBlogTemplate from "@/components/SingleBlogTemplate";

export async function getStaticPaths() {
  const tags = await getAllTags();
  const paths = tags.map((tag) => ({
    params: { slug: tag.toLowerCase() },
  }));

  return { paths, fallback: false }; // fallback: false ensures non-existent slugs show 404
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByTag(params.slug);
  return { props: { tag: params.slug, posts } };
}

export default function TagPage({ tag, posts }) {
  const seoTitle = `Posts Tagged with ${tag} - Your Website Name`; // Page title for SEO
  const seoDescription = `Explore all posts tagged with "${tag}". Find insightful articles, tips, and stories related to ${tag}.`; // Page description for SEO
  const seoKeywords = `${tag}, blog, ${tag} posts, articles tagged with ${tag}`; // Keywords for SEO
  const seoImage = "/default-tag-image.jpg"; // A default image for SEO
  const seoUrl = `https://yourwebsite.com/tag/${tag}`; // The URL of this page

  return (
    <Layout>
      {/* SEO Implementation with next/head */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content="Your Website Name" />

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

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl px-6 mx-auto pt-8">
        <BreadcrumbsTags tags={tag} />
        <h1 className="text-4xl font-bold text-center mb-6 capitalize">
          Posts Tagged: {tag}
        </h1>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="">
                {/* <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 my-2">{post.description}</p>
                <p className="text-sm text-gray-500">
                  By {post.author || "Unknown"} | {post.readingTime} |{" "}
                  {new Date(post.date).toLocaleDateString()}
                </p> */}
                <SingleBlogTemplate blog={post}/>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No posts available for this tag.
          </p>
        )}
      </div>
    </Layout>
  );
}
