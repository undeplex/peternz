
import { loadPosts } from "@/utils/loadPosts";

export async function getAllCategories() {
  const posts = await loadPosts();

  // Extract categories and remove duplicates
  const categories = [...new Set(posts.map(post => post.category))];
  return categories;
}

// Get posts by category
export async function getPostsByCategory(categorySlug) {
  const posts = await loadPosts();
  return posts.filter(post => post.category.toLowerCase() === categorySlug.toLowerCase());
}
