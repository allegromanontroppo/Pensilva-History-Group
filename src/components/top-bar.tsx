/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import People from '../data/people';
import Places from '../data/places';

interface TopBarProps {
	siteTitle: string;
}

const TopBar = ({ siteTitle }: TopBarProps) => {
	const people = new People();
	const places = new Places();

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
							<Link to="/places">{places.count} Places</Link>
							<ul className="dropdown">
								{places.map(({ slug, title }) => (
									<li>
										<Link to={`/places/${slug}`}>{title}</Link>
									</li>
								))}
							</ul>
						</li>
						<li className="has-dropdown">
							<Link to="/people">{people.count} People</Link>
							<ul className="dropdown">
								{people.map(({ slug, title }) => (
									<li>
										<Link to={`/people/${slug}`}>{title}</Link>
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
