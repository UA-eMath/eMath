import React, {Component} from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Scrollbars} from 'react-custom-scrollbars';
import {TitleBar} from 'react-desktop/windows';
import {Navbar, Nav} from 'react-bootstrap'
import { Button } from 'react-desktop/windows';

import { Row, Col } from 'antd';

import styles from './styles/style'

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class SplitView extends React.Component {
	static defaultProps = {
		className: "layout",
		cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
		rowHeight: 100,
		compactType: 'vertical',
		verticalCompact: 'false',

		color: '#42b0f4',
		theme: 'light',
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
					h: 7,
					add: i === (list.length - 1).toString(),
					static: true,
				};
			}),
			newCounter: 0,

			isMaximized: true,

			open:true,

		};
		this.togglePanel = this.togglePanel.bind(this);
		this.onRemoveItem= this.onRemoveItem.bind(this);
		this.minimize = this.minimize.bind(this);
		this.onAddItem = this.onAddItem.bind(this);
		this.onBreakpointChange = this.onBreakpointChange.bind(this);

	}
	render() {

		return (
			<div>
				<button onClick={this.onAddItem}>some link</button>
				<ResponsiveReactGridLayout
					onLayoutChange={() => this.onLayoutChange}
					onBreakpointChange={() => this.onBreakpointChange}
					{...this.props}
				>


					{_.map(this.state.items, el => {

						if (el.i !== '0') {
							return (this.createElement(el))
						} else {
							return (this.initElement(el))
						}
					})}

				</ResponsiveReactGridLayout>
			</div>
		);
	}

	togglePanel(e){
        this.setState({open: !this.state.open})
	}

	initElement(el) {
		return (
			<div key={el.i} data-grid={el}
			     style={{...styles.initWindow}}>
						<div style={{...styles.titleBar}}>

							<Button>Pre</Button>
							<span style={{...styles.title}}>
								Chapter one - Higher Dimensions and the Vector Space ℝn
							</span>
							<Button className = 'ml-auto'>Next</Button>

						</div>

						<Scrollbars  style={{position: 'absolute'}} >
							{styles.para}
						</Scrollbars>

			</div>
		)
	}

	createElement(el) {
		const removeStyle = {
			position: "absolute",
			right: "2px",
			top: 0,
			cursor: "pointer"
		};

		const i = el.add ? "+" : el.i;

		return (
			<div key={i} data-grid={el}
			     style={{background: 'LightBlue'}}>
				<TitleBar
					title={el.i}
					controls
					isMaximized={this.state.isMaximized}
					theme={this.props.theme}
					background={this.props.color}
					onCloseClick={()=>{this.onRemoveItem(i)}}
					onMinimizeClick={()=>{this.minimize(i)}}
					onMaximizeClick={this.toggleMaximize}
					onRestoreDownClick={this.toggleMaximize}
					style={{position: 'fixed', top: 0, zIndex:'1'}}
				/>

				<Scrollbars style={{position: 'relative',zIndex:'0'}}>
					<div style={{marginTop:'4%'}}></div>
						{styles.para}
				</Scrollbars>
			</div>
		)
	}

	minimize(id){
		console.log(this.state.items);

		let key = id;
		let newState = this.state;
		//newState = newState.items.map(el => (el.i === key) ? { ...el, h:2,w:2 }: el);
		//const layout = JSON.parse(JSON.stringify(newState));

		this.setState({
			items: this.state.items.map(el => (el.i === key) ? { ...el, h:2,w:2 }: el)
		});

	}

	onAddItem() {
		/*eslint no-console: 0*/
		this.setState({
			// Add a new item. It must have a unique key!
			items: this.state.items.concat({
				i: "n" + this.state.newCounter,
				x: 6,
				y: 0, // puts it at the bottom
				w: 5.5,
				h: 4
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