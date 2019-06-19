import React from 'react';
import 'antd/dist/antd.css';

import MenuDrawer from './MenuDrawer'
import SubordinateDrawer from './SubordinateDrawer'

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',
		marginLeft: '25px'
	},
	Div:{
		width: '100px',
		height: '25px',
		marginRight: '10px'
	}
};

export default class Controls extends React.Component {

	render() {
		return (
			<div style={styles.Div}>

			<SubordinateDrawer/>
			<MenuDrawer/>

			</div>
		);
	}

}