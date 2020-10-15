module.exports = {
	siteMetadata: {
		title: 'Pensilva History Group',
		description: "Pensilva History Group's aim is to study and record the history, both industrial and social, of Pensilva and the Parish of St Ive",
		author: 'Angus Holland'
	},
	plugins: [
		'gatsby-plugin-eslint',
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Pensilva History Group',
				short_name: 'Pensilva',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/places/south-caradon-mine/A9_South_Caradon_Mine_-_Holmans_and_Rules_shafts.jpg' // This path is relative to the root of the site.
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	]
};
