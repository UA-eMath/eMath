import React from 'react'
import 'antd/dist/antd.css';
import TopNav from './../../components/topNav';
import SplitPane from "react-split-pane"
import './index.css'

export default class AuthoringLayout extends React.Component {
	render() {
		return (
			<div>
				<TopNav/>
				<SplitPane
					split="vertical"
					minSize={0} defaultSize={200}
				>
					<div
						style={{
							background: '#00aa00',
							minHeight: "90vh",
						}}>
						Level Tree
					</div>

					<div
						style={{
							background: '#aaaa00',
							minHeight: "90vh",
						}}
					>
						Editor
					</div>

				</SplitPane>
			</div>
		)
	}
}
