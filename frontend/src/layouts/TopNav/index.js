import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import "./index.css";
import {Menu, Dropdown, Icon} from 'antd';
import 'antd/dist/antd.css';
import Control from './Controls'

export default class TopNav extends React.Component {

	render() {

		let compo;
		if (RegExp('^/$').test(window.location.pathname)) {
			compo = <Nav/>;
		} else {
			compo = <Nav className="ml-auto">
				<Control/>
			</Nav>
		}

		return (
			<Navbar bg="dark" variant="dark">
				<div> {this.props.location} </div>
				<Navbar.Brand href="/">eMath</Navbar.Brand>
				{compo}

			</Navbar>
		);
	}
}