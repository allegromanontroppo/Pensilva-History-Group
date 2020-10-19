/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

interface TopBarProps {
	siteTitle: string;
}

interface Person {
	node: {
		frontmatter: {
			title: string;
			slug: string;
		};
	};
}

const TopBar = ({ siteTitle }: TopBarProps) => {
	const {
		allMarkdownRemark: { edges: people }
	} = useStaticQuery(graphql`
		query {
			allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
				edges {
					node {
						frontmatter {
							title
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
							<Link to="/places">Places</Link>
							<ul className="dropdown"></ul>
						</li>
						<li className="has-dropdown">
							<Link to="/people">{people.length} People</Link>
							<ul className="dropdown">
								{people.map((person: Person) => (
									<li>
										<Link to={`/people/${person.node.frontmatter.slug}`}>
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
