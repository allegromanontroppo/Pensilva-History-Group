/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';
import Places from '../data/places';

import Layout from '../components/layout';
import SEO from '../components/seo';

const PlacesePage: React.FC = () => {
	const places = new Places();
	return (
		<Layout>
			<SEO title="Place" />
			<div className="row">
				<div className="column">
					<h1>Places</h1>
				</div>
			</div>
			{places.map(({ slug, title, excerpt, images }) => (
				<>
					<div className="row">
						<div className="column">
							<hr />
							<h1>
								<Link to={`/places/${slug}`}>{title}</Link>
							</h1>
							<div className="row">
								{images.length ? (
									<>
										<div className="column medium-4 large-3">
											<Link to={`/places/${slug}`} className="th">
												<img src={images[0].path} alt={images[0].title} />
											</Link>
										</div>
										<div className="column medium-8 large-9">
											<div dangerouslySetInnerHTML={{ __html: excerpt }} />
											<Link
												to={`/places/${slug}`}
												className="button tiny radius"
											>
												View
											</Link>
										</div>
									</>
								) : (
									<div className="column">
										<div dangerouslySetInnerHTML={{ __html: excerpt }} />
										<Link to={`/places/${slug}`} className="button tiny radius">
											View
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			))}
		</Layout>
	);
};

export default PlacesePage;
