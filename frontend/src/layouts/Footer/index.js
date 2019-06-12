import React from 'react'
import StickyFooter from 'react-sticky-footer'
import {Button, Radio, Icon} from 'antd';

export default class Footer extends React.Component {
	state = {
		size: 'large',
	};

	handleSizeChange = e => {
		this.setState({size: e.target.value});
	};

	render() {

		const size = this.state.size;
		return (

			<StickyFooter
				bottomThreshold={50}
				normalStyles={{
					backgroundColor: "#999999",
					padding: "0.5rem"
				}}
				stickyStyles={{
					backgroundColor: "rgba(255,255,255,.8)",
					padding: "0.5rem"
				}}
				style={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					right: 0,
				}}
			>

				<Button type="primary"
				        style={{
					        left: 10,
				        }}>
					<Icon type="left"/>
					Next
				</Button>

				<Button type="primary"
				        style={{
					        position: 'absolute',
					        right: 10,

				        }}>
					pre
					<Icon type="right"/>
				</Button>
			</StickyFooter>
		)
	}


}