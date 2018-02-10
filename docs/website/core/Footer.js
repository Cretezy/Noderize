/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
	docUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
	}

	pageUrl(doc, language) {
		const baseUrl = this.props.config.baseUrl;
		return baseUrl + (language ? language + '/' : '') + doc;
	}

	render() {
		const currentYear = new Date().getFullYear();
		return (
			<footer className="nav-footer" id="footer">
				<section className="sitemap">
					<a href={this.props.config.baseUrl} className="nav-home">
						{this.props.config.footerIcon && (
							<img
								src={this.props.config.baseUrl + this.props.config.footerIcon}
								alt={this.props.config.title}
								width="66"
								height="58"
							/>
						)}
					</a>
					<div>
						<h5>Docs</h5>
						<a href={this.docUrl('introduction.html', this.props.language)}>
							Getting Started
						</a>
						<a href={this.docUrl('configuration.html', this.props.language)}>
							Configuration
						</a>
						<a href={this.docUrl('features.html', this.props.language)}>
							Features
						</a>
					</div>
					{/* <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/"
              target="_blank">
              Stack Overflow
            </a>
            <a href="https://discordapp.com/">Project Chat</a>
            <a href="https://twitter.com/" target="_blank">
              Twitter
            </a>
          </div> */}
					<div>
						<h5>More</h5>
						<a href={this.props.config.baseUrl + 'blog'}>Blog</a>
						<a href={this.props.config.repoUrl}>GitHub</a>
						<a
							className="github-button"
							href={this.props.config.repoUrl}
							data-icon="octicon-star"
							data-count-href={`/${this.props.config.organizationName}/${this.props.config.projectName}/stargazers`}
							data-show-count={true}
							data-count-aria-label="# stargazers on GitHub"
							aria-label="Star this project on GitHub">
							Star
						</a>
					</div>
				</section>

				<section className="copyright">
					Copyright &copy; {currentYear !== 2018 && "2018-"}{currentYear} Charles Crete.
				</section>
			</footer>
		);
	}
}

module.exports = Footer;
