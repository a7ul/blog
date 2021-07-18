import { graphql, Link } from 'gatsby';
import React from 'react';
import './404.scss';

const NotFoundPage = (props) => {
  const posts = props.data?.allMarkdownRemark?.edges ?? [];

  return (
    <div className="notfound-container">
      <h1>Oops! This link is broken (404)</h1>
      <iframe
        className="notfound-video-frame"
        width="480"
        height="320"
        src="https://www.youtube.com/embed/KCy6DoO6G_g?autoplay=1&controls=1&&showinfo=0&loop=1&modestbranding=1"
        title="404 not found"
        frameborder="0"
        allow="accelerometer;autoplay;picture-in-picture"
      ></iframe>
      <h3>Other recent posts you may like: </h3>
      <ol>
        {posts.map(({ node }) => {
          return (
            <li key={node.frontmatter?.slug}>
              <p>
                <Link
                  style={{ boxShadow: 'none' }}
                  to={`/${node.frontmatter?.slug}`}
                >
                  {node.frontmatter?.title}
                </Link>
              </p>
            </li>
          );
        })}
        <p>
          <br />
          <Link style={{ boxShadow: 'none' }} to={'/'}>
            Click for more ....
          </Link>
          <br />
        </p>
      </ol>
    </div>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotfoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            slug
          }
        }
      }
    }
  }
`;
