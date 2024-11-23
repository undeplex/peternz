
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function BreadcrumbsCategory({ category }) {
  const breadcrumbItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Category', href: '/blog/category' },
    { name: `${category}`, href: '/blog' },
  ];

  return (
    <nav
      className=" text-gray-600 text-sm my-4"
      aria-label="breadcrumb"
    >
        {breadcrumbItems.map((item, index) => (
          <li className="inline" key={index}>
            {index !== breadcrumbItems.length - 1 ? (
              <>
                <Link href={item.href}>
                  <span className="text-blue-60 dark:text-gray-100 text-gray-900 hover:underline">{item.name}</span>
                </Link>
                <span className="mx-2 text-sm">
                  <ChevronRight className="inline size-4"/>
                </span>
              </>
            ) : (
              <span className="dark:text-gray-400">{category}</span>
            )}
          </li>
        ))}
      {/* JSON-LD pour SEO */}
      {/* <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://peterdoc.vercel.app${item.href}`,
          })),
        })}
      </script> */}
    </nav>
  );
}

export default BreadcrumbsCategory;