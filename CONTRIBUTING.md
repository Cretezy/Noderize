# Introduction

Thank you for your interest in contributing to Noderize! This file explains how to contribute, and general guidelines for the community.

We're looking for any positive contribution that can help the project and it's users'. This means answering questions and filing PRs, or simply using Noderize!

Noderize supports quite a lot of features, but we don't want to become a kitchen sink of features either. We aim to support to majority of use cases, for the majority of people.

## Ground Rules

* Ensure cross-platform compatibility for every change that's accepted. Try to maintain backwards compatibility as much as possible.
* Ensure the changes are useful to you, and the community.
* Check for overlapping PR or features. Don't code twice if not needed, DRY.
* Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
* Keep PR to one per feature. Break up multiple changes into smaller PRs.
* Be welcoming to newcomers and encourage diverse new contributors from all backgrounds.

## Your First Contribution

Unsure where to begin contributing to Noderize? You can start by looking through the beginner and help-wanted issues.

* [Beginner issues](https://github.com/Cretezy/Noderize/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/Cretezy/Noderize/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22help+wanted%22) - issues which should be a bit more involved than beginner issues.

> Working on your first PR? You can learn how from this (*free*) video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

# Getting started

* Create your own fork of the code. This is the "Fork" button on GitHub.
* Clone the repo to your computer and setup the repo:
    * You will need `node` install, with [`yarn`](https://yarnpkg.com).
    * `cd` into the cloned project and run `lerna bootstrap`. This will install dependencies.
    * `cd` into `packages/scripts` and run `yarn prepack`. This will bootstrap the Noderize scripts.
* Make your changes!
    * You can run `yarn build` in the `packages/script` directory to build your changes.
    * Use `lerna link` to relink the new built version.
    * You can then test out the changes with the `packages/create` package. Run `yarn build` there to use your modified scripts.
    * Optionally, write tests for your changes.
* Before making a commit, make sure to run `yarn format` in your modified package to format the code to the project's style.
* When commiting, write the commit message in the format: `(package): changes, other change; (other-package): more changes`.
    * Use `(package)` for the scope (with `package` being either: `scripts`, `create`, `runtime`, `docs`, `*`, or other)
    * Write your changes, seperated with a comma (`,`).
    * If modifying multiple packages, seperate them with a semi-column (`;`).
    * Look at the commit history (`git log`) for a better idea of this format.
* Push, and make a pull request!

# How to report a bug

If you find a major security vulnerability, do *NOT* open an issue. Email `charles@cretezy.com` instead.

When filing an issue, make sure to answer these questions:

* What version of Noderize and Node are you using?
* What operating system are you using? Are you using any special setup?
* What did you do?
* What did you expect to see?
* What did you see instead?

# How to suggest a feature or enhancement

First of all, make sure the feature doesn't already exist! Give [the docs](https://noderize.js.org) a thorough look.

Check for PRs or issues with your suggestion. The search box is your friend!

If you can't find anything, open an issue with a detailed, but consist explanation for your suggestion.
Explain how it is useful to you and others, and what value it brings.
