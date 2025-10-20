import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import FeaturedSection from "@/components/FeaturedSection";
import RecentPost from "@/components/RecentPost";
import MostViewedBlogs from "@/components/MostViewedBlogs";
import { loadPosts } from "@/utils/loadPosts";
import HomeBanner from "@/components/HomeBanner";
import Profiler from "@/components/Profiler";
import SubscribeForm from "@/components/SubscribeForm";
import { Plus, PlusCircle } from "lucide-react";
import SlidingText from "@/components/SlidingText";

export async function getStaticProps() {
  const allPosts = await loadPosts();

  const recentPosts = allPosts.filter(
    post => new Date() - new Date(post.date) <= 5 * 24 * 60 * 60 * 1000
  );
  const featuredPosts = allPosts.filter(post => post.featured);
  const mostViewedPosts = allPosts
    .sort((a, b) => b.views - a.views).slice(0,3)
    ;

  return {
    props: {
      recentPosts,
      featuredPosts,
      mostViewedPosts,
    },
  };
}

export default function Blogs({ recentPosts, featuredPosts, mostViewedPosts }) {
  const seoProps = {
    title: "Recent Blogs | New, Popular & Most Visited Articles",
    description: "Discover our most recent blogs, popular posts, and trending articles.",
    url: "https://peternz.netlify.app/blogs",
    image: "https://peternz.netlify.app/og-image.jpg",
    siteName: "Your Blog Site",
    datePublished: "2024-11-15",
    dateModified: "2024-11-15",
  };

  return (
    <Layout>
      <SEO {...seoProps} />
      <div className="max-w-6xl mx-auto pt-8">
        <div className="px-6 ">
        <HomeBanner/>

        </div>
<div className="py-0 translate-y-[-63px] bg">

        {featuredPosts.length > 0 && (
          <FeaturedSection featuredPosts={featuredPosts} />
        )}
</div>

<h1 className="text-4xl play font-bold text-center mb-6">Recent Blogs (Last 5 Days)</h1>
        <div className="grid px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {recentPosts.map(post => (
            <RecentPost key={post.id} post={post} />
          ))}
        </div>
                <h1 className="text-4xl px-6 font-bold text-center mb-6">Most Viewed Blogs</h1>
        <p className="text-blue-600 mb-5 px-6 flex gap-1 b font-bold">VOIR TOUS <Plus/> </p>

        <MostViewedBlogs posts={mostViewedPosts} />

        <div className="px-6 my-4">
        <h1 className="md:text-5xl text-3xl font-bold  bg-red-400 play text-transparent dark:from-blue-50 dark:to-gray-500 bg-clip-text bg-gradient-to-r mb-0 from-green-400 to-blue-500">Founder</h1>

<div className="flex md:flex-row flex-col  mt-4 items-center justify-center gap-4">

        <Profiler/>
        <SubscribeForm/>
</div>
        </div>
      </div>
    </Layout>
  );
}
