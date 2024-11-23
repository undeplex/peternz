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
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <WhatsappShareButton url={url} quote={title} hashtag="#blog">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={title} summary={description} source={url}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title} hashtags={['blog', 'react']}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
    </div>
  );
};

export default ShareButtons;