module.exports = {
  siteMetadata: {
    title: 'Pensilva History Group',
    description:
      "Pensilva History Group's aim is to study and record the history, both industrial and social, of Pensilva and the Parish of St Ive",
    author: 'Angus Holland',
  },
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        printAll: true,
        develop: true, // Enable while using `gatsby develop`
        ignore: ['chocolat.css'],
        whitelist: [
          'foundation-mq-small',
          'foundation-mq-small-only',
          'foundation-mq-medium',
          'foundation-mq-medium-only',
          'foundation-mq-large',
          'foundation-mq-large-only',
          'foundation-mq-xlarge',
          'foundation-mq-xlarge-only',
          'foundation-mq-xxlarge',
          'foundation-data-attribute-namespace',
          'js-generated',
          'parent-link',
          'back',
          'title',
          'not-click',
          'move-right',
          'exit-off-canvas',
        ], // Don't remove this selector
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'people',
        path: `${__dirname}/src/people/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'places',
        path: `${__dirname}/src/places/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pensilva History Group',
        short_name: 'Pensilva',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/engine-house.jpg', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
