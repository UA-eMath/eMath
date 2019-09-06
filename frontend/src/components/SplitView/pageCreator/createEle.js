import React from 'react'
import styles from "../styles/style";
import Scrollbars from 'react-custom-scrollbars';

import TitleBar from '../../TitleBar';
import {connect} from "react-redux";
import {closeWindow, minimizeWindow, onLayoutChange, openNewWindow} from "../../../actions";
import getPage from "../../../requests/getPage";
import contentProcessor from "./pageRenderer";


const mapStateToProps = state => {
	return {items: state.windows.items}
};

const mapDispatchToProps = dispatch => ({
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
	onCloseWindow: (id) =>
		dispatch(closeWindow(id)),
	minimizeWindow: (id,title,pageId) =>
		dispatch(minimizeWindow(id,title,pageId)),
	onLayoutChange: () =>
		dispatch(onLayoutChange),
});

class CreateElement extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			paraText: [],
			pageTitle: null,
			para_parent: null,
		};
	}

	async componentDidMount() {
		//this.props['data-grid'] stores this window's information
		let pageId = this.props['data-grid'].pageId;
		this._isMounted = true;

		if (this._isMounted) {
			const pageContent = await getPage({id: pageId, page: null});

			if (pageContent.data.length !== 0) {
				this.setState({
					pageTitle: pageContent.data[0].para_parent.title,
					para_parent: pageContent.data[0].para_parent,
					paraText: pageContent.data,

				});
			} else {
				this.setState({
					pageTitle: [],
					para_parent: null,
					paraText: null,

				});
			}
		}

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let i = this.props['data-grid'].i;
		const {minimizeWindow, onWindowOpen, onCloseWindow, onLayoutChange, ...rest} = this.props;
		return (
			<div {...rest}
			     className={`wrapper ${this.props.className}`}
			     style={{...styles.window, ...this.props.style}}
			>
				<Scrollbars>
					{this.props.children}

					<TitleBar
						className='windowHeader'
						title={this.state.pageTitle}
						controls
						background={this.props.color}
						onCloseClick={() => {
							this.props.onCloseWindow(i)
						}}
						onMinimizeClick={() => {
							this.props.minimizeWindow(i,this.state.pageTitle,this.props['data-grid'].pageId)
						}}
					/>
					{/*content will not show if put scrollbars inside a div*/}
					{contentProcessor(this.state.paraText, this.props)}

				</Scrollbars>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateElement)