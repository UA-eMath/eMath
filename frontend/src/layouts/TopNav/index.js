import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import "./index.css";
import 'antd/dist/antd.css';
import Control from './Controls'

export default class TopNav extends React.Component {

	render() {

		if (RegExp('^/$').test(window.location.pathname)) {
			return (
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">eMath</Navbar.Brand>
				</Navbar>
			)

		} else {
			return( <Control/>)
		}

	}
}