import React, { useContext, useEffect, useRef } from 'react';
import Button from '../button-component/button-component';
import './user-rewards-styles.scss';
import img1 from '../../imgs/points.png';
import img2 from '../../imgs/user-points.png';
import { MyContext } from '../../utils/functions/context';

function UserRewards(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor } = state;
	// reference variable for switch bg color
	const light = useRef('');
	// useEffect hook for styling
	useEffect(() => {
		// textColor is black
		if (textColor === 'black') {
			// set bg color
			light.current = 'white';
		} else light.current = 'black'; // set bg color
	}, [textColor]);
	// Render component
	return (
		<>
			<div className="userRewards-points" style={{ display: props.display }}>
				<h2
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
									color: textColor,
									backgroundColor: light.current,
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
									color: textColor,
									backgroundColor: light.current,
							  }
							: {
									fontFamily: font,
									color: textColor,
									backgroundColor: light.current,
							  }
					}
				>
					My Points
				</h2>
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
									color: textColor,
							  }
							: { fontFamily: font, color: textColor }
					}
				>
					250
				</span>
				<img src={img2} alt="" />
			</div>
			<h3
				style={
					font === 'bookmania'
						? {
								fontFamily: 'pill-gothic-900mg',
								fontStyle: 'oblique',
								display: props.display,
								color: textColor,
						  }
						: font === 'aviano-future'
						? {
								fontFamily: 'ff-good-headline-web-pro-com',
								fontStyle: 'italic',
								display: props.display,
								color: textColor,
						  }
						: { fontFamily: font, display: props.display, color: textColor }
				}
			>
				Points expire in: 5/1/2023
			</h3>
			<div
				style={
					font === 'bookmania'
						? {
								fontFamily: 'pill-gothic-900mg',
								fontStyle: 'oblique',
								display: props.display,
								color: textColor,
						  }
						: font === 'aviano-future'
						? {
								fontFamily: 'ff-good-headline-web-pro-com',
								fontStyle: 'italic',
								display: props.display,
								color: textColor,
						  }
						: { fontFamily: font, display: props.display, color: textColor }
				}
				className="userRewards-rewards"
			>
				<div className="userRewards-rewards-group">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Reward #1
					</span>
					<Button
						link={'#notRedeemable-demoOnly'}
						class={'book'}
						msg={'Redeem'}
					/>
				</div>
				<div className="userRewards-rewards-group">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Reward #2
					</span>
					<Button
						link={'#notRedeemable-demoOnly'}
						class={'book'}
						msg={'Redeem'}
					/>
				</div>
				<div className="userRewards-rewards-group">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Reward #3
					</span>
					<Button
						link={'#notRedeemable-demoOnly'}
						class={'book'}
						msg={'Redeem'}
					/>
				</div>
			</div>
			<h2
				style={
					font === 'bookmania'
						? {
								fontFamily: 'pill-gothic-900mg',
								fontStyle: 'oblique',
								display: props.display,
								color: textColor,
						  }
						: font === 'aviano-future'
						? {
								fontFamily: 'ff-good-headline-web-pro-com',
								fontStyle: 'italic',
								display: props.display,
								color: textColor,
						  }
						: { fontFamily: font, display: props.display, color: textColor }
				}
			>
				Points History
			</h2>
			<div
				style={
					font === 'bookmania'
						? {
								fontFamily: 'pill-gothic-900mg',
								fontStyle: 'oblique',
								display: props.display,
								color: textColor,
						  }
						: font === 'aviano-future'
						? {
								fontFamily: 'ff-good-headline-web-pro-com',
								fontStyle: 'italic',
								display: props.display,
								color: textColor,
						  }
						: { fontFamily: font, display: props.display, color: textColor }
				}
				className="userRewards-pointsHistory"
			>
				<div className="userRewards-pointsHistory-headingGroup">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Date:
					</span>
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Earned By:
					</span>
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Points:
					</span>
				</div>

				<div className="userRewards-pointsHistory-group">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						1/20/2021
					</span>
					<span
						id="tb"
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Tour Booking
					</span>
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
						id="points"
					>
						50+
						<img src={img1} alt="" />
					</span>
				</div>
				<div className="userRewards-pointsHistory-group">
					<span
						style={
							font === 'bookmania'
								? {
										fontFamily: 'pill-gothic-900mg',
										fontStyle: 'oblique,color:textColor',
								  }
								: font === 'aviano-future'
								? {
										fontFamily: 'ff-good-headline-web-pro-com',
										fontStyle: 'italic',
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						9/7/2020
					</span>
					<span
						id="tb"
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Tour Booking
					</span>
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
						id="points"
					>
						50+
						<img src={img1} alt="" />
					</span>
				</div>
				<div className="userRewards-pointsHistory-group">
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						3/5/2020
					</span>
					<span
						id="tb"
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
					>
						Tour Booking
					</span>
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
										color: textColor,
								  }
								: { fontFamily: font, color: textColor }
						}
						id="points"
					>
						50+
						<img src={img1} alt="" />
					</span>
				</div>
			</div>
		</>
	);
}

export default UserRewards;
