import React from 'react'
import 'antd/dist/antd.css';
import TopNav from './../../components/topNav';
import LevelEditor from './../../components/levelEditor'
import ParaEditor from './../../components/paraEditor'
import SplitPane from "react-split-pane"
import './index.css'

import MathJaxConfig from '../../constants/MathJax_config'
import MathJax from '../mathDisplay'


export default class AuthoringLayout extends React.Component {

	state = {
		paneSize: 700,
	};

	changePaneSize = paneSize => {
		this.setState({
			paneSize: paneSize,
		})
	};

	render() {
		return (
			<MathJax.Provider
				{...MathJaxConfig}
				onError={(MathJax, error) => {
					console.warn(error);
					console.log("Encountered a MathJax error, re-attempting a typeset!");
					MathJax.Hub.Queue(
						MathJax.Hub.Typeset()
					);
				}}
			>
				<div>
					<TopNav/>


					<SplitPane
						split="vertical"
						minSize={0}
						size={this.state.paneSize}
					>
						<div
							style={{
								minHeight: "100vh",
							}}>
							<LevelEditor changePaneSize={this.changePaneSize}/>
						</div>

						<div
							style={{
								background: '#aaaa00',
								minHeight: "100vh",
							}}
						>
							<ParaEditor/>
						</div>

					</SplitPane>
				</div>
			</MathJax.Provider>


		)
	}
}
