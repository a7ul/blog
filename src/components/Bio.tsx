import React from 'react';
import config from '../config';
// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import { rhythm } from '../utils/typography';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: rhythm(1 / 3),
  },
  avatar: {
    width: rhythm(2),
    height: rhythm(2),
    marginRight: rhythm(1),
  },
  intro: {
    textAlign: 'justify',
  },
};

const Bio = () => (
  <section style={styles.container}>
    <img src={config.image} alt="Atul R" style={styles.avatar} />
    <p style={styles.intro}>
      Written by
      <strong>
        {' '}
        <a
          href="https://www.atulr.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Atul R
        </a>
      </strong>{' '}
      a developer 🖥,{' '}
      <a
        href="https://www.reactnative.guide"
        target="_blank"
        rel="noopener noreferrer"
      >
        author
      </a>{' '}
      📖 and trainer 👨🏽‍🎓. He primarily works on Javascript ecosystem and
      occasionally hacks around in C++, Rust and Python. He is an{' '}
      <a
        href="https://github.com/a7ul"
        target="_blank"
        rel="noopener noreferrer"
      >
        open source
      </a>{' '}
      enthusiast and <span style={{ color: 'red' }}>❤</span> making useful tools
      for humans.{' '}
      <a
        href="https://twitter.com/a7ulr"
        target="_blank"
        rel="noopener noreferrer"
      >
        You should follow him on Twitter{' '}
      </a>
    </p>
  </section>
);

export default Bio;
