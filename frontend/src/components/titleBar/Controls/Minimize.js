import React, {Component} from 'react';
import Radium from 'radium';


let styles = {
	button: {
		WebkitUserSelect: 'none',
		userSelect: 'none',
		WebkitAppRegion: 'no-drag',
		appRegion: 'no-drag',
		cursor: 'pointer',
		width: '46px',
		height: '100%',
		lineHeight: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		':hover': {
			transition: 'background-color 0.1s',
			backgroundColor: '#e5e5e5'
		},

		':active': {
			backgroundColor: '#cccccc'
		}
	},

	buttonColorBackground: {
		':hover': {
			transition: 'background-color 0.1s',
			backgroundColor: 'rgba(255, 255, 255, .13)'
		},

		':active': {
			backgroundColor: 'rgba(255, 255, 255, .23)'
		}
	},

	icon: {
		width: '10px',
		height: '10px'
	}
};


class Minimize extends Component {

	render() {
		const {style, ...props} = this.props;

		let svgFill = '#000000';

		let componentStyle = {...styles.button,...styles.buttonColorBackground,...style};


		return (
			<a
				title="Minimize"
				style={componentStyle}
				{...props}
			>

				<svg x="0px" y="0px" viewBox="0 0 10.2 1" style={styles.icon}>
					<rect fill={svgFill} width="10.2" height="1"/>
				</svg>
			</a>
		);
	}

}
Minimize = Radium(Minimize);

export default Minimize;
