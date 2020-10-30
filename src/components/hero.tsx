/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import heroStyles from '../styles/hero.module.scss';

const Hero: React.FC = () => {
	const { site, placeholderImage } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
			placeholderImage: file(relativePath: { eq: "engine-house.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 1400) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<header className={heroStyles.bannerImg}>
			<div
				className={heroStyles.atmospheric}
				style={{
					backgroundImage: `url(${placeholderImage.childImageSharp.fluid.src})`
				}}
			>
				<div className={heroStyles.titleArea}>
					<h1>{site.siteMetadata.title}</h1>
				</div>
			</div>
		</header>
	);
};

export default Hero;
