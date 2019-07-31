import React from 'react'
import styles from "../styles/style";
import {Scrollbars} from 'react-custom-scrollbars';
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

	async componentDidMount() {
		//this.props['data-grid'] stores this window's information
		let pageId = this.props['data-grid'].pageId;

		const pageContent = await getPage({id: pageId, page: null});

		this.setState({
			pageTitle: pageContent.data[0].para_parent.title,
			para_parent: pageContent.data[0].para_parent,
			paraText: pageContent.data,

		});
	}

	render() {

		let i = this.props['data-grid'].i;
		return (

			<div {...this.props}
			     className={`wrapper ${this.props.className}`}
			     style={{...styles.window, ...this.props.style}}
			>
				{console.log(this.props)}
				<div>
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
							this.props.minimizeWindow(i)
						}}
					/>

					<Scrollbars>
						{contentProcessor(this.state.paraText, this.props)}

					</Scrollbars>

				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateElement)