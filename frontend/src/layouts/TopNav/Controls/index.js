import React from 'react';
import 'antd/dist/antd.css';
import {Navbar,Nav} from 'react-bootstrap'

import MenuDrawer from './MenuDrawer'
import SubordinateDrawer from './SubordinateDrawer'

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',
		marginLeft: '25px'
	},
	Div:{
		width: '100%',
		height: '25px',
		marginRight: '10px'
	}
};

export default class Controls extends React.Component {

	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<SubordinateDrawer className= 'mr-auto'/>
				<Nav style={{width: '100%',height: '30px'}}>
					<div style={{margin: 'auto'}}>
						<Navbar.Brand href="/">eMath : </Navbar.Brand>
						<Navbar.Brand >Linear Algebra A Modern Introduction</Navbar.Brand>
					</div>

				</Nav>
				<MenuDrawer className= 'ml-auto'/>
			</Navbar>
		);
	}

}