import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import config from '../config';

const SEO = ({ postData, postImage }) => {
  const tags = ['a', 'b']; // TODO tags should work
  const title = get(postData, 'frontmatter.title', '');
  const description = get(postData, 'frontmatter.description', postData.excerpt); // TODO frontmatter.description doesnt work
  const image = postImage ? `${config.url}/${postImage}` : null; // TODO images should work
  const url = `${config.url}${get(postData, 'fields.slug', '')}`;

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="keywords" content={tags.join(',')} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={config.fbAppID} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

    </Helmet>
  );
};


SEO.defaultProps = {
  postImage: null,
};

export default SEO;
