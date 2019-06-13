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



export default class SplitView extends React.Component {
	static defaultProps = {


		color: '#cc7f29',
		theme: 'light',
	}

	constructor(props){
		super(props);
		this.state = {

			isMaximized: true,
		}

	}

	render(){

	}


}