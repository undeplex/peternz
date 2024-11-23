import React from 'react';

const TruncateText = ({ text, limit, truncateBy = 'word' }) => {
  if (!text) return null;

  // Truncate by words
  const truncateByWords = () => {
    const words = text.split(/\s+/);
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };

  // Truncate by letters
  const truncateByLetters = () => {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  // Decide truncation method based on `truncateBy` prop
  const truncatedText =
    truncateBy === 'word' ? truncateByWords() : truncateByLetters();

  return <>{truncatedText}</>;
};

export default TruncateText;