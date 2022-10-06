import React from 'react';
import './footer-component-styles.scss';
import img1 from '../../imgs/brand.png';

function Footer() {
	// Render component
	return (
		<div className="footer">
			<div className="footer-content">
				<ul>
					<li>
						<a id="pp" href="#!">
							Privacy Policy
						</a>
					</li>
					<li>
						<a id="tos" href="#!">
							Terms Of Service
						</a>
					</li>
					<li>
						<a id="con" href="#!">
							Contact Us
						</a>
					</li>
					<li>
						<a id="crr" href="#!">
							Careers
						</a>
					</li>
					<li>
						<a id="lgl" href="#!">
							Legal
						</a>
					</li>
				</ul>
				<img src={img1} alt="" />
				<p>
					Built by Guillermo Gonzalez for demonstration purposes only. For
					custom design options or any other questions contact me{' '}
					<a href="mailto:ggnino18@gmail.com" rel="noreferrer" target="_blank">
						here.
					</a>{' '}
				</p>
			</div>
		</div>
	);
}

export default Footer;
