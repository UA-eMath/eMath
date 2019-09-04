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

const mapStateToProps = state => {
	return {subs: state.subordinates.subs}
};


const mapDispatchToProps = dispatch => ({
	openSubWindow: (id) =>
		dispatch(openSubWindow(id)),

	closeSubs: (id) =>
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
					title="Minimized Windows"
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={300}
					style={{fontSize: '25px'}}
				>

					{
						this.props.subs.map((el) => {
								console.log(this.props);

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
												this.props.openSubWindow(el.i)
											}}
										>
											{el.i}
										</Button>

										<Button type={'danger'}
										        className={'mr-auto'}
										        size={'large'}
										        style={{display: 'inline-block'}}
										        onClick={() => {
											        this.props.closeSubs(el.i)
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