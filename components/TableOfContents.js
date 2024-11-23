import React from 'react';

const TableOfContents = ({ toc }) => {
  return (
    <ul className="list-disc pl-6">
      {toc.map((item, index) => (
        <li key={index} className="mb-2">
          <a href={`#${item.anchor}`} className="text-blue-600 hover:underline">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;