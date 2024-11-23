import { loadPosts } from "@/utils/loadPosts";

export async function getAllAuthors() {
  const posts = await loadPosts();

  // Extract authors and images, returning unique authors with their image
  const authors = posts.map(post => ({
    name: post.author,
    image: post.authorImage, // Assuming each post has an `authorImage` field
  }));

  // Remove duplicate authors based on name
  const uniqueAuthors = [...new Map(authors.map(author => [author.name, author])).values()];
  return uniqueAuthors;
}

export async function getPostsByAuthor(authorName) {
  const posts = await loadPosts();
  return posts.filter(post => post.author && post.author.toLowerCase() === authorName.toLowerCase());
}