import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    // Define the path to the markdown folder
    const markdownDir = path.join(process.cwd(), 'markdown');
    
    // Read all files in the directory
    const filenames = fs.readdirSync(markdownDir);

    // Extract categories from each markdown file
    const categories = filenames.flatMap((filename) => {
      const filePath = path.join(markdownDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents); // Parse the front matter
      return data.category ? data.category : []; // Return category or empty array
    });

    // Remove duplicates and send response
    const uniqueCategories = [...new Set(categories)];
    res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
