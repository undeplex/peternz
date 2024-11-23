import React from 'react';
import Head from 'next/head';

const SEOBlog = ({ title, description, url, image }) => {
  const defaultTitle = 'Blog Page - My Website';
  const defaultDescription = 'Explore our blog posts and stay updated with the latest content on various topics.';
  const defaultImage = '/default-image.jpg'; // Replace with your default image path
  const siteName = 'My Website';
  const twitterHandle = '@YourTwitterHandle'; // Replace with your Twitter handle

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} - ${siteName}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Your Name or Website" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url || 'https://peternz.vercel.app/blog'} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEOBlog;