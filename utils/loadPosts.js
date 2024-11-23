
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Charger les articles de blog depuis les fichiers Markdown
export async function loadPosts() {
  const postsDirectory = path.join(process.cwd(), "markdown");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter(file => file.endsWith(".md"))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data: frontMatter, content } = matter(fileContents);

      // Calcul du temps de lecture
      const wordsPerMinute = 200;
      const words = content.split(/\s+/).length;
      const readingTime = `${Math.ceil(words / wordsPerMinute)} min read`;

      return {
        ...frontMatter,
        id: filename.replace(".md", ""),
        content,
        readingTime,
        date: new Date(frontMatter.date).toISOString(),
      };
    });
}