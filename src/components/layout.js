import React from 'react';
import { rhythm } from '../utils/typography';
import Header from './Header';

const styles = {
  innerContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: rhythm(35),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    paddingTop: '3px',
  },
};

const Layout = ({ children }) => (
  <div style={styles.innerContainer}>
    <Header />
    {children}
  </div>
);

export default Layout;
