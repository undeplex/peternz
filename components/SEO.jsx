import React from "react";
import Head from "next/head";

const SEO = ({
  title,
  description,
  keywords = [],
  image,
  url,
  datePublished,
  lastUpdated,
  author,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image ? { "@type": "ImageObject", url: image } : undefined,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Your Website Name", // Replace with your website's name
      logo: {
        "@type": "ImageObject",
        url: "/path-to-logo.png", // Replace with your logo path
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: datePublished,
    dateModified: lastUpdated,
  };

  return (
    <Head>
      {/* Title */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Keywords Meta Tag */}
      {Array.isArray(keywords) && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
};

// Default Props to Handle Missing Values
SEO.defaultProps = {
  title: "Default Title",
  description: "Default description for the page.",
  keywords: ["default", "keywords"],
  image: "/default-image.png",
  url: "https://peternz.netlify.app",
  datePublished: "2023-01-01",
  lastUpdated: "2025-01-01",
  author: "Admin",
};

export default SEO;

