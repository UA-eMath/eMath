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

import CreateElement from './pageCreator/createEle'
import getPage from "../../requests/getPage";
import initElement from "./pageCreator/initEle"

import MathJaxConfig from '../../constants/MathJax_config'
// import MathJax from 'react-mathjax'
import MathJax from '../mathDisplay'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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


class SplitView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			paraText: [],
			pageTitle: null,
			para_parent: null,
		};

		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.initElement = initElement.bind(this);
	}

	async componentDidMount() {
		let id = 4;
		let page = null;

		const pageContent = await getPage({id: id, page: page});
		if (pageContent.data.length > 0) {
			this.setState({
				pageTitle: pageContent.data[0].para_parent.title,
				para_parent: pageContent.data[0].para_parent,
				paraText: pageContent.data,

			});
		}

	}


	render() {
		return (
			<MathJax.Provider
				{...MathJaxConfig}
				onError={(MathJax, error) => {
					console.warn(error);
					console.log("Encountered a MathJax error, re-attempting a typeset!");
					MathJax.Hub.Queue(
						MathJax.Hub.Typeset()
					);
				}}
			>

				<ResponsiveReactGridLayout
					className="layout"
					cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
					rowHeight={100}
					compactType='horizontal'
					draggableHandle='.windowHeader'
					color='#42b0f4'

					onLayoutChange={this.props.onLayoutChange}
					onBreakpointChange={() => this.onBreakpointChange}
					key={_.uniqueId()}
				>

					{_.map(this.props.items, el => {
						if (el.i === '0') {
							return (this.initElement(el))
						}
						else {
							const i = el.add ? "+" : el.i;

							return (<CreateElement key={i} data-grid={el}/>)
						}
					})}

				</ResponsiveReactGridLayout>
			</MathJax.Provider>
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