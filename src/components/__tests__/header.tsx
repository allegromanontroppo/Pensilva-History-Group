/* eslint-disable no-unused-vars */
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import TopBar from '../top-bar';

describe('TopBar', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(<TopBar siteTitle="Default Starter" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
