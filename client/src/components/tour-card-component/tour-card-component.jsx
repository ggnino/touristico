import React from "react";
import "./tour-card-component-styles.scss";
import img2 from "../../imgs/location.png";
import img3 from "../../imgs/stops.png";
import img4 from "../../imgs/calendar.png";
import img5 from "../../imgs/people.png";
import Button from "../button-component/button-component";
function TourCard(props) {
	// Destructuring props
	const { info } = props;
	// Render component
	return (
		<div className="card">
			<div className="card-title img-holder">
				<h2>{info.name}</h2>
				<img src={require("../../imgs/tours/" + info.imageCover)} alt="" />
			</div>
			<div className="card-body">
				<div className="card-body-stats">
					<div className="card-body-stats-icon">
						<img src={img2} alt="" />
						<span>{info.startLocation.description}</span>
					</div>
					<div className="card-body-stats-icon">
						<img src={img4} alt="" />
						<span>{new Date(info.startDates[0]).toDateString() + ", "}</span>
					</div>
					<div className="card-body-stats-icon">
						<img src={img3} alt="" />
						<span>{info.locations.length}</span>
					</div>
					<div className="card-body-stats-icon">
						<img src={img5} alt="" />
						<span>{info.maxGroupSize}</span>
					</div>
				</div>
				<h3>Tour Summary</h3>
				<p>{info.summary}</p>
			</div>
			<div className="card-footer">
				<div className="card-footer-rating">
					<span>${info.price} per person</span>
					<span>
						{info.ratingsAverage} rating({info.ratingsQuantity})
					</span>
				</div>
				<Button msg={"Details"} link={"/tours/" + info.slug} tour={info} />
			</div>
		</div>
	);
}

export default TourCard;
