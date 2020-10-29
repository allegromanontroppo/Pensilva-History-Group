/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import './src/styles/application.scss';


const jQuery = require('jquery/src/jquery');
require('foundation-sites/js/foundation');

export const onRouteUpdate = () => {
  jQuery(function () {
    jQuery(document).foundation();
  });
};
