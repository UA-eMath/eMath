import React from 'react'
import {Navbar ,Nav} from 'react-bootstrap'
import "./index.css";
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';


export default class TopNav extends React.Component{

    dropdownCompo = () => {
        const { SubMenu } = Menu;

        const data = (
            <Menu>
                <Menu.Item>Introduction</Menu.Item>
                <SubMenu title="The Vector Space ℝn">
                    <SubMenu title = "Higher Dimensions and the Vector Space ℝn">
                        <Menu.Item>Points and Coordinates</Menu.Item>
                        <Menu.Item>Cartesian Products of Subsets of n-Space</Menu.Item>
                        <Menu.Item>Equations in Several Variables</Menu.Item>
                        <Menu.Item>Distance between Points</Menu.Item>
                        <Menu.Item>Points, Arrows, and Vectors</Menu.Item>
                        <Menu.Item>Addition and Scalar Multiplication of Vectors</Menu.Item>
                        <Menu.Item>Linear Motion</Menu.Item>
                        <Menu.Item>Linear Combination and Span I</Menu.Item>
                    </SubMenu>

                    <SubMenu title = "The Dot Product">
                        <Menu.Item>The Norm of a Vector</Menu.Item>
                        <Menu.Item>The Dot Product</Menu.Item>
                        <Menu.Item>Orthogonal Projection of a Vector on a Line</Menu.Item>
                        <Menu.Item>Hyperplanes</Menu.Item>
                        <Menu.Item>Distance of a Point from a Hyperplane</Menu.Item>
                            <SubMenu title = "Direction Angles">
                                <Menu.Item>Definition of Direction Angles</Menu.Item>
                                <Menu.Item>A Relationship among Direction Angles</Menu.Item>
                            </SubMenu>
                    </SubMenu>

                    <SubMenu title = "Higher Dimensions and the Vector Space ℝn">
                        <Menu.Item>Vectors Modeling Translations</Menu.Item>
                        <Menu.Item>Vectors Modeling Velocities</Menu.Item>
                        <Menu.Item>Vectors Modeling Forces</Menu.Item>
                    </SubMenu>
                </SubMenu>



            </Menu>
        );


        let dropdown = [];
        const titles = ['Table of Contents', 'Glossary', 'Symbol Index', 'Bibliography', 'Author Index'];

        const dropdownStyle = {
            color : 'white',
            marginRight : "20px"
        };

        for (let i = 0; i < titles.length; i++) {
            let itemToPush;

            if (titles[i] === 'Table of Contents'){
                itemToPush = <Dropdown   inverse overlay={data}>
                    <a className="ant-dropdown-link" style={dropdownStyle}>
                        {titles[i]} <Icon type="down" />
                    </a>
                </Dropdown>
            }else if (titles[i] === 'Glossary'){
                itemToPush = <Dropdown overlay={<Menu/>}>
                    <a className="ant-dropdown-link" style={dropdownStyle}>
                        {titles[i]} <Icon type="down" />
                    </a>
                </Dropdown>
            }else if (titles[i] === 'Symbol Index'){
                itemToPush = <Dropdown overlay={<Menu/>}>
                    <a className="ant-dropdown-link" style={dropdownStyle}>
                        {titles[i]} <Icon type="down" />
                    </a>
                </Dropdown>
            }else if (titles[i] === 'Bibliography'){
                itemToPush = <Dropdown overlay={<Menu/>}>
                    <a className="ant-dropdown-link" style={dropdownStyle}>
                        {titles[i]} <Icon type="down" />
                    </a>
                </Dropdown>
            }else if (titles[i] === 'Author Index'){
                itemToPush = <Dropdown overlay={<Menu/>}>
                    <a className="ant-dropdown-link" style={dropdownStyle}>
                        {titles[i]} <Icon type="down" />
                    </a>
                </Dropdown>
            }


            dropdown.push(itemToPush);


        }

        return dropdown;

    };

    render() {
        return(
            <Navbar   bg="dark" variant="dark" >
                <Navbar.Brand href="#home">eMath</Navbar.Brand>
                <Nav  className="ml-auto" >
                    {this.dropdownCompo()}
                </Nav>
            </Navbar>
        );
    }
}