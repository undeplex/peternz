

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import { format } from "date-fns";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import TruncateText from "@/components/TruncateText";
import SingleBlogTemplate from "@/components/SingleBlogTemplate";

export default function SearchResultsPage({ blogs }) {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    if (query.query) {
      setLoading(true);

      const fuse = new Fuse(blogs, {
        keys: ["title", "description", "tags", "category"],
        includeScore: true,
        threshold: 0.4,
      });

      const results = fuse.search(query.query);
      setFilteredBlogs(results.map((r) => r.item));
      setLoading(false);
    }
  }, [query.query, blogs]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* <SearchForm /> */}
        <h1 className="text-2xl font-bold my-5 ">Search Results</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                                    <SingleBlogTemplate blog={blog} />
                
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
// Fetch blogs data from markdown files
export async function getStaticProps() {
  const markdownDir = path.join(process.cwd(), "markdown");
  const files = fs.readdirSync(markdownDir);

  const blogs = files.map((fileName) => {
    const filePath = path.join(markdownDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      ...data,
      content,
    };
  });

  return {
    props: {
      blogs,
    },
  };
}