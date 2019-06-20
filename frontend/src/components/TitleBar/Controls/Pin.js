import React, {Component} from 'react';
import Radium from 'radium';
import {Icon} from 'antd'

let styles = {
	button: {
		WebkitUserSelect: 'none',
		userSelect: 'none',
		WebkitAppRegion: 'no-drag',
		appRegion: 'no-drag',
		cursor: 'default',
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
	icon: {
		width: '10px',
		height: '10px',
		fontcolor:'#000000',
	}

};

class Pin extends Component {
	render(){
		const {style, ...props} = this.props;


		let componentStyle = {...styles.button, ...style};


		return (
			<a
				title="Pin"
				style={componentStyle}
				{...props}
			>

				<Icon type="pushpin" style = {styles.icon}/>
			</a>
		);
	}
}

Pin = Radium(Pin);

export default Pin