import React, { useEffect,useState,useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import fs from 'fs/promises';
import { calculateReadTime } from '@/utils/calculateReadTime';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import SingleBlog from '@/components/SingleBlog';
import Breadcrumbs from '@/components/Breadcrumbs';
import { addCopyButtonsToCodeBlocks } from '@/utils/codeUtils';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToReadLater, removeFromReadLater, isInReadLater } from '@/utils/readlater';
import SEO from '@/components/SEO';
import SubscribeForm from '@/components/SubscribeForm';
import { formatDateToFrench } from '@/utils/formatDate';
import { BookMarkedIcon, ChevronDown, ClipboardCopy } from 'lucide-react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import Loader from '@/components/Loader';
import LoaderMe from '@/components/LoaderMe';
import SingleBlogTemplate from '@/components/SingleBlogTemplate';
import Skeleton from '@/components/Skeleton';
import ShareBtn from '@/components/ShareBtn';
import { FaCopy } from 'react-icons/fa';
import { AiOutlineCopy } from 'react-icons/ai';
export async function getStaticPaths() {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const fileNames = await fs.readdir(markdownDir);

  const paths = [];

  for (const fileName of fileNames) {
    const filePath = path.join(markdownDir, fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data } = matter(fileContents);
    paths.push({
      params: { slug: data.title.toLowerCase().replace(/ /g, '-') },
    });
  }

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const fileNames = await fs.readdir(markdownDir);

  let foundBlog = null;
  let allBlogs = [];

  for (const fileName of fileNames) {
    const filePath = path.join(markdownDir, fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkSlug) 
      // .use(remarkToc, { heading: 'Table of Contents', tight: true })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const blog = {
      ...data,
      content: processedContent.toString(),
      slug: data.title.toLowerCase().replace(/ /g, '-'),
    };

    allBlogs.push(blog);

    if (blog.slug === params.slug) {
      foundBlog = blog;
    }
  }

  if (!foundBlog) {
    return { notFound: true };
  }
  // Filtrer les articles similaires basés sur la catégorie
  const relatedBlogs = allBlogs.filter(
    (b) => b.category === foundBlog.category && b.slug !== foundBlog.slug
  ).slice(0,3);
  const authorBlogs = allBlogs.filter(
    (b) => b.author === foundBlog.author && b.slug !== foundBlog.slug
  ).slice(0,3);// Only show 3 posts
// Mock function to fetch most viewed blogs
const fetchMostViewedBlogs = () => {
  // Filter blogs with more than 500 views and sort in descending order
  return allBlogs.filter((blog) => blog.views > 500).sort((a, b) => b.views - a.views);
};
const mostViewedBlogs = fetchMostViewedBlogs();

  return {
    props: {
      blog: foundBlog,
      authorBlogs, 
      relatedBlogs,
      mostViewedBlogs,
    },
  };
}
function BlogPost({ blog, relatedBlogs,authorBlogs,mostViewedBlogs }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingMoreMostViewed, setLoadingMoreMostViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleRelatedBlogs, setVisibleRelatedBlogs] = useState(3); // Limit visible blogs
  const [visibleMostViewedBlogs, setVisibleMostViewedBlogs] = useState(3); // For most viewed
  const loadMoreRelatedBlogs = () => setVisibleRelatedBlogs((prev) => prev + 3);
  const loadMoreMostViewedBlogs = () => {
    setLoadingMoreMostViewed(true); // Show loading
    setTimeout(() => {
      setVisibleMostViewedBlogs((prev) => prev + 3); // Load 3 more blogs
      setLoadingMoreMostViewed(false); // Hide loading
    }, 3000); // 3 seconds delay
  };
  useEffect(() => {
    setIsSaved(isInReadLater(blog.slug));
  }, [blog.slug]);
  
  const notify = (message) => toast(message);

 
  const handleReadLater = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      if (isSaved) {
        removeFromReadLater(blog.slug);
        setIsSaved(false);
        notify('Removed from Read Later!');
      } else {
        addToReadLater(blog);
        setIsSaved(true);
        notify('Added to Read Later!');
      }
      setLoading(false); // End loading
    }, 3000); // 3 seconds
  };
  useEffect(() => {
    if (!blog) {
      router.push('/404');
    }
    addCopyButtonsToCodeBlocks(); // Utility function to add copy buttons
  }, [blog, router]);

  if (router.isFallback) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto p-6 pt-14">
          <Skeleton />
          
        </div>
      </Layout>
    );
  }
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://peternz.vercel.app/blog/${blog.slug}`;
  const readTime = calculateReadTime(blog.content); // Calculate read time
    // Determine fallback author image based on gender
    const defaultAuthorImage =
    blog.authorGender === 'F'
      ? '/default-avatar-2.png'
      : '/default-avatar.png';
  return (
    <Layout>
     <SEO
      title={blog.title}
      description={blog.description}
      keywords={blog.keywords || []} // Ensure keywords is always an array or empty
      image={blog.image}
      url={`https://peternz.vercel.app/blog/${blog.slug}`}
      datePublished={blog.date}
      lastUpdated={blog.lastUpdated}
      author={blog.author}
    />
      <div className="max-w-5xl  relative mx-auto p-6 lg:pt-10">
        <Breadcrumbs title={blog.title} category={blog.category} />
      
        <h1 className="text-3xl play font-bold mb-4">{blog.title}</h1>
        <p className="text-lg mb-4 dark:text-gray-300 text-gray-500">{blog.description}</p>
         {/* Author Section */}
         <div className="flex items-center gap-4 mb-6">
          <img
            src={blog.authorImage || defaultAuthorImage}
            alt={blog.title}
            width="40"
            className="object-cover dark:ring-opacity-20 ring-opacity-15 ring-4 ring-gray-400 dark:ring-gray-200 rounded-full"
          />
    
          <div>
            <p className=" text-gray-500 flex items-center gap-4 dark:text-gray-300">

              {blog.author}
<p class name="text-gray-600 dark:text-gray-300">Lecture {readTime} min </p> 
              </p>
            <p className="text-gray-500 dark:text-gray-400">Publié le {formatDateToFrench(blog.date)}</p>
          </div>
        </div>
      
        <ToastContainer />
        <div className="my-5">
          {/* <ShareButtons/> */}
        </div>
        <img
          src={blog.image}
          alt={blog.title}
          width="400"
          className="mx-auto md:h-[300px] h-[200px] object-cover w-full"
        />
<div className="mt-8">
  <div className="flex items-center gap-4">
    {/* Other share buttons (if any) */}
   
  </div></div>
        {/* Tags Section */}
        {blog.tags && (
          <div className="my-4">
            <h2 className="text-2xl font-bold">Tags:</h2>
            <div className="flex flex-wrap my-3 gap-2">
              {blog.tags.map((tag) => (
                <a
                  href={`/blog/tags/${tag.toLowerCase()}`}
                  key={tag}
                  className=" px-3 py-2 text-sm rounded-full border-[1px]"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Table of Contents */}
        {blog.toc && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <TableOfContents toc={blog.toc} />
          </div>
        )}

        <div className="mt-8">
          <div ref={contentRef} dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Resources Section */}
        {blog.resources && blog.resources.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Resources</h2>
            <ul className="list-disc pl-5">
              {blog.resources.map((resource) => (
                <li key={resource.url}>
                  <a href={resource.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share Buttons */}
        <p className="text-gray-500 dark:text-gray-300 my-4">{`Last updated: ${formatDateToFrench(blog.lastUpdated)}`}</p>

          <h3 className="text-xl  font-bold mb-4">Partager cet article</h3>
        <div className="mt- flex items-center">
          <ShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={blog.title}
            description={blog.description}
          />
           <ShareBtn
      title={blog.title}
      text={blog.description}
      url={typeof window !== 'undefined' ? window.location.href : ''}
    />
        </div>
        <div>
  <div className="flex justify-between md:gap-6 md:w-max items-center ">
     
        <button
          onClick={handleReadLater}
          className={`px-4 py-2 text-gray-500 ${isSaved ? 'border-red-500 text-red-500' : 'border-gray-300 '} rounded-full`}
          disabled={loading}
        >
          {loading ? <><LoaderMe/></> : isSaved ? <>Remove from Read Later</> : <>Add To Read Later</>}
        </button>
        </div>

        </div>

        {/* Author Blogs Section */}
        {authorBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Plus d'article par {blog.author}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authorBlogs.map((authorBlog) => (
                <SingleBlogTemplate key={authorBlog.slug} blog={authorBlog} />
              ))}
            </div>
            <a href="/author-posts-url" className="text-blue-500 mt-4 block">
              View All Posts by {blog.author}
            </a>
          </div>
        )}

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Articles Similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <SingleBlogTemplate key={relatedBlog.slug} blog={relatedBlog} />
                // <SingleBlog key={relatedBlog.slug} blog={relatedBlog} />
              ))}
            </div>
          </div>
        )}

        <SubscribeForm/>






        

        {mostViewedBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Most Viewed Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mostViewedBlogs.slice(0, visibleMostViewedBlogs).map((blog) => (
                <SingleBlogTemplate key={blog.slug} blog={blog}/>
              ))}
            </div>
            {visibleMostViewedBlogs < mostViewedBlogs.length && (
              <button
                onClick={loadMoreMostViewedBlogs}
                className="mt-4 px-4 text-lg fset-3 py-2 underline underline-offset-8  text-gray-700 dark:text-gray-200 rounded"
                disabled={loadingMoreMostViewed}
              >
                {loadingMoreMostViewed ? <><LoaderMe/></> : 'Afficher plus'}
              </button>
            )}

          </div>
        )}


      </div>
    </Layout>
  );
}

export default BlogPost;