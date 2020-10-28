/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

interface Image {
	title: string;
	path: string;
}
interface Place {
	node: {
		excerpt: string;
		fields: {
			slug: string;
		};
		frontmatter: {
			title: string;
			images: Image[];
		};
	};
}
interface PlacesPageProps {
	data: {
		places: {
			totalCount: number;
			edges: Place[];
		};
	};
}

const PlacesPage: React.FC<PlacesPageProps> = ({ data }: PlacesPageProps) => {
	return (
		<Layout>
			<SEO title="Place" />
			<div className="row">
				<div className="column">
					<h1>{data.places.totalCount} Places</h1>
				</div>
			</div>
			{data.places.edges.map(place => (
				<div className="row" key={place.node.fields.slug}>
					<div className="column">
						<hr />
						<h1>
							<Link to={`/places/${place.node.fields.slug}`}>
								{place.node.frontmatter.title}
							</Link>
						</h1>
						<div className="row">
							{place.node.frontmatter.images ? (
								<>
									<div className="column medium-4 large-3">
										<Link
											to={`/places/${place.node.fields.slug}`}
											className="th"
										>
											<img
												src={place.node.frontmatter.images[0].path}
												alt={place.node.frontmatter.images[0].title}
											/>
										</Link>
									</div>
									<div className="column medium-8 large-9">
										<div
											dangerouslySetInnerHTML={{
												__html: place.node.excerpt
											}}
										/>
										<Link
											to={`/places/${place.node.fields.slug}`}
											className="button tiny radius"
										>
											View
										</Link>
									</div>
								</>
							) : (
								<div className="column">
									<div
										dangerouslySetInnerHTML={{
											__html: place.node.excerpt
										}}
									/>
									<Link
										to={`/places/${place.node.fields.slug}`}
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
		places: allMarkdownRemark(
			filter: { fields: { type: { eq: "places" } } }
			sort: { fields: [frontmatter___title], order: ASC }
		) {
			totalCount
			edges {
				node {
					excerpt
					frontmatter {
						title
						images {
							path
							title
						}
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;

export default PlacesPage;
