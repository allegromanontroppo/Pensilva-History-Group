import { useStaticQuery, graphql } from 'gatsby';
interface Image {
  title: string;
  path: string;
}

interface Location {
  lat: number;
  long: number;
}

interface Place {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  images: Image[];
  location: Location;
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
              html
              excerpt(format: HTML, pruneLength: 350, truncate: true)
              timeToRead
              frontmatter {
                title
                images {
                  path
                  title
                }
                location {
                  lat
                  long
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
      location: edge.node.frontmatter.location,
      slug: edge.node.fields.slug,
    }));
  }

  get count(): Number {
    return this.data.length;
  }

  map(callbackfn: (value: Place, index: number, array: Place[]) => unknown) {
    return this.data.map(callbackfn);
  }
}

export default Places;
