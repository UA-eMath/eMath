import React from 'react'
import {Icon} from 'antd';


const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',

	},
	DivPos:{
		float: 'left'
	}
};

export default class SubordinateDrawer extends React.Component{

	render(){
		return(
			<div style={styles.DivPos}>
					<Icon type="container" onClick={this.showSubordinateDrawer} style={styles.Icon} theme="filled"/>
			</div>
		)
	}


}