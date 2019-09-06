import React from 'react'
import fetchTocTree from "./treeData";
import {Tree} from 'antd';
import {Drawer, Tabs, Icon,Button} from 'antd';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import {openNewWindow} from "../../../actions";

const {TreeNode} = Tree;
const {TabPane} = Tabs;

const styles = {
	Icon: {
		fontSize: '25px',
		color: 'lightGrey',
		marginLeft: '25px',
		marginRight: '10px'
	},
	Tree: {
		fontSize: '20px',
	},
	DivPos: {
		float: 'left'
	}
};

const mapDispatchToProps = dispatch => ({
	onWindowOpen: (pageId) =>
		dispatch(openNewWindow(pageId)),
});


class MenuDrawer extends React.Component {

	state = {
		treeData: [],
		visible: false
	};

	componentDidMount() {
		let id = this.props.props.params.id;
		fetchTocTree(id, (data) => {
			this.setState(
				{
					treeData: data
				}
			);

		});
	}

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
					width={700}
					style={{fontSize: '25px'}}
				>

					<Button style={{float:'right'}} type="normal" onClick={()=>{this.onClose()}}>
						<Icon type="right"/>
					</Button>

					<Tabs defaultActiveKey="1">
						<TabPane tab="Table of Contents" key="1">
							<Tree
								switcherIcon={<Icon type="down"/>}
								style={styles.Tree}
								defaultExpandAll={true}
							>
								{this.renderTreeNodes(this.state.treeData, this.props)}
							</Tree>
						</TabPane>

						<TabPane tab="ISO" key="2">
							<Tree
								switcherIcon={<Icon type="down"/>}
								style={styles.Tree}
								defaultExpandAll={true}
							>
								{this.renderTreeNodes(this.state.treeData, this.props)}
							</Tree>

						</TabPane>

						<TabPane tab="Glossary" key="3">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Symbol Index" key="4">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab="Bibliography" key="5">
							Content of Tab Pane 3
						</TabPane>
						<TabPane tab="Author Index" key="6">
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


	renderTreeNodes = (data) =>
		data.filter((item) => {
			return item.tocTitle !== null
		}).map(item => {

			if (item.children) {
				if (item.isPage) {
					return (
						<TreeNode
							title={
								<a onClick={() => {
									this.props.onWindowOpen(item.id);
									this.onClose()
								}}>
									{item.tocTitle}
								</a>
							}

							key={item.id}
							dataRef={item}
							selectable={false}/>
					)
				}
				return (
					<TreeNode title={item.tocTitle} key={item.id} dataRef={item} selectable={false}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}

			return (<TreeNode key={item.id} {...item} selectable={false}/>);
		});

}

export default connect(null, mapDispatchToProps)(MenuDrawer)