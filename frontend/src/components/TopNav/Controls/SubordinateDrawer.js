import React from 'react'
import {Icon, Drawer, Button} from 'antd';

import {
	closeSubs,
	openSubWindow,
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
	onOpenSubWindow: (id) =>
		dispatch(openSubWindow(id)),

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
					width={300}
					style={{fontSize: '25px'}}
				>

					{
						this.props.subs.map((el) => {
								return (


									<div
										key={el.i}
										style={{marginBottom: '5px'}}
									>
										<Button
											size={'large'}
											style={{
												display: 'inline-block',
												width: '200px',
												overflow: 'hidden'
											}}
											onClick={() => {
												this.props.onOpenSubWindow(el.i)
											}}
										>
											{el.i}
										</Button>

										<Button type={'danger'}
										        className={'mr-auto'}
										        size={'large'}
										        style={{display: 'inline-block'}}
										        onClick={() => {
											        this.props.onSubClose(el.i)
										        }}
										>
											X
										</Button>
									</div>
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