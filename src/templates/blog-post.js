import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { DiscussionEmbed } from 'disqus-react';
import Bio from '../components/Bio';
import Layout from '../components/layout';
import { rhythm, scale } from '../utils/typography';
import Seo from '../components/Seo';
import config from '../config';
import Share from '../components/Share';

const styles = {
  date: {
    ...scale(-1 / 5),
    display: 'block',
    marginBottom: rhythm(1),
    marginTop: rhythm(-1),
  },
  navLinkContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
  },
  post: {
    paddingBottom: rhythm(1),
  },
};

const BlogPostTemplate = (props) => {
  const post = get(props, 'data.markdownRemark');
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const postTitle = `${post.frontmatter.title}`;
  const { previous, next } = get(props, 'pageContext', {});
  const { location } = props;
  const disqusConfig = { identifier: post.id, title: postTitle };
  const url = `${config.url}${get(post, 'fields.slug', '')}`;

  return (
    <Layout location={location}>
      <Seo postData={post} />
      <Helmet title={`${postTitle} | ${siteTitle}`} />
      <h1>{postTitle}</h1>
      <p style={styles.date}>{post.frontmatter.date}</p>
      <article style={styles.post} dangerouslySetInnerHTML={{ __html: post.html }} />
      <Share text={postTitle} url={url} />
      <DiscussionEmbed shortname={config.disqusShortName} config={disqusConfig} />
      <Bio />

      <ul style={styles.navLinkContainer}>
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {' '}
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 200)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        keywords
        featuredImage {
          childImageSharp {
            resize(width: 400) {
              src
              height
              width
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
