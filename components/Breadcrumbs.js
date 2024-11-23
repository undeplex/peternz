
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function Breadcrumbs({ title,category }) {
  const breadcrumbItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Category', href: '/blog/category' },
    { name: `${category}`, href: '/blog/tags' },
    { name: title, href: `/blog/${title.toLowerCase().replace(/ /g, '-')}` },
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
              <span className="dark:text-gray-400">{item.name}</span>
            )}
          </li>
        ))}
     
    </nav>
  );
}

export default Breadcrumbs;