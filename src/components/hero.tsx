/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Hero: React.FC = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<header className="banner-img">
			<div
				className="atmospheric"
				style={{
					backgroundImage: `url(https://pensilva-history-group.netlify.app/images/engine-house-large-1500x.jpg)`
				}}
			>
				<div className="title-area">
					<h1>{data.site.siteMetadata.title}</h1>
				</div>
			</div>
		</header>
	);
};

export default Hero;
