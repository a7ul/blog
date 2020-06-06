import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Bio from '../components/Bio';
import Layout from '../components/layout';
import { rhythm } from '../utils/typography';
import mediumIcon from '../icons/medium.svg';

const styles = {
  title: {
    marginBottom: rhythm(1 / 4),
  },
};

const BlogIndex = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const posts = get(props, 'data.allMarkdownRemark.edges');
  const { location } = props;
  return (
    <Layout location={location}>
      <Helmet title={siteTitle} />
      {posts.map(({ node }) => {
        const title = get(node, 'frontmatter.title', node.fields.slug);
        return (
          <div key={node.fields.slug}>
            <h3 style={styles.title}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
      <div>
        <h3 style={styles.title}>
          <a href="https://medium.com/@a7ul">
            📝See more blog posts on medium.com/@a7ul ...
          </a>
        </h3>
      </div>
      <br />
      <hr />
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
