/* eslint-disable no-unused-vars */
import React from 'react';

import OffCanvas from '../components/off-canvas';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql, Link } from 'gatsby';

interface Person {
	html: string;
	frontmatter: {
		title: string;
	};
}

interface PersonLink {
	node: {
		fields: {
			slug: string;
		};
		frontmatter: {
			title: string;
		};
	};
}

interface PersonTemplateProps {
	data: {
		person: Person;
		people: {
			edges: PersonLink[];
		};
	};
}

const PersonTemplate: React.FC<PersonTemplateProps> = ({
	data
}: PersonTemplateProps) => {
	return (
		<OffCanvas>
			<Layout>
				<SEO title={data.person.frontmatter.title} />
				<div className="row">
					<div className="column">
						<h1>
							People:{' '}
							<span className="subheader">{data.person.frontmatter.title}</span>
						</h1>
					</div>
				</div>
				<div className="row">
					<div className="column large-8">
						<article dangerouslySetInnerHTML={{ __html: data.person.html }} />
					</div>
					<div className="column large-4">
						<div className="panel">
							<ul className="no-bullet">
								<li key="home-page">
									<Link to="/">Home Page</Link>
								</li>
								<hr />
								{data.people.edges.map(person => (
									<li key={person.node.fields.slug}>
										<Link to={`/people/${person.node.fields.slug}`}>
											{person.node.frontmatter.title}
										</Link>
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
		person: markdownRemark(
			fields: { slug: { eq: $slug }, type: { eq: "people" } }
		) {
			html
			frontmatter {
				title
			}
		}
		people: allMarkdownRemark(
			filter: { fields: { type: { eq: "people" } } }
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

export default PersonTemplate;
