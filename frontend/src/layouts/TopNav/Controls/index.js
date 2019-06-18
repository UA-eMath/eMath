import {Drawer, Button,Icon} from 'antd';
import React from 'react'

export default class Controls extends React.Component {
	state = {visible: false};

	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<div>

				<Icon type='menu' onClick={this.showDrawer} style={{fontSize:'25px',height:'20px',width:'20px',color:'lightGrey'}}/>

				<Drawer
					title="Basic Drawer"
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Drawer>
			</div>
		);
	}

}