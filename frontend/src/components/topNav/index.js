import React from 'react'
import {Navbar} from 'react-bootstrap'
import "./index.css";
import 'antd/dist/antd.css';
import Control from './Controls'

export default class TopNav extends React.Component {
	render() {
		if(this.props.match){
			return( <Control props = {this.props.match}/>)
		}else {
			return (
				<Navbar bg="green" variant="dark" >
					<Navbar.Brand href="/">eMath</Navbar.Brand>
				</Navbar>
			)
		}
	}
}