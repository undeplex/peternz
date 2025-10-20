import { ShareIcon } from '@heroicons/react/24/outline';
import { Share, Share2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

const ShareBtn = ({ title, text, url }) => {
  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast('Article shared successfully!');
      } else {
        toast('Sharing is not supported on this device.');
      }
    } catch (error) {
      toast.error('An error occurred while sharing.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-3  bg-opacity-10 ml-4 rounded-full flex items-center gap-1 py-3 bg-blue-500 text-blue-500 transition"
    >
      
      <Share2Icon className="w-4 h-4" />
    </button>
  );
};

export default ShareBtn;