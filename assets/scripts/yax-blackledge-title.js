import { LitElement, html } from 'https://jspm.dev/lit-element@2';
import { until } from 'https://jspm.dev/lit-html@1/directives/until.js';

export class YaxBlackledgeTitle extends LitElement {
	load() {
		return fetch('manifest.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Could not find manifest file');
				}
				return response.json();
			})
			.then(content => {
				return content.title;
			})
			.then(title => {
				return html`
        ${title}
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

customElements.define('yax-blackledge-title', YaxBlackledgeTitle);
