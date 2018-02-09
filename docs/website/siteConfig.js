/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
// const users = [
// 	{
// 		caption: 'User1',
// 		image: '/test-site/img/docusaurus.svg',
// 		infoLink: 'https://www.facebook.com',
// 		pinned: true,
// 	},
// ];

const siteConfig = {
	title: 'Noderize',
	tagline: ' Create a Node app in less than 30 seconds.',
	url: 'https://cretezy.github.io/noderize',
	// url: 'https://noderize.js.org',
	baseUrl: '/noderize/',
	// baseUrl: '/',
	projectName: 'noderize',

	headerLinks: [
		{ doc: 'introduction', label: 'Docs' },
		{ blog: true, label: 'Blog' },
		{ href: 'https://github.com/Cretezy/noderize', label: 'GitHub' },
	],
	// users,
	headerIcon: 'img/icon.svg',
	footerIcon: 'img/icon.svg',
	favicon: 'img/favicon/favicon.icon',
	colors: {
		primaryColor: '#343a40',
		secondaryColor: '#809fc0',
	},

	copyright:
	`Copyright © ${new Date().getFullYear()} Charles Crete`,
	organizationName: 'Cretezy',
	projectName: 'noderize',

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks
		theme: 'default',
	},

	scripts: ['https://buttons.github.io/buttons.js'],
	repoUrl: 'https://github.com/Cretezy/noderize',
	// cname: "noderize.js.org"
};

module.exports = siteConfig;
