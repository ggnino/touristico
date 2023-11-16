import React from "react";
import Button from "../button-component/button-component";
import "./benefits-page-component-styles.scss";
import img1 from "../../imgs/earn.png";
import img2 from "../../imgs/earn2.png";
import img3 from "../../imgs/repeat.png";
import img5 from "../../imgs/rewards.jpg";
import img6 from "../../imgs/far.jpg";

function BenefitsPage(props) {
	// Render component
	return (
		<>
			<div
				className="benefits-content-info flex flex-col"
				style={{ display: props.style }}
			>
				<h2 className="my-heading">
					Love traveling? Love saving on traveling more? Say hello to our
					membership program.
				</h2>
				<Button
					msg={"Touristico Rewards"}
					class={"home text-gradient"}
					link={"/signup"}
				/>

				<p>
					<br />
					Get more out of your trips with{" "}
					<span className="text-gradient">Touristico Rewards.</span> <br /> Join
					today to start collecting points, enjoy Member Prices, and be on your
					way to unlocking membership perks.
				</p>
			</div>

			<article
				className="benefits-content-rewards flex"
				style={{ display: props.style }}
			>
				<div className="benefits-content-rewards-reward flex flex-col">
					<img src={img1} alt="" />
					<h2 className="my-heading">Earn</h2>
					<p>
						Collect points on eligible bookings and gain access to Member Prices
						while logged in to your account.
					</p>
				</div>

				<div className="benefits-content-rewards-reward flex flex-col ">
					<img src={img2} alt="" />
					<h2 className="my-heading">Redeem</h2>
					<p>
						We’ll then convert your earned points into dollars that you can use
						to save on your next eligible trip.
					</p>
				</div>
				<div className="benefits-content-rewards-reward flex flex-col">
					<img src={img3} alt="" />
					<h2 className="my-heading">Repeat</h2>
					<p>
						Keep traveling to earn more and be on your way to higher tiers for
						additional member-only perks.
					</p>
				</div>
			</article>
			<article
				className=" benefits-content-membership flex flex-col"
				style={{ display: props.style }}
			>
				<img src={img5} alt="" />
				<p>
					<span className="text-gradient">Touristico Rewards</span>
					members can get instant access to savings worth 10% or more thanks to
					Member Prices.
				</p>
				<h2 className="my-heading">
					Instantly enjoy Member Prices as soon as you join!
				</h2>
			</article>
			<article
				className="benefits-content-membership flex flex-col"
				style={{ display: props.style }}
			>
				<img src={img6} alt="" />
				<p>
					Your rewards keep growing the more you travel and as you reach higher
					membership tiers you’ll unlock new perks. See what’s in store at each
					tier level and discover all the{" "}
					<span className="text-gradient">Touristico Rewards</span>benefits.
				</p>
				<h2 className="my-heading">
					How far can <em className="text-gradient">Touristico Rewards</em> take
					you?
				</h2>
			</article>
		</>
	);
}

export default BenefitsPage;
