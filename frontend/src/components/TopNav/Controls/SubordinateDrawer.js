import React from 'react'
import {Icon, Drawer} from 'antd';

import {closeSubs} from "../../../actions";
import {connect} from 'react-redux';

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',

	},
	DivPos: {
		float: 'left'
	}

};

const mapStateToProps = state => {
	return {items: state.subordinates.items}
};


const mapDispatchToProps = dispatch => ({
	// onWindowOpen: () =>
	// 	dispatch(openNewWindow),

	onSubClose:(id)=>
		dispatch(closeSubs(id))
});



class SubordinateDrawer extends React.Component {
	state = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SubordinateDrawer)