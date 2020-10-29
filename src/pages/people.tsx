/* eslint-disable no-unused-vars */
import * as React from 'react';
import { graphql, Link } from 'gatsby';

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
interface PeoplePageProps {
	data: {
		people: {
			totalCount: number;
			edges: Person[];
		};
	};
}

const PeoplePage: React.FC<PeoplePageProps> = ({ data }: PeoplePageProps) => {
	return (
		<Layout>
			<SEO title="People" />
			<div className="row">
				<div className="column">
					<h1>{data.people.totalCount} People</h1>
				</div>
			</div>
			{data.people.edges.map(person => (
				<div className="row" key={person.node.fields.slug}>
					<div className="column">
						<hr />
						<h1>
							<Link to={`/people/${person.node.fields.slug}`}>
								{person.node.frontmatter.title}
							</Link>
						</h1>
						<div className="row">
							{person.node.frontmatter.preview ? (
								<>
									<div className="column medium-4 large-3">
										<Link
											to={`/people/${person.node.fields.slug}`}
											className="th"
										>
											<img src={person.node.frontmatter.preview} />
										</Link>
									</div>
									<div className="column medium-8 large-9">
										<div
											dangerouslySetInnerHTML={{ __html: person.node.excerpt }}
										/>
										<Link
											to={`/people/${person.node.fields.slug}`}
											className="button tiny radius"
										>
											View
										</Link>
									</div>
								</>
							) : (
								<div className="column">
									<div
										dangerouslySetInnerHTML={{ __html: person.node.excerpt }}
									/>
									<Link
										to={`/people/${person.node.fields.slug}`}
										className="button tiny radius"
									>
										View
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</Layout>
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
					excerpt
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
	}
`;

export default PeoplePage;
