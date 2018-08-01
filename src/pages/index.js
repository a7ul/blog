import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Bio from '../components/Bio';
import Medium from '../components/Medium';
import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

const BlogIndex = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const posts = get(props, 'data.allMarkdownRemark.edges');
  const mediumPosts = get(props, 'data.allMediumPost.edges');
  const { location } = props;
  return (
    <Layout location={location}>
      <Helmet title={siteTitle} />
      {posts.map(({ node }) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>
              {node.frontmatter.date}
            </small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
      <Medium posts={mediumPosts} />
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
    allMediumPost(sort: { fields: [firstPublishedAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt(formatString: "DD MMMM, YYYY")
          firstPublishedAt(formatString: "DD MMMM, YYYY")
          uniqueSlug
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
          author {
            name
            username
          }
        }
      }
    }
  }
`;
