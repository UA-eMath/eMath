import React from "react";
import _ from "lodash"
import {Col, Row} from "antd";
import InputBox from "../../InputBox";
import DisplayArea from "../../displayArea";
import ParaControl from "../../paraControl";

class SubLevel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children, alignment, deletePara,} = this.props;

		let left_title = children[0].para_parent.tocTitle;
		let right_title = children[0].para_parent.title;

		let boxHeader;
		console.log(left_title,right_title);
		if (left_title || right_title) {
			boxHeader =
				<div
					style={{
						background: 'linear-gradient(#fdf5e8,#EAE7DC)',
						borderRadius: '2px 2px 0 0',
						padding: "2px 4px 2px 4px",
						marginBottom: "10px"
					}}>
				<span>
					<b>{left_title}</b>
				</span>
					<span
						style={{
							float: "right",
							fontWeight: "bold"
						}}>
					{right_title}
				</span>
				</div>
		}

		return (
			<div style={{
				background: '#fdf5e8',
				borderRadius: '2px',
				boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)',
				marginBottom: '10px'
			}}>
				{boxHeader}

				<div>
					{_.map(children, item => {
						if (alignment) {
							return (
								<Row
									key={item.id}
									style={{
										display: "flex"
									}}
								>
									<Col span={11} style={{
										margin: "10px",
									}}>
										<InputBox id={item.id} boxValue={item.content.data}/>
									</Col>

									<Col span={10} style={{
										margin: "10px",
									}}>
										<DisplayArea id={item.id}/>
									</Col>

									<Col span={1} style={{
										margin: "10px",
									}}>
										<ParaControl id={item.id}
										             deletePara={deletePara}/>
									</Col>
								</Row>
							)
						} else {
							return (
								<Row
									key={item.id}
								>
									<Col span={21}
									     style={{
										     margin: "10px"
									     }}
									>
										<InputBox id={item.id}
										          boxValue={item.content.data}/>

										<DisplayArea id={item.id}/>

									</Col>

									<Col span={1}
									     style={{
										     margin: "10px"
									     }}
									>
										<ParaControl id={item.id}
										             deletePara={this.deletePara}/>
									</Col>

								</Row>
							)
						}

					})}
				</div>

			</div>

		)
	}
}

export default SubLevel;