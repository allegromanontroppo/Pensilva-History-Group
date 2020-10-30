/* eslint-disable no-unused-vars */
import React from 'react';

import OffCanvas from '../components/off-canvas';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, Link } from 'gatsby';

interface Place {
  html: string;
  frontmatter: {
    title: string;
  };
}

interface PlaceLink {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

interface PlaceTemplateProps {
  data: {
    place: Place;
    places: {
      edges: PlaceLink[];
    };
  };
}

const PlaceTemplate: React.FC<PlaceTemplateProps> = ({ data }: PlaceTemplateProps) => {
  return (
    <OffCanvas>
      <Layout>
        <SEO title={data.place.frontmatter.title} />
        <div className="row">
          <div className="column">
            <h1>
              Places: <span className="subheader">{data.place.frontmatter.title}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="column large-8">
            <article dangerouslySetInnerHTML={{ __html: data.place.html }} />
          </div>

          <div className="column large-4">
            <div className="panel">
              <ul className="no-bullet">
                <li key="home-page">
                  <Link to="/">Home Page</Link>
                </li>
                <hr />
                {data.places.edges.map(places => (
                  <li key={places.node.fields.slug}>
                    <Link to={`/places/${places.node.fields.slug}`}>{places.node.frontmatter.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </OffCanvas>
  );
};

export const query = graphql`
  query($slug: String!) {
    place: markdownRemark(fields: { slug: { eq: $slug }, type: { eq: "places" } }) {
      html
      frontmatter {
        title
      }
    }
    places: allMarkdownRemark(
      filter: { fields: { type: { eq: "places" } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      totalCount
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
`;

export default PlaceTemplate;
