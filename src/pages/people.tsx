/* eslint-disable no-unused-vars */
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import OffCanvas from '../components/off-canvas';
import Layout from '../components/layout';
import SEO from '../components/seo';

interface Person {
  node: {
    excerpt: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      preview: string;
    };
  };
}

interface Preview {
  node: {
    relativeDirectory: string;
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface PeoplePageProps {
  data: {
    people: {
      totalCount: number;
      edges: Person[];
    };
    previews: {
      edges: Preview[];
    };
  };
}

const previewImage = (slug: string, previews: Preview[]) => {
  const preview = previews.find(preview => preview.node.relativeDirectory === slug);

  return preview ? preview.node.childImageSharp : null;
};

const PeoplePage: React.FC<PeoplePageProps> = ({ data }: PeoplePageProps) => {
  return (
    <OffCanvas>
      <Layout>
        <SEO title={`${data.people.totalCount} People`} />
        <div className="row">
          <div className="column">
            <h1>{data.people.totalCount} People</h1>
          </div>
        </div>
        {data.people.edges.map(person => {
          const preview = previewImage(person.node.fields.slug, data.previews.edges);

          return (
            <div className="row" key={person.node.fields.slug}>
              <div className="column">
                <hr />
                <h1>
                  <Link to={`/people/${person.node.fields.slug}`}>{person.node.frontmatter.title}</Link>
                </h1>
                <div className="row">
                  {preview ? (
                    <>
                      <div className="column medium-4 large-3">
                        <Link to={`/people/${person.node.fields.slug}`} className="">
                          <Img fluid={preview.fluid} />
                        </Link>
                      </div>
                      <div className="column medium-8 large-9">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: person.node.excerpt,
                          }}
                        />
                        <Link to={`/people/${person.node.fields.slug}`} className="button tiny radius">
                          View
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="column">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: person.node.excerpt,
                        }}
                      />
                      <Link to={`/people/${person.node.fields.slug}`} className="button tiny radius">
                        View
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Layout>
    </OffCanvas>
  );
};

export const query = graphql`
  query {
    people: allMarkdownRemark(
      filter: { fields: { type: { eq: "people" } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            title
            preview
          }
          fields {
            slug
          }
        }
      }
    }

    previews: allFile(filter: { absolutePath: { regex: "/people/" }, extension: { regex: "/jpg$|png$/" } }) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            fluid(maxWidth: 270, maxHeight: 180) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default PeoplePage;
