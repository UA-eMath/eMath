import React from 'react';
import styled from 'styled-components';


const FooterGroup = styled.div `
	position:absolute;
	bottom:0;
	width:100%;
    background: #007c41;
    padding: 50px 0px 0px 0px;
    display: grid;
    grid-gap: 20px;
    border-top: 3px solid #ffdb05;
`
const Text = styled.div `
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    max-width: 500px;
    margin: 0 auto;
`

const LinkGroup = styled.div `
    font-size: 22px;
    width: 500px;
    color: #5334F5;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    justify-items: center;
    align-items: center; 

    a {
        transition: 0.8s;

    }
    a:hover {
        color:black;
        cursor: pointer;

    }
`

const Copyright = styled.div `
    color: #486791;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20px;
    font-size:18px;
`


const Footer = () => (
    <FooterGroup>
        <Text> © {new Date().getFullYear()}, Build with UAlberta. </Text>
    </FooterGroup>
    
)

export default Footer;
