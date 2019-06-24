import React from 'react'
import {Icon, Drawer} from 'antd';

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',

	},
	DivPos: {
		float: 'left'
	}

};

export default class SubordinateDrawer extends React.Component {
	state = {
		Subordinates: '',


		visible: false
	};

	render() {
		return (
			<div style={styles.DivPos}>
				<Icon type="container" onClick={this.showSubordinateDrawer} style={styles.Icon} theme="filled"/>

				<Drawer
					title="Minimized Widgets"
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={200}
					style={{fontSize: '25px'}}
				>


				</Drawer>
			</div>

		);
	}

	showSubordinateDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

}