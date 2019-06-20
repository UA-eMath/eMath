import React from 'react'
import treeData from "./treeData";
import {Tree} from 'antd';
import {Drawer, Tabs, Icon} from 'antd';
import 'antd/dist/antd.css';


const {TreeNode} = Tree;
const {TabPane} = Tabs;

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',
		marginLeft: '25px'
	},
	Tree: {
		fontSize: '25px',
	},
	DivPos: {
		float: 'left'
	}
};

export default class subordinateDrawer extends React.Component {


	state = {
		treeData: treeData.treeData,
		visible: false
	};


	render() {
		return (
			<div style={styles.DivPos}>

				<Icon type='menu' onClick={this.showDrawer}
				      style={styles.Icon}/>
				<Drawer
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={800}
					style={{fontSize: '25px'}}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Table of Contents" key="1">
							<Tree
								switcherIcon={<Icon type="down" style={styles.Icon}/>}
								style={styles.Tree}>

								{this.renderTreeNodes(this.state.treeData)}
							</Tree>
						</TabPane>


						<TabPane tab="Glossary" key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Symbol Index" key="3">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab="Bibliography" key="4">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab="Author Index" key="5">
							Content of Tab Pane 3
						</TabPane>

					</Tabs>
				</Drawer>
			</div>
		)

	}


	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	renderTreeNodes = data =>
		data.map(item => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} dataRef={item}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});

}