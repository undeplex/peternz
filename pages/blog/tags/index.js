
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllTags } from "@/utils/tags";
import Head from "next/head"; // Import next/head for SEO management

export async function getStaticProps() {
  const tags = await getAllTags();
  return { props: { tags } };
}

export default function TagsPage({ tags }) {
  const seoTitle = "All Tags - Your Website Name"; // Page title for SEO
  const seoDescription =
    "Explore all available tags on our blog. Discover posts on various topics by tag, and dive into articles that match your interests."; // Page description for SEO
  const seoKeywords = "blog tags, explore tags, blog topics, blog articles"; // Keywords for SEO
  const seoImage = "/default-tags-image.jpg"; // A default image for SEO
  const seoUrl = "https://yourwebsite.com/tags"; // The URL of this page

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

      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-center mb-6">All Tags</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => (
            <Link href={`/blog/tags/${tag.toLowerCase()}`} key={tag}>
              <span className="px-3 py-1 border rounded-full border-gray-500 text-gray-500 dark:border-gray-300 dark:text-gray-300 hover:text-blue-500 hover:border-blue-500">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}