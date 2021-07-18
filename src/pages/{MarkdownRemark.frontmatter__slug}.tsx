import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
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

const styles = {
  date: {
    ...scale(-1 / 5),
    display: 'block',
    marginTop: rhythm(-0.5),
  },
  header: {
    marginTop: 0,
    border: `1px solid #e6e6e6`,
  },
  post: {
    paddingBottom: rhythm(1),
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
        <h1>{postTitle}</h1>
        <p style={styles.date}>{post.frontmatter.date}</p>
      </header>
      <main className="main-area">
        <aside className="left-side-area">
          <TableOfContents headings={post.headings}></TableOfContents>
        </aside>
        <section className="page-spacing">
          <article
            className="center-area"
            style={styles.post}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>

        <aside className="right-side-area">
          <TableOfContents headings={post.headings}></TableOfContents>
        </aside>
      </main>
      <footer className="page-spacing">
        <Share text={postTitle} url={url} />
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
