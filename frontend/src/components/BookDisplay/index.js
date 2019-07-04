import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import {Card} from 'antd';
import "./index.css";
import 'antd/dist/antd.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Row, Col} from 'antd';
import GetRoots from '../../requests/GetRoots';

export default class BookDisplay extends React.Component {

	state = {
        data: [],
        value: [],
        fetching: false,
    };

	componentDidMount() {
        this.fetchRoots();
    }

    fetchRoots = () =>{
		this.setState({ data: [], fetching: true });
		GetRoots().then(
			data =>{
				if (!data || data.status !== 200) {
                    console.error("FETCH_TAGS_FAILED", data);
                }
                else {
                    this.setState({
                        data: data.data
                    });

                }
			}
		)
    };

	bookCard = () => {
		const { fetching, data, value } = this.state;

		const {Meta} = Card;
		let cards = [];
		console.log(data);

		for (let i = 0; i < data.length; i++) {
			let itemToPush;


			const renderTooltip = props => (
				<div

					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.85)',
						padding: '2px 10px',
						color: 'white',
						borderRadius: 3,
						...props.style,
					}}
				>
					{data[i].title}
				</div>
			);

			let oneCard =
				<Card
					hoverable
					style={{width: 300, margin: 20}}
					cover={<img alt="example"
					            src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg"/>}
				>
					<Meta title={data[i].title} description="David Poole"/>
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
				<Row type="flex" justify="space-between" key={i}>
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