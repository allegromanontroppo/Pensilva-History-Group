/* eslint-disable no-unused-vars */
import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

interface Place {
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

interface Preview {
	node: {
		relativeDirectory: string;
		childImageSharp: {
			fluid: FluidObject;
		};
	};
}

interface PlacesPageProps {
	data: {
		places: {
			totalCount: number;
			edges: Place[];
		};
		previews: {
			edges: Preview[];
		};
	};
}

const previewImage = (slug: string, previews: Preview[]) => {
	const preview = previews.find(
		preview => preview.node.relativeDirectory === slug
	);

	return preview ? preview.node.childImageSharp : null;
};

const PlacesPage: React.FC<PlacesPageProps> = ({ data }: PlacesPageProps) => {
	return (
		<Layout>
			<SEO title={`${data.places.totalCount} Places`} />
			<div className="row">
				<div className="column">
					<h1>{data.places.totalCount} Places</h1>
				</div>
			</div>
			{data.places.edges.map(place => {
				const preview = previewImage(
					place.node.fields.slug,
					data.previews.edges
				);

				return (
					<div className="row" key={place.node.fields.slug}>
						<div className="column">
							<hr />
							<h1>
								<Link to={`/places/${place.node.fields.slug}`}>
									{place.node.frontmatter.title}
								</Link>
							</h1>
							<div className="row">
								{preview ? (
									<>
										<div className="column medium-4 large-3">
											<Link
												to={`/places/${place.node.fields.slug}`}
												className=""
											>
												<Img fluid={preview.fluid} />
											</Link>
										</div>
										<div className="column medium-8 large-9">
											<div
												dangerouslySetInnerHTML={{ __html: place.node.excerpt }}
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
											dangerouslySetInnerHTML={{ __html: place.node.excerpt }}
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
				);
			})}
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
					excerpt(pruneLength: 300)
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
		previews: allFile(
			filter: {
				absolutePath: { regex: "/places/" }
				extension: { regex: "/jpg$|png$/" }
			}
		) {
			edges {
				node {
					relativeDirectory
					childImageSharp {
						fluid(maxWidth: 270, maxHeight: 180) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;

export default PlacesPage;
