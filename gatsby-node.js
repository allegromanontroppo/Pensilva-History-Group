/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions;

    const slug = createFilePath({ node, getNode, basePath: 'pages' }).replace(/\//g, '');
    const type = path.basename(path.dirname(node.fileAbsolutePath));

    for (const [name, value] of Object.entries({ slug, type })) {
      createNodeField({ node, name, value });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const people = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { type: { eq: "people" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  people.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `people/${node.fields.slug}`,
      component: path.resolve(`./src/templates/person.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });

  const places = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { type: { eq: "places" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  places.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `places/${node.fields.slug}`,
      component: path.resolve(`./src/templates/place.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
