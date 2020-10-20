import { useStaticQuery, graphql } from 'gatsby';

interface Place {
  title: string;
  slug: string;
}

class Places {
  private data: Place[];

  constructor() {
    const {
      allMarkdownRemark: { edges }
    } = useStaticQuery(graphql`
    	query {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "places" } } }
          sort: { fields: [frontmatter___title], order: ASC }) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `);

    this.data = edges.map((edge: any) => ({
      title: edge.node.frontmatter.title,
      slug: edge.node.fields.slug,
    }));
  }

  get count(): Number {
    return this.data.length;
  }

  get all(): Place[] {
    return this.data;
  }
}

export default Places;
