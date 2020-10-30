/* eslint-disable no-unused-vars */
import * as React from 'react';

import OffCanvas from '../components/off-canvas';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
	<OffCanvas>
		<Layout>
			<SEO title="404: Not found" />

			<div className="row">
				<div className="column">
					<h1>NOT FOUND</h1>
					<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
				</div>
			</div>
		</Layout>
	</OffCanvas>
);

export default NotFoundPage;
