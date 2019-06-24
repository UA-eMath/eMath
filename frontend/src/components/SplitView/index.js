import React, {Component} from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Scrollbars} from 'react-custom-scrollbars';
import TitleBar from '../TitleBar';
import {Button} from 'react-desktop/windows';

import styles from './styles/style'

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class SplitView extends React.Component {
	static defaultProps = {
		className: "layout",
		cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
		rowHeight: 100,
		compactType: 'horizontal',
		draggableHandle: '.windowHeader',

		color: '#42b0f4',
	};

	constructor(props) {
		super(props);

		this.state = {
			items: [0].map(function (i, key, list) {
				return {
					i: i.toString(),
					x: 0,
					y: 0,
					w: 6,
					h: 9.5,
					add: i === (list.length - 1).toString(),
					static: true,
				};
			}),
			newCounter: 0,
			isMaximized: true,
		};

		this.onRemoveItem = this.onRemoveItem.bind(this);
		this.minimize = this.minimize.bind(this);
		this.onAddItem = this.onAddItem.bind(this);
		this.onBreakpointChange = this.onBreakpointChange.bind(this);
		this.onPin = this.onPin.bind(this)
	}


	render() {
		//TODO

		return (
			<div>
				<button onClick={this.onAddItem}>some link</button>
				<ResponsiveReactGridLayout
					onLayoutChange={() => this.onLayoutChange}
					onBreakpointChange={() => this.onBreakpointChange}

					{...this.props}
				>

					{_.map(this.state.items, el => {
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
					{styles.para}
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
						this.onRemoveItem(i)
					}}
					onMinimizeClick={() => {
						this.minimize(i)
					}}
					onPinClick={() => {
						this.onPin(i)
					}}
				/>

				<Scrollbars>
					{styles.para}
				</Scrollbars>
			</div>
		)
	}

	onPin(id) {

		let newItems = this.state.items;

		newItems = newItems.map(el => (el.i === id) ? { ...el, static:!el.static }: el)

		this.setState({
			items: newItems
		});

		console.log(this.state.items[1].static);
	}

	minimize(id) {

		// let key = id;
		// //newState = newState.items.map(el => (el.i === key) ? { ...el, h:2,w:2 }: el);
		// //const layout = JSON.parse(JSON.stringify(newState));
		//
		// let newItems = this.state.items;
		// newItems = newItems.map(el => (el.i === key) ? {...el, h: 2, w: 2} : el);
		//
		//
		// this.setState({
		// 	items: newItems,
		// 	newCounter: this.state.newCounter + 1
		// });
		//
		//
		// console.log(this.state.items);
		this.setState({items: _.reject(this.state.items, {i: id})});


	}

	onAddItem() {
		/*eslint no-console: 0*/
		this.setState({
			// Add a new item. It must have a unique key!
			items: this.state.items.concat({
				i: "n" + this.state.newCounter,
				x: 6,
				y: 0, // puts it at the bottom
				w: 6,
				h: 4,
				static: false,
			}),
			// Increment the counter to ensure key is always unique.
			newCounter: this.state.newCounter + 1
		});
	}

	// We're using the cols coming back from this to calculate where to add new items.
	onBreakpointChange(breakpoint, cols) {
		this.setState({
			breakpoint: breakpoint,
			cols: cols
		});
	}

	onLayoutChange(layout) {
		this.props.onLayoutChange(layout);
		this.setState({layout: layout});
	}

	onRemoveItem(i) {
		this.setState({items: _.reject(this.state.items, {i: i})});
	}


}