import React from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";

import {connect} from 'react-redux';
import {
	openNewWindow,
	minimizeWindow,
	closeWindow,
	onLayoutChange,
} from '../../actions'

import createElement from './pageCreator/createEle'
import getPage from "../../requests/getPage";
import initElement from "./pageCreator/initEle"


const ResponsiveReactGridLayout = WidthProvider(Responsive);

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


class SplitView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			paraText: [],
			pageTitle: null,
			para_parent:null,
		};

		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.initElement = initElement.bind(this);
		this.createElement = createElement.bind(this);
	}

	async componentDidMount() {
		let id = 4;
		let page = null;

		const pageContent = await getPage({id: id, page: page});
		this.setState({
			pageTitle: pageContent.data[0].para_parent.title,
			para_parent:pageContent.data[0].para_parent,
			paraText: pageContent.data,

		});

	}

	render() {
		return (
			<div>
				<button onClick={this.props.onWindowOpen}>some link</button>
				<ResponsiveReactGridLayout
					className="layout"
					cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
					rowHeight={100}
					compactType='horizontal'
					draggableHandle='.windowHeader'
					color='#42b0f4'

					onLayoutChange={this.props.onLayoutChange}
					onBreakpointChange={() => this.onBreakpointChange}
				>

					{_.map(this.props.items, el => {
						if (el.i === '0') {
							return (this.initElement(el))
						}
						else {
							return (this.createElement(el))
						}
					})}

				</ResponsiveReactGridLayout>
			</div>
		);
	}

// We're using the cols coming back from this to calculate where to add new items.
	onBreakpointChange(breakpoint, cols) {
		this.setState({
			breakpoint: breakpoint,
			cols: cols
		});
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitView)