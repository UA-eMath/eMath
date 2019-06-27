import React from 'react'
import {Icon, Drawer, Button} from 'antd';

import {
	closeSubs,
	openNewWindow,
	listAllSubs
} from "../../../actions";

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
const ButtonGroup = Button.Group;

const mapStateToProps = state => {
	return {subs: state.subordinates.subs}
};


const mapDispatchToProps = dispatch => ({
	onWindowOpen: () =>
		dispatch(openNewWindow),

	onSubClose: (id) =>
		dispatch(closeSubs(id)),

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

					{
						this.props.subs.map((el) => {
								return (
									<ButtonGroup key={el.i}>
										<Button type={'dashed'} onClick={this.props.onWindowOpen}>
											{el.title}
										</Button>

										<Button type={'danger'} onClick={() => {
											this.props.onSubClose(el.i)
										}}/>
									</ButtonGroup>
								)
							}
						)
					}

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