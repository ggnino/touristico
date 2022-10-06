import React, { useContext } from 'react';
import './user-bookings-styles.scss';
import img1 from '../../imgs/rewarded.png';
import img2 from '../../imgs/price.png';
import img3 from '../../imgs/tour.png';
import img4 from '../../imgs/date.png';
import { MyContext } from '../../utils/functions/context';

function UserBookings(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor } = state;
	// Render component
	return (
		<>
			<div className="user-bookings" style={{ display: props.display }}>
				<div className="user-bookings-group">
					<span
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						<img src={img3} alt="" />
						Tour
					</span>
					<p
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Lorem ipsum dolor sit amet.
					</p>
				</div>
				<div className="user-bookings-group">
					<span
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						<img src={img2} alt="" />
						Price
					</span>
					<p
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						$2005.50
					</p>
				</div>
				<div className="user-bookings-group">
					<span
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						<img src={img4} alt="" />
						Date
					</span>
					<p
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						01/01/2021
					</p>
				</div>
				<div className="user-bookings-group">
					<span
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						<img src={img1} alt="" />
						Rewarded
					</span>
					<p
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique',
										color: textColor,
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										fontSize: '3rem',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Yes
					</p>
				</div>
			</div>
		</>
	);
}

export default UserBookings;
