import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
import TitleBar from '../../TitleBar';
import {connect} from "react-redux";
import {closeWindow, minimizeWindow, onLayoutChange, openNewWindow} from "../../../actions";


const mapStateToProps = state => {
	return {items: state.windows.items}
};

const mapDispatchToProps = dispatch => ({
	onWindowOpen: () =>
		dispatch(openNewWindow),
	onCloseWindow: (id) =>
		dispatch(closeWindow(id)),
	minimizeWindow: (id) =>
		dispatch(minimizeWindow(id)),
	onLayoutChange: () =>
		dispatch(onLayoutChange),
});

class CreateElement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paraText: [],
			pageTitle: null,
			para_parent: null,
		}

	}

	render() {
		console.log(this.props);
		let i = this.props['data-grid'].i;
		return (

			<div {...this.props}
			     className={`wrapper ${this.props.className}`}
			     style={{...styles.window, ...this.props.style}}
			>
				<div>
					{this.props.children}
					<TitleBar
						className='windowHeader'
						title={'ss'}
						controls
						background={this.props.color}
						onCloseClick={() => {
							this.props.onCloseWindow(i)
						}}
						onMinimizeClick={() => {
							this.props.minimizeWindow(i)
						}}
					/>

					<Scrollbars>
						{console.log(this.state)}
					</Scrollbars>
				</div>
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateElement)