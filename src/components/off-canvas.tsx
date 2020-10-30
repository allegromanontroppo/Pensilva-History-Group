/* eslint-disable no-unused-vars */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

const OffCanvas: React.FC = ({ children }) => {
	const { site, people, places } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					author
				}
			}
			people: allMarkdownRemark(
				filter: { fields: { type: { eq: "people" } } }
				sort: { fields: [frontmatter___title], order: ASC }
			) {
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
			places: allMarkdownRemark(
				filter: { fields: { type: { eq: "places" } } }
				sort: { fields: [frontmatter___title], order: ASC }
			) {
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
	`);

	return (
		<div className="off-canvas-wrap" data-offcanvas>
			<div className="inner-wrap">
				<nav className="tab-bar hide-for-medium-up">
					<div className="left-small">
						<a className="left-off-canvas-toggle menu-icon" href="#">
							<span />
						</a>
						<div className="middle tab-bar-section">
							<h1 className="title">{site.siteMetadata.title}</h1>
						</div>
					</div>
				</nav>
				<div className="left-off-canvas-menu">
					<ul className="off-canvas-list">
						<li>
							<Link to="/">Home</Link>
						</li>

						<li className="has-submenu">
							<a href="#">Places</a>
							<ul className="left-submenu">
								<li className="back">
									<a href="#">Back</a>
								</li>
								<li>
									<label>Places</label>
								</li>

								{places.edges.map((place: any) => (
									<li key={place.node.fields.slug}>
										<Link to={`/places/${place.node.fields.slug}`}>
											{place.node.frontmatter.title}
										</Link>
									</li>
								))}
							</ul>
						</li>

						<li className="has-submenu">
							<a href="#">People</a>
							<ul className="left-submenu">
								<li className="back">
									<a href="#">Back</a>
								</li>
								<li>
									<label>People</label>
								</li>

								{people.edges.map((person: any) => (
									<li key={person.node.fields.slug}>
										<Link to={`/people/${person.node.fields.slug}`}>
											{person.node.frontmatter.title}
										</Link>
									</li>
								))}
							</ul>
						</li>
					</ul>
				</div>
				{children}
				<a className="exit-off-canvas" />
			</div>
		</div>
	);
};

OffCanvas.propTypes = {
	children: PropTypes.node.isRequired
};

export default OffCanvas;
