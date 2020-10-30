/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import heroStyles from '../styles/hero.module.scss';

const Hero: React.FC = () => {
  const { site, mobileHeroImage, tabletHeroImage, desktopHeroImage } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }

      mobileHeroImage: file(relativePath: { eq: "engine-house.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tabletHeroImage: file(relativePath: { eq: "engine-house.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 900, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      desktopHeroImage: file(relativePath: { eq: "engine-house.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const sources = [
    mobileHeroImage.childImageSharp.fluid,
    { ...tabletHeroImage.childImageSharp.fluid, media: '(min-width: 501px)' },
    { ...desktopHeroImage.childImageSharp.fluid, media: '(min-width: 901px)' },
  ];

  return (
    <header>
      <BackgroundImage className={heroStyles.atmospheric} fluid={sources}>
        <h1 className={heroStyles.title}>{site.siteMetadata.title}</h1>
      </BackgroundImage>
    </header>
  );
};

export default Hero;
