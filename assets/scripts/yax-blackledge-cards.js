import { LitElement, html } from 'https://jspm.dev/lit-element@2';
import { until } from 'https://jspm.dev/lit-html@1/directives/until.js';
import { unsafeHTML } from 'https://jspm.dev/lit-html@1/directives/unsafe-html.js';

export class YaxBlackledgeCards extends LitElement {
	constructor() {
		super();
		this.cards_per_row = 3;
	}

	static get properties() {
		return {
			cards_per_row: { type: Number },
		};
	}

	createRenderRoot() {
		return this;
	}

	load() {
		return fetch('manifest.json')
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
				let cards = '';
				let count = 0;
				cards += '<section>';
				for (const [key, value] of Object.entries(pages)) {
					count = parseInt(key);
					cards += '<article>';
					cards += '<h4>';
					cards += value.title;
					cards += '</h4>';
					cards += '<p>';
					cards += value.summary;
					cards += '</p>';
					cards += '<br>\n';
					cards += '<a href="';
					cards += value.url;
					cards += '">Read more</a>';
					cards += '</article>';
					if ((count + 1) % this.cards_per_row == 0) {
						cards += '</section><section>';
					}
				}
				cards += '</section>';
				return html`
      <div>
        ${unsafeHTML(cards)}
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

customElements.define('yax-blackledge-cards', YaxBlackledgeCards);
