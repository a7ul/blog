module.exports = {
  siteMetadata: {
    title: 'Blog',
    author: 'Atul R',
    description: 'Build things for fun',
    siteUrl: 'https://blog.atulr.com',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-no-sourcemaps',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: { shortname: 'atulr' },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              wrapperStyle: 'max-width:100% !important;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          { resolve: 'gatsby-plugin-sitemap' },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-65870043-2' },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: { pathToConfigModule: 'src/utils/typography' },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      frontmatter {
                        title
                        date
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Atul's RSS Feed",
          },
        ],
      },
    },
  ],
};
