
// utils.js
export const calculateReadTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

