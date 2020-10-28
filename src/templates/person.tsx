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
interface PersonTemplateProps {
	data: {
		markdownRemark: Person;
	};
}

const PersonTemplate: React.FC<PersonTemplateProps> = ({
	data
}: PersonTemplateProps) => {
	return (
		<Layout>
			<div className="row">
				<div className="column">
					<h1>
						People:{' '}
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
		markdownRemark(fields: { slug: { eq: $slug }, type: { eq: "people" } }) {
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

export default PersonTemplate;
