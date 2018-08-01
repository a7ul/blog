import React from 'react';
import Header from './Header';

const styles = {
  innerContainer: {
    margin: '0 15%',
  },
};

const Layout = ({ children }) => (
  <div style={styles.innerContainer}>
    <Header />
    {children}
  </div>
);

export default Layout;
