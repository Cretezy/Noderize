/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Noderize' /* title for your website */,
  tagline: ' Create a Node app in less than 30 seconds.',
  url: 'https://cretezy.github.io/noderize' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'noderize',
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {blog: true, label: 'Blog'},
    { href: 'https://github.com/Cretezy/noderize', label: 'GitHub' },
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/icon.svg',
  footerIcon: 'img/icon.svg',
  favicon: 'img/favicon/favicon.icon',
  /* colors for website */
  colors: {
    primaryColor: '#343a40',
    secondaryColor: '#809fc0',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Charles Crete',
  organizationName: 'Cretezy', // or set an env variable ORGANIZATION_NAME
  projectName: 'noderize', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/Cretezy/noderize',
};

module.exports = siteConfig;
