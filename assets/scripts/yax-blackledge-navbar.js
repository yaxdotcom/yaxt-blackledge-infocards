import { LitElement, html } from 'https://jspm.dev/lit-element@2';

export class YaxBlackledgeNavbar extends LitElement {
	render() {
		return html`
		<style>
			.navbar {
				background-color: #f3f3f3;
				padding-left: 10px;
				padding-right: 10px;
				margin: 1px;
			}
			.navbar ul {
				margin: 0;
				padding: 0;
				display: flex;
			}
			.navbar-right {
				float: right;
			}
			.navbar li {
				list-style-type: none;
				margin: 0 1vw;
			}
			.navbar a {
			color: #666;
			text-decoration: none;
			font-size: 125%;
			}
			.navbar a:hover{
				color: darkgray;
			}
		</style>
		<nav>
			<div class="navbar">
				<a href="/index.html">Home</a>
				<ul class="navbar-right">
					<li><a href="/about.html">About</a></li>
				</ul>
			</div>
		</nav>
	`;
	}
}

customElements.define('yax-blackledge-navbar', YaxBlackledgeNavbar);
