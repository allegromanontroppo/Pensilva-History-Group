/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

interface TopBarProps {
	siteTitle: string;
}

const TopBar = ({ siteTitle }: TopBarProps) => {
	const { people, places } = useStaticQuery(graphql`
		query {
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
			places: allMarkdownRemark(
				filter: { fields: { type: { eq: "places" } } }
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
	`);

	return (
		<div className="contain-to-grid show-for-large-up">
			<nav className="top-bar" data-topbar="" role="navigation">
				<ul className="title-area">
					<li className="name">
						<h1>
							<Link to="/">{siteTitle}</Link>
						</h1>
					</li>
				</ul>
				<section className="top-bar-section">
					<ul className="right">
						<li className="divider"></li>
						<li className="has-dropdown">
							<Link to="/places">{places.totalCount} Places</Link>
							<ul className="dropdown">
								{places.edges.map((place: any) => (
									<li key={place.node.fields.slug}>
										<Link to={`/places/${place.node.fields.slug}`}>
											{place.node.frontmatter.title}
										</Link>
									</li>
								))}
							</ul>
						</li>
						<li className="has-dropdown">
							<Link to="/people">{people.totalCount} People</Link>
							<ul className="dropdown">
								{people.edges.map((person: any) => (
									<li key={person.node.fields.slug}>
										<Link to={`/people/${person.node.fields.slug}`}>
											{person.node.frontmatter.title}
										</Link>
									</li>
								))}
							</ul>
						</li>
						<li className="has-dropdown">
							<Link to="/galleries">Galleries</Link>
							<ul className="dropdown"></ul>
						</li>
					</ul>
				</section>
			</nav>
		</div>
	);
};

TopBar.propTypes = {
	siteTitle: PropTypes.string
};

TopBar.defaultProps = {
	siteTitle: ''
};

export default TopBar;
