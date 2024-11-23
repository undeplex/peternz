import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllCategories } from "@/utils/categories";
import Head from "next/head"; // Import next/head for managing SEO

export async function getStaticProps() {
  const categories = await getAllCategories();
  return { props: { categories } };
}

export default function CategoriesPage({ categories }) {
  const seoTitle = "All Blog Categories - Your Website Name"; // Page title for SEO
  const seoDescription =
    "Explore all available categories on our blog. Find posts about various topics that interest you."; // Page description for SEO
  const seoKeywords = "blog categories, topics, blogs, explore categories"; // Keywords for SEO
  const seoImage = "/default-category-image.jpg"; // A default image for SEO
  const seoUrl = "https://yourwebsite.com/categories"; // The URL of this page

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
        <h1 className="text-4xl font-bold text-center mb-6">All Categories</h1>
        <ul className="list-disc list-inside">
          {categories.map((category) => (
            <li key={category} className="text-lg my-2">
              <Link href={`/blog/category/${category.toLowerCase()}`}>
                <span className="text-blue-500 hover:underline">{category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}