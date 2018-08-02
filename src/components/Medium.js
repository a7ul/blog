import React from 'react';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import mediumIcon from '../icons/medium.svg';

const styles = {
  title: {
    marginBottom: rhythm(1 / 4),
  },
  mediumTag: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  mediumIcon: {
    width: rhythm(1),
    padding: rhythm(0.2),
    marginBottom: rhythm(-0.2),
    marginLeft: rhythm(0.2),
    backgroundColor: 'black',
  },
};

const Medium = ({ posts }) => posts.map(({ node }) => {
  const title = get(node, 'title');
  const subtitle = get(node, 'virtuals.subtitle');
  const username = get(node, 'author.username');
  const link = `https://medium.com/@${username}/${node.uniqueSlug}`;
  return (
    <div key={node.id}>
      <h3 style={styles.title}>
        <a style={{ boxShadow: 'none' }} target="_blank" rel="noreferrer noopener" href={link}>
          {title}<img style={styles.mediumIcon} src={mediumIcon} alt="medium.com" />
        </a>
      </h3>
      <small>
        {node.firstPublishedAt} on
        <span style={styles.mediumTag}>
          {' '}medium.com
        </span>
      </small>
      <p>{subtitle }</p>
    </div>
  );
});


export default Medium;
