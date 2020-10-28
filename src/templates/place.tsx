/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

interface Image {
	title: string;
	path: string;
}
interface Person {
	html: string;
	frontmatter: {
		title: string;
		images: Image[];
	};
}
interface PlaceTemplateProps {
	data: {
		markdownRemark: Person;
	};
}

const PlaceTemplate: React.FC<PlaceTemplateProps> = ({
	data
}: PlaceTemplateProps) => {
	return (
		<Layout>
			<div className="row">
				<div className="column">
					<h1>
						Places:{' '}
						<span className="subheader">
							{data.markdownRemark.frontmatter.title}
						</span>
					</h1>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<article
						dangerouslySetInnerHTML={{
							__html: data.markdownRemark.html
						}}
					/>
				</div>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }, type: { eq: "places" } }) {
			html
			frontmatter {
				title
				images {
					path
					title
				}
			}
		}
	}
`;

export default PlaceTemplate;
