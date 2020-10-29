/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import './src/styles/application.scss';

import jQuery from 'jquery/src/jquery';
import 'foundation-sites/js/foundation';
import Chocolat from 'chocolat'

export const onRouteUpdate = () => {
  jQuery(function ($) {
    $(document).foundation();

    Chocolat(document.querySelectorAll('.gatsby-resp-image-link'), {
      loop: true,
    });
  });
};
