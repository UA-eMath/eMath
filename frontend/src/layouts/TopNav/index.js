import React from 'react'
import {Navbar , NavDropdown,Nav} from 'react-bootstrap'
import "./index.css";

export default class TopNav extends React.Component{

    dropdownCompo = () => {

        let dropdown = [];
        const titles = ['Table of Contents', 'Glossary', 'Symbol Index', 'Bibliography', 'Author Index'];

        for (let i = 0; i < titles.length; i++) {
            dropdown.push(
                <NavDropdown title={titles[i]} id="collasible-nav-dropdown" >
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>);
        }

        return dropdown;

    };

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">eMath</Navbar.Brand>
                <Nav className="ml-auto">
                    {this.dropdownCompo(this)}
                </Nav>
            </Navbar>
        );
    }
}