
import { useStaticQuery, graphql } from 'gatsby';

interface Person {
  title: string;
  slug: string;
}

class People {
  private data: Person[];

  constructor() {
    const {
      allMarkdownRemark: { edges }
    } = useStaticQuery(graphql`
      query {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "people" } } }
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

  get all(): Person[] {
    return this.data;
  }
}

export default People;
