import React, { useContext } from 'react';
import './user-list-component-styles.scss';
import img1 from '../../imgs/edit.png';
import img2 from '../../imgs/delete.png';
import img3 from '../../imgs/deactivate.png';
import { MyContext } from '../../utils/functions/context';
function List(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor, userBorder } = state;
	// Render component
	return (
		<div
			className="list"
			style={{ display: props.display, scrollbarColor: `${userBorder} black` }}
		>
			<div className="list-group">
				<span
					style={
						font === 'bookmania'
							? {
									color: textColor,
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									color: textColor,
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { color: textColor, fontFamily: font }
					}
				>
					{props.title} #1
				</span>
				<div className="list-group-icons">
					<img src={img1} alt="" />
					<img src={props.title === 'User' ? img3 : img2} alt="" />
				</div>
			</div>
			<div className="list-group">
				<span
					style={
						font === 'bookmania'
							? {
									color: textColor,
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									color: textColor,
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { color: textColor, fontFamily: font }
					}
				>
					{props.title} #2
				</span>
				<div className="list-group-icons">
					<img src={img1} alt="" />
					<img src={props.title === 'User' ? img3 : img2} alt="" />
				</div>
			</div>
			<div className="list-group">
				<span
					style={
						font === 'bookmania'
							? {
									color: textColor,
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									color: textColor,
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { color: textColor, fontFamily: font }
					}
				>
					{props.title} #3
				</span>
				<div className="list-group-icons">
					<img src={img1} alt="" />
					<img src={props.title === 'User' ? img3 : img2} alt="" />
				</div>
			</div>
			<div className="list-group">
				<span
					style={
						font === 'bookmania'
							? {
									color: textColor,
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									color: textColor,
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { color: textColor, fontFamily: font }
					}
				>
					{props.title} #4
				</span>
				<div className="list-group-icons">
					<img src={img1} alt="" />
					<img src={props.title === 'User' ? img3 : img2} alt="" />
				</div>
			</div>
		</div>
	);
}

export default List;
