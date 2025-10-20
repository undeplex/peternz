// import React from "react";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="w-full bg-black text-white py-6">
//       <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        
//         {/* Liens */}
//         <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
//           <Link href="/blog" className="hover:text-blue-500 transition">Blog</Link>
//           <Link href="/authors" className="hover:text-blue-500 transition">Authors</Link>
//           <Link href="/read-later" className="hover:text-blue-500 transition">Read Later</Link>
//           <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
//           <Link href="/category" className="hover:text-blue-500 transition">Categories</Link>
//         </div>

//         {/* Icônes */}
//         <div className="flex gap-5">
//           <a href="#" className="hover:text-blue-500 transition">
//             <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9..."/></svg>
//           </a>
//           <a href="#" className="hover:text-blue-500 transition">
//             <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6..."/></svg>
//           </a>
//         </div>

//         {/* Copyright */}
//         <p className="text-gray-400 text-xs mt-2">
//           PeterNz <span className="text-blue-600">Neon</span> © 2024 — All rights reserved
//         </p>
//       </div>
//     </footer>
//   );
// }
import React from "react";
import Link from "next/link";
import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        
        {/* Liens */}
        <nav className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
          <Link href="/blog" className="hover:text-blue-500 transition">Blog</Link>
          <Link href="/authors" className="hover:text-blue-500 transition">Authors</Link>
          <Link href="/read-later" className="hover:text-blue-500 transition">Read Later</Link>
          <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
          <Link href="/category" className="hover:text-blue-500 transition">Categories</Link>
        </nav>

        {/* Icônes */}
        <div className="flex gap-5 mt-2">
          <a href="#" className="hover:text-blue-500 transition">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <EnvelopeIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs mt-3">
          PeterNz <span className="text-blue-500">@Undeplex</span> © 2024 — All rights reserved
        </p>
      </div>
    </footer>
  );
}
