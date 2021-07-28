import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Disqus } from 'gatsby-plugin-disqus';
import Bio from '../components/Bio';
import Layout from '../components/layout';
import { rhythm, scale } from '../utils/typography';
import Seo from '../components/Seo';
import config from '../config';
import Share from '../components/Share';
import { TableOfContents } from '../components/TableOfContents';
import './blogpost.scss';
import coffeeImg from '../icons/coffee.svg';
import { Subscribe } from '../components/Subscribe';

const styles = {
  date: {
    ...scale(-1 / 5),
    display: 'block',
  },
  header: {
    margin: 0,
    border: `1px solid #e6e6e6`,
  },
  post: {
    paddingBottom: rhythm(1),
  },

  donateText: {
    textAlign: 'center',
    fontSize: 'small',
    fontWeight: 'bold',
    marginTop: rhythm(-0.5),
  },
  donate: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const BlogPostTemplate = (props) => {
  const post = get(props, 'data.markdownRemark');
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const postTitle = `${post.frontmatter.title}`;
  const { location } = props;
  const disqusConfig = { identifier: post.id, title: postTitle };
  const url = `${config.url}${get(post, 'frontmatter.slug', '')}`;

  return (
    <Layout location={location}>
      <Seo postData={post} />
      <Helmet title={`${postTitle} | ${siteTitle}`} />
      <header className="page-spacing">
        <h1 style={{ textAlign: 'start', marginBottom: 5 }}>{postTitle}</h1>
      </header>
      <main className="main-area">
        <aside className="left-side-area">
          <div className="side-area-wrapper">
            <TableOfContents headings={post.headings}></TableOfContents>
          </div>
        </aside>
        <section className="page-spacing center-area">
          <p style={styles.date}>{post.frontmatter.date}</p>
          <article
            style={styles.post}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
        <aside className="right-side-area">
          <div className="side-area-wrapper">
            <Share text={postTitle} url={url} />
            <a
              href="https://revolut.me/atul"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.donate}
            >
              <img className="coffee" src={coffeeImg} alt="coffee" />
              <div style={styles.donateText}>Buy me coffee </div>
            </a>
          </div>
        </aside>
      </main>
      <footer className="page-spacing">
        <Subscribe />
        <br />
        <br />
        <Disqus config={disqusConfig} />
        <Bio />
      </footer>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 250)
      html
      headings {
        value
        depth
      }
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        keywords
      }
    }
  }
`;
