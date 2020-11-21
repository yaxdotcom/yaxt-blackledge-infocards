import { LitElement, html } from 'https://jspm.dev/lit-element@2';
import { until } from 'https://jspm.dev/lit-html@1/directives/until.js';
import { unsafeHTML } from 'https://jspm.dev/lit-html@1/directives/unsafe-html.js';

export class YaxBlackledgeHeading extends LitElement {
	getFilename() {
		let filename = window.location.href
			.split('/')
			.pop()
			.replace('.html', '');
		if (filename == '') filename = 'index';
		return filename;
	}

	load() {
		return fetch('/manifest.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Could not find manifest file');
				}
				return response.json();
			})
			.then(content => {
				return content.pages;
			})
			.then(pages => {
				let filename = this.getFilename();
				let heading = '';
				for (const [key, value] of Object.entries(pages)) {
					if (value.url.includes(filename)) {
						heading += '<h1>';
						heading += value.title;
						heading += '</h1>';
						heading += '<p><strong>';
						heading += value.summary;
						heading += '</strong></p>';
						break;
					}
				}
				return html`
			<div>
				${unsafeHTML(heading)}
			</div>
			`;
			})
			.catch(error => {
				console.error('Fetch failure:', error);
				return html`<h4>Error</h4>`;
			});
	}

	render() {
		return until(
			this.load().then(content => content),
			html`<h4>Loading...</h4>`
		);
	}
}

customElements.define('yax-blackledge-heading', YaxBlackledgeHeading);
