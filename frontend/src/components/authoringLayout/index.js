import React from 'react'
import 'antd/dist/antd.css';
import TopNav from './../../components/topNav';
import LevelEditor from './../../components/levelEditor'
import ParaEditor from './../../components/paraEditor'
import SplitPane from "react-split-pane"
import './index.css'

export default class AuthoringLayout extends React.Component {
	render() {
		return (
			<div>
				<TopNav/>
				<SplitPane
					split="vertical"
					minSize={0} defaultSize={500}
				>
					<div
						style={{
							minHeight: "90vh",
						}}>
						<LevelEditor/>
					</div>

					<div
						style={{
							background: '#aaaa00',
							minHeight: "90vh",
						}}
					>
						<ParaEditor/>
					</div>

				</SplitPane>
			</div>
		)
	}
}
