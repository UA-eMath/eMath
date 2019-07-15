import React from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Scrollbars} from 'react-custom-scrollbars';
import TitleBar from '../TitleBar';
import {Button} from 'react-desktop/windows';
import {connect} from 'react-redux';
import {
	openNewWindow,
	minimizeWindow,
	closeWindow,
	onLayoutChange,
} from '../../actions'
import styles from './styles/style'
import fetchTocTree from "../TopNav/Controls/treeData";

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
		this.onBreakpointChange = this.onBreakpointChange.bind(this);
	}

	componentDidMount() {
		// console.log(this.props);
		// let id = this.props.params.id;
		// let page = this.props.params.page;
		fetchTocTree(id, page, (data) => {
			this.setState(
				{
					paraText: data
				}
			);
		});
	}

	render() {
		//TODO

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

	initElement(el) {

		return (
			<div key={el.i} data-grid={el}
			     style={{...styles.window}}>
				<div style={{...styles.titleBar}}>

					<Button>Pre</Button>
					<span style={{...styles.title}}>
								Chapter one - Higher Dimensions and the Vector Space ℝn
							</span>
					<Button className='ml-auto'>Next</Button>

				</div>

				<Scrollbars>
					{this.state.paraText}
				</Scrollbars>
			</div>
		)
	}

	createElement(el) {
		const i = el.add ? "+" : el.i;
		console.log(el.h);

		return (
			<div key={i} data-grid={el}
			     style={{...styles.window}}>
				<TitleBar
					className='windowHeader'
					title={el.i}
					controls
					background={this.props.color}
					onCloseClick={() => {
						this.props.onCloseWindow(el.i)
					}}
					onMinimizeClick={() => {
						this.props.minimizeWindow(el.i)
					}}
				/>

				<Scrollbars>
					{styles.para}
				</Scrollbars>
			</div>
		)
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