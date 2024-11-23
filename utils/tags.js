import { loadPosts } from "@/utils/loadPosts";

export async function getAllTags() {
  const posts = await loadPosts();

  // Extract tags and flatten them into a single array, removing duplicates
  const tags = [...new Set(posts.flatMap(post => post.tags || []))];
  return tags;
}

export async function getPostsByTag(tagSlug) {
  const posts = await loadPosts();
  return posts.filter(post =>
    post.tags.map(tag => tag.toLowerCase()).includes(tagSlug.toLowerCase())
  );
}