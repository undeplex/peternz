
const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://peternz.netlify.app', // Replace with your actual domain
  generateRobotsTxt: true,            // To generate robots.txt file
  sitemapSize: 50,                    // Set the max URLs per sitemap file

  // Automatically include all static pages and markdown blog paths
  additionalPaths: async (config) => {
    // Define static paths by reading the /pages directory
    const staticPages = fs.readdirSync(path.join(process.cwd(), 'pages'))
      .filter((file) => {
        // Exclude files like _app.js, _document.js, etc.
        return !file.startsWith('_') && file !== '404.js';
      })
      .map((file) => {
        const filePath = file.replace(/\.js$/, ''); // Remove ".js" extension
        return { loc: `/${filePath}` }; // Construct static page URLs
      });

    // Add dynamic markdown post paths
    const markdownDir = path.join(process.cwd(), 'markdown');
    const markdownFiles = fs.readdirSync(markdownDir); // Get all markdown files

    const blogPaths = markdownFiles.map((file) => {
      const slug = file.replace(/\.md$/, ''); // Remove ".md" extension
      return { loc: `/blog/${slug}` };       // Construct dynamic blog URLs
    });

    // Return both static and dynamic paths combined
    return [...staticPages, ...blogPaths];
  },
};

module.exports = config;