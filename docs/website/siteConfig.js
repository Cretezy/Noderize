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
	title: "Noderize",
	tagline: " Create a Node app in less than 30 seconds.",
	url: "https://noderize.js.org",
	baseUrl: "/",
	headerLinks: [
		{ doc: "introduction", label: "Docs" },
		// { blog: true, label: "Blog" },
		{ href: "https://github.com/Cretezy/Noderize", label: "GitHub" }
	],
	// users,
	headerIcon: "img/icon.svg",
	footerIcon: "img/icon.svg",
	favicon: "img/favicon/favicon.ico",
	colors: {
		primaryColor: "#3d434b",
		secondaryColor: "#fed766"
	},

	copyright: `Copyright © ${new Date().getFullYear()} Charles Crete`,
	organizationName: "Cretezy",
	projectName: "Noderize",

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks
		theme: "default"
	},

	scripts: ["https://buttons.github.io/buttons.js"],
	repoUrl: "https://github.com/Cretezy/Noderize",
	cname: "noderize.js.org",
	algolia: {
		apiKey: "ca0d50cdf7792b2eeaf3807f2a81cdde",
		indexName: "noderize"
	},
};

module.exports = siteConfig;
