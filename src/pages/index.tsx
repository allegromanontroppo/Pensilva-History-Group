/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';

const IndexPage: React.FC = () => {
	return (
		<>
			<Hero />
			<Layout>
				<SEO title="Home" />
				<div className="row">
					<article className="column large-8">
						<p>
							Welcome to the website of the Pensilva History Group. The Group
							was formed in January 2011 with sponsorship and assistance from
							the{' '}
							<a href="http://www.caradonhill.org.uk/">
								Caradon Hill Area Heritage Project (CHAHP)
							</a>{' '}
							which was in turn funded by The Heritage Lottery. The Caradon Hill
							Area Heritage Project finished in March 2014, however, a Legacy
							Group has been formed consisting of members of the various groups
							and organisations begun under the CHAHP umbrella. The aim of the
							Legacy Group is to continue the good work undertaken by the
							Caradon Hill Area Heritage Project. Our History Group's aim is to
							study and record the history, both industrial and social, of
							Pensilva and the Parish of St Ive.
						</p>
						<p>
							We hope to publish our research and findings on this website for
							the benefit of our Group, the general public and indeed anyone who
							has an interest in this fascinating part of World Heritage
							Cornwall. We hope the website will become interactive and would
							encourage any comments or information from anyone who has any
							historical information about our area.
						</p>
						<p>
							We would love to hear about your house, your Cornish ancestors,
							your memories of the area and your stories. Please feel free to
							use the <Link to="/contact-us">Contact Us</Link> facility - we
							will get back to you.
						</p>
						<p>
							Throughout the year we hold various events and have talks on
							different aspects of the area. Details are usually published in
							the Parish Pump.
						</p>

						<div className="flex-video">
							<iframe
								src="https://www.youtube.com/embed/zMv0o9-exeI?rel=0?ecver=2"
								width="100%"
								height="360"
								frameBorder="0"
							/>
						</div>
					</article>
					<aside className="column large-4">
						<div className="panel radius">
							<h5>
								From the Royal Cornwall Gazette, Falmouth Packet, Cornish Weekly
								News and General Advertiser of Thursday, November 23, 1871.
							</h5>
							<blockquote>
								VAGRANTS - P.C. Lyle of the county constabulary has locked up
								two of these pests this week - tough, hardy, lazy chaps of 30,
								one a discharged soldier, the other a schoolmaster, who were
								begging in Ludgvan - and Major Trelawney has sent them to the
								treadwheel for 14 days.
							</blockquote>
						</div>
					</aside>
				</div>
			</Layout>
		</>
	);
};

export default IndexPage;
