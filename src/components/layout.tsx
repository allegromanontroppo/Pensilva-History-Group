/* eslint-disable no-unused-vars */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import TopBar from './top-bar';

const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);

  return (
    <>
      <TopBar siteTitle={site.siteMetadata.title} />
      <main>{children}</main>
      <footer>
        <div className="row">
          <div className="column">
            © {new Date().getFullYear()}. Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a> by {site.siteMetadata.author}
          </div>
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
