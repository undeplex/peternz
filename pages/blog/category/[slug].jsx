import { getAllCategories, getPostsByCategory } from "@/utils/categories";
import Layout from "@/components/Layout";
import BreadcrumbsCategory from "@/components/BreadcrumbsCategory";
import Head from "next/head"; // Import next/head for SEO management
import SingleBlogTemplate from "@/components/SingleBlogTemplate";

export async function getStaticPaths() {
  const categories = await getAllCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.toLowerCase() },
  }));

  return { paths, fallback: false }; // fallback: false ensures non-existent slugs show 404
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByCategory(params.slug);
  return { props: { category: params.slug, posts } };
}

export default function CategoryPage({ category, posts }) {
  const seoTitle = `${category} Blogs - Your Website Name`; // Page title for SEO
  const seoDescription = `Browse all posts in the ${category} category. Find insightful blogs and articles related to ${category}.`; // Page description for SEO
  const seoKeywords = `${category}, ${category} blogs, ${category} articles, blog posts in ${category}`; // Keywords for SEO
  const seoImage = "/default-avatar.png"; // A default image for SEO
  const seoUrl = `https://peternz.vercel.app/blog/category/${category.toLowerCase()}`; // The URL of this page

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
      </Head>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <BreadcrumbsCategory category={category} />
        <h1 className="text-4xl font-bold text-center mb-6 capitalize">
          {category} Blogs
        </h1>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="">
               <SingleBlogTemplate blog={post}/>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No posts available in this category.
          </p>
        )}
      </div>
    </Layout>
  );
}