
import { useStaticQuery, graphql } from 'gatsby';

interface Image {
  title: string;
  path: string;
}
interface Person {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  images: Image[];
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
              html
              excerpt(format: HTML, pruneLength: 350, truncate: true)
              frontmatter {
                title
                images {
                  path
                  title
                }
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
      html: edge.node.html,
      excerpt: edge.node.excerpt,
      title: edge.node.frontmatter.title,
      images: edge.node.frontmatter.images || [],
      slug: edge.node.fields.slug,
    }));
  }

  get count(): Number {
    return this.data.length;
  }

  map(callbackfn: (value: Person, index: number, array: Person[]) => unknown) {
    return this.data.map(callbackfn);
  }
}

export default People;
