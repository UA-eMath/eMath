import React from 'react'
import fetchTocTree, {fetchGlossaryTree} from "./treeData";
import {Tree} from 'antd';
import {Drawer, Tabs, Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import {openNewWindow} from "../../../actions";
import {getIndexTree} from "../../../requests/getTree";

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
	onWindowOpen: (pageId, isPage) =>
		dispatch(openNewWindow(pageId, isPage)),
});


class MenuDrawer extends React.Component {

	state = {
		treeData: [],
		glossary: null,
		symbolIndex: null,
		authorIndex: null,
		bibliography: null,
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

		getIndexTree(id, "glossary").then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_Glossary_FAILED", data);
				} else {
					console.log(data.data);
					this.setState(
						{
							glossary: data.data
						}
					);
				}
			}
		);
	}

	render() {
		let {glossary, symbolIndex, authorIndex, bibliography} = this.state;

		let glossaryPane = glossary === null ? null : <TabPane tab="Glossary" key="3">
			<Tree
				switcherIcon={<Icon type="down"/>}
				style={styles.Tree}
				defaultExpandAll={true}
			>
				{this.renderIndexNodes(this.state.glossary)}
			</Tree>
		</TabPane>;

		let symbolPane = symbolIndex === null ? null : <TabPane tab="Symbols" key="4">
			Content of Tab Pane 3
		</TabPane>;

		let authorIndPane = authorIndex === null ? null : <TabPane tab="A-Ind" key="6">
			Content of Tab Pane 3
		</TabPane>;

		let refsPane = bibliography === null ? null : <TabPane tab="Refs" key="5">
			Content of Tab Pane 3
		</TabPane>;

		return (
			<div style={styles.DivPos}>

				<Icon type='menu' onClick={this.showDrawer}
				      style={styles.Icon}/>
				<Drawer
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={"50%"}
					style={{fontSize: '25px'}}
				>

					<Button style={{float: 'right'}} type="normal" onClick={() => {
						this.onClose()
					}}>
						<Icon type="right"/>
					</Button>

					<Tabs defaultActiveKey="1">
						<TabPane tab="TOC" key="1">
							<Tree
								switcherIcon={<Icon type="down"/>}
								style={styles.Tree}
								defaultExpandAll={true}
							>
								{this.renderTreeNodes(this.state.treeData.slice(1,))}
							</Tree>
						</TabPane>

						<TabPane tab="ISO" key="2">
							<Tree
								switcherIcon={<Icon type="down"/>}
								style={styles.Tree}
								defaultExpandAll={true}
							>
								{this.renderTreeNodes(this.state.treeData.slice(0, 1))}
							</Tree>

						</TabPane>

						{glossaryPane}
						{symbolPane}
						{refsPane}
						{authorIndPane}

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

	renderIndexNodes = (data) => {
		return data.map(item => {

				if (item.children) {
					return (
						<TreeNode
							title={
								<a onClick={() => {
									this.props.onWindowOpen(item.id, false);
									this.onClose()
								}}>
									{item.tocTitle}
								</a>
							}
							key={item.tocTitle + item.id}
							dataRef={item}
							selectable={false}>
							{this.renderIndexNodes(item.children)}
						</TreeNode>
					)
				} else
					return <TreeNode key={item.key} {...item} selectable={false}/>;
			}
		)
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
									this.props.onWindowOpen(item.id, true);
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