import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

const ShareButtons = ({ url, title, description }) => {
  return (
    <div className="flex gap-4">
      <FacebookShareButton url={url} quote={title} hashtag="#blog">
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <WhatsappShareButton url={url} quote={title} hashtag="#blog">
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={title} summary={description} source={url}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
      
    </div>
  );
};

export default ShareButtons;