import React, {Component} from 'react'
import 'antd/dist/antd.css';
import 'react-resizable/css/styles.css'
import { Resizable } from "re-resizable";
import {Navbar, Nav} from 'react-bootstrap'
import {ButtonToolbar,Button} from 'react-bootstrap';


import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


import 'react-grid-layout/css/styles.css'
import _ from "lodash";
import {Scrollbars} from 'react-custom-scrollbars';
import {TitleBar} from 'react-desktop/windows';

import { Row, Col } from 'antd';



export default class SplitView extends React.Component {
	static defaultProps = {
		color: '#cc7f29',
		theme: 'light',
	};

	constructor(props){
		super(props);
		this.state = {
				items: [0].map(function (i) {
					return {
						i: i.toString(),
						w: '50%',
						h: 0,
						text:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n" +
						"invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam\n" +
						"et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est\n" +
						"Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed\n" +
						"diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam\n" +
						"voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
						"gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
					};
				}),

			isMaximized: true,
		};

		this.initElement = this.initElement.bind(this);
		this.createElement = this.createElement.bind(this);
		this.onAddItem = this.onAddItem.bind(this);

	}


	render(){
		return(
			<div>
				<button onClick={this.onAddItem}>some link</button>

				<div>
					{this.state.items.map((item,i)=>{
						if (i === 0){
							return(this.initElement(item))
						}else{
							return(this.createElement(item))
						}
					})}
				</div>

            </div>
		)
	}

	/*
		methods
	*/
	initElement(item){
		console.log(item.h);

		return(
			<div style={{background: 'LightBlue',width:item.w, bottom: item.h,}}>
				<div style={{position:'relative',overflow:'auto'}}>
					<TitleBar
							title="My Windows Application"
							controls={false}
							isMaximized={this.state.isMaximized}
							theme='dark'
							background={this.props.color}
					/>

					<Scrollbars style={{ width: "100%", height: "85vh" }}>
						<p>{item.text}</p>
					</Scrollbars>

					<Navbar bg="dark" variant="dark">
							<Button variant="dark" >Pre</Button>
							<Button variant="dark" className="ml-auto">Next</Button>
					</Navbar>
				</div>
			</div>
		)
	}

	createElement(item){
		return(
			<div>
				
			</div>
		)
	}



	onAddItem() {
		this.setState({
			// Add a new item. It must have a unique key!
			items: this.state.items.concat({
				i: "n" + this.state.items.length,
				w: 5.5,
				h: 4
			}),
		});


	}


}