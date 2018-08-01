import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import githubIcon from '../icons/github.svg';
import twitterIcon from '../icons/twitter.svg';
import webIcon from '../icons/web.png';
import bitmojiIcon from '../icons/bitmoji.png';

const styles = {
  container: {
    position: 'relative',
    padding: '5px 0',
  },
  website: {
    display: 'inline-block',
  },
  header: {
    display: 'inline-block',
    textAlign: 'center',
  },
  social: {
    display: 'inline-block',
    right: 0,
    position: 'absolute',
    paddingTop: rhythm(1),
  },
  icon: {
    display: 'inline-block',
    width: rhythm(1),
    margin: 0,
  },
  link: {
    padding: '0 10px',
    boxShadow: 'none',
  },
};

const Header = () => (
  <div style={styles.container}>
    <div style={styles.website}>
      <Link style={{ ...styles.link, padding: 0 }} to="/"><img style={{ ...styles.icon, width: rhythm(2.5) }} src={bitmojiIcon} alt="atulr.com/blog" /></Link>
    </div>
    <div style={styles.social}>
      <a style={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.atulr.com"><img style={styles.icon} src={webIcon} alt="atulr.com" /></a>
      <a style={styles.link} target="_blank" rel="noopener noreferrer" href="https://twitter.com/masteratul94"><img style={styles.icon} src={twitterIcon} alt="twitter" /></a>
      <a style={styles.link} target="_blank" rel="noopener noreferrer" href="https://github.com/master-atul/"><img style={styles.icon} src={githubIcon} alt="github" /></a>
    </div>
  </div>
);

export default Header;
