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

    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    const type = path.basename(path.dirname(node.fileAbsolutePath));

    for (const [name, value] of Object.entries({ slug, type })) {
      createNodeField({ node, name, value });
    }
  }
}
