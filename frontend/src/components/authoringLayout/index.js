import React from 'react'
import {Layout} from "antd/lib/index";
import 'antd/dist/antd.css';
import TopNav from './../../components/topNav';
import Split from 'react-split'

const {Content, Sider} = Layout;


export default class AuthoringLayout extends React.Component {
	render() {
		return (
			<div>
				<TopNav/>
				<Split
					sizes={[100, 100]}
					minSize={100}
					expandToMin={false}
					gutterSize={10}
					gutterAlign="center"
					snapOffset={30}
					dragInterval={1}
					direction="vertical"
					cursor="col-resize"
				>
			
					<div style={{background: '#00aa00'}}>
						Level Tree
					</div>

					<div
						style={{
							background: '#aaaa00',
							padding: 24,
							margin: 0,
							minHeight: "90vh",
						}}
					>
						Editor
					</div>

				</Split>
			</div>
		)}
}
