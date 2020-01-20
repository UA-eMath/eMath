import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import {Card, Icon} from 'antd';
import "./index.css";
import 'antd/dist/antd.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Row, Col} from 'antd';
import GetRoots from '../../requests/GetRoots';

export default class BookDisplay extends React.Component {

	state = {
		data: [],
	};

	componentDidMount() {
		GetRoots().then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_TAGS_FAILED", data);
				} else {
					console.log(data);
					this.setState({
						data: data.data
					});

				}
			}
		)
	}

	render() {
		return (
			<CardDeck style={{justifyContent: 'center'}}>
				{this.bookCard()}
			</CardDeck>
		)
	}

	bookCard = () => {
		const {data} = this.state;

		const {Meta} = Card;
		let cards = [];

		for (let i = 0; i < data.length; i++) {
			let itemToPush;

			function renderTooltip(props) {
				const {outOfBoundaries, scheduleUpdate, show, arrowProps, ...rest} = props;
				return (
					<div
						{...rest}
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
				)
			}

			let authors = () => {
				let description = '';
				//TODO author array
				let author_array = [data[i].root.author];
				console.log(author_array);
				for (let key in author_array) {
					description += author_array[key].first_name + ' ';
					let md = author_array[key].middle_name;
					description += (!md) ? '' : md + ' ';
					description += author_array[key].last_name + ' ';
				}
				return description
			};

			itemToPush =
				<Row type="flex"
				     justify="space-between"
				     key={i}>
					<Col span={4}>
						<OverlayTrigger
							placement="bottom"
							delay={{show: 250, hide: 400}}
							overlay={renderTooltip}
						>
							<div>
								<Card
									hoverable
									style={{width: 300, margin: 20}}
									cover={<img alt="example"
									            src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg"
									            onClick={() => {
										            window.location.href = '/view/' + data[i].title + '/' + data[i].id
									            }}/>}
									actions={[
										<Icon type="setting" key="setting"/>,
										<Icon type="edit" key="edit" onClick={() => {
											window.location.href = '/authoring/' + data[i].id
										}}/>,
										<Icon type="read" key="read" onClick={() => {
											window.location.href = '/view/' + data[i].title + '/' + data[i].id
										}}/>
									]}

								>
									<Meta title={data[i].title}
									      description={authors()}/>
								</Card>
							</div>
						</OverlayTrigger>
					</Col>
					< /Row>;
						cards.push(itemToPush);
						}
						return cards;
						};

						}