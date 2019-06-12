import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import {Card} from 'antd';
import "./index.css";
import 'antd/dist/antd.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Row, Col} from 'antd';


export default class BookDisplay extends React.Component {


	bookCard = () => {
		const {Meta} = Card;
		let cards = [];
		const datafromapi = [1, 2, 3, 4, 2, 2, 2, 2];

		for (let i = 0; i < datafromapi.length; i++) {
			let itemToPush;


			const renderTooltip = props => (
				<div
					{...props}
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.85)',
						padding: '2px 10px',
						color: 'white',
						borderRadius: 3,
						...props.style,
					}}
				>
					Linear Algebra A Modern Introduction
				</div>
			);

			let oneCard =
				<Card
					hoverable
					style={{width: 300, margin: 20}}
					cover={<img alt="example"
					            src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg"/>}
				>
					<Meta title="Linear Algebra A Modern Introduction" description="David Poole"/>
				</Card>;

			let oneCardWithTooltip =
				<OverlayTrigger
					placement="bottom"
					delay={{show: 250, hide: 400}}
					overlay={renderTooltip}
				>
					<div onClick={() => {
						window.location.href = '/math/123'
					}}>
						{oneCard}
					</div>
				</OverlayTrigger>;

			itemToPush =
				<Row type="flex" justify="space-between">
					<Col span={4}>
						{oneCardWithTooltip}
					</Col>
				</Row>;


			cards.push(itemToPush);
		}
		return cards;
	};

	render() {
		return (
			<CardDeck style={{justifyContent: 'center'}}>
				{this.bookCard()}
			</CardDeck>
		)
	}
}