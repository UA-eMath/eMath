import React, {Component} from 'react'
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Scrollbars} from 'react-custom-scrollbars';
import PageBar from '../PageBar'
import {TitleBar} from 'react-desktop/windows';

import { Row, Col } from 'antd';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class SplitView extends React.Component {
	static defaultProps = {
		className: "layout",
		cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
		rowHeight: 100,
		compactType: 'horizontal',

		color: '#cc7f29',
		theme: 'light',
	};

	constructor(props) {
		super(props);

		this.state = {
			items: [0].map(function (i, key, list) {
				return {
					i: i.toString(),
					x: list.length * 6,
					y: 0,
					w: 6,
					h: 7,
					add: i === (list.length - 1).toString()
				};
			}),
			newCounter: 0,

			isMaximized: true,

		};

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

	initElement(el) {
		return (


			<div key={el.i} data-grid={el}
			     style={{background: 'LightBlue',flexDirection:'column'}}>
						<TitleBar
							title="My Windows Application"
							controls={false}
							isMaximized={this.state.isMaximized}
							theme='dark'
							background={this.props.color}
							style={{position: 'fixed', top: 0}}
						/>

						<Scrollbars  style={{position: 'relative'}} >

						<p style={{marginTop: '5%'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
							et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
							Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
							gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
						</Scrollbars>

						{<PageBar style={{ position: 'fixed',bottom: 0}} />}
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
					title="My Windows Application"
					controls
					isMaximized={this.state.isMaximized}
					theme={this.props.theme}
					background={this.props.color}
					onCloseClick={() => this.setState({items: _.reject(this.state.items, {i: el.i})})}
					onMinimizeClick={this.minimize}
					onMaximizeClick={this.toggleMaximize}
					onRestoreDownClick={this.toggleMaximize}
				/>

				<Scrollbars style={{height: '90%'}}>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
						et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
						diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
						gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
				</Scrollbars>
			</div>
		)
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