import React from 'react';
import 'antd/dist/antd.css';
import {Tree, Input,Icon,message} from 'antd';
import getToc from "../../requests/getToc";
import EditingModal from './editingModal';
import updateLevel from '../../requests/updateLevel';

const {TreeNode} = Tree;
const {Search} = Input;


const dataList = [];
const parentId = [];
const generateList = data => {
	for (let i = 0; i < data.length; i++) {
		const node = data[i];
		const {id, tocTitle} = node;
		dataList.push({id: id, tocTitle: tocTitle});
		parentId.push(id.toString());
		if (node.children) {
			generateList(node.children);
		}
	}
};

const getParentKey = (id, tree) => {
	let parentKey;
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i];
		if (node.children) {
			if (node.children.some(item => parseInt(item.id) === parseInt(id))) {
				parentKey = node.id;
			} else if (getParentKey(id, node.children)) {
				parentKey = getParentKey(id, node.children);
			}
		}
	}
	return parentKey;
};


export default class LevelEditor extends React.Component {
	constructor(props) {
		super(props);

		this.updateLevelTree = this.updateLevelTree.bind(this)
	}

	state = {
		expandedKeys: [],
		searchValue: '',
		autoExpandParent: true,
		treeData: [],
	};

	componentDidMount() {
		//TODO change here
		this.getTreeData(1);
	}

	updateLevelTree() {
		//TODO change here
		this.getTreeData(1);
	}

	getTreeData = (id) => {
		getToc({id: id}).then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_TREE_FAILED", data);
				} else {
					this.setState({
						treeData: [data.data]
					});
					generateList(this.state.treeData);
					this.setState({
						expandedKeys: parentId
					});
				}
			}
		)
	};

	onExpand = expandedKeys => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	onChange = e => {
		const {value} = e.target;
		const expandedKeys = dataList.filter(item => {
			return item.tocTitle !== null
		}).map(item => {
			if (item.tocTitle.indexOf(value) > -1) {
				return getParentKey(item.id, this.state.treeData);
			}
			return null;
		}).filter((item, i, self) => item && self.indexOf(item) === i);
		this.setState({
			expandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
	};

	renderTreeNodes = data =>
		data.filter(item => {
			return item.tocTitle !== null
		}).sort(function (a, b) {
			return a.position - b.position;
		}).map(item => {
			const index = item.tocTitle.indexOf(this.state.searchValue);
			const beforeStr = item.tocTitle.substr(0, index);
			const afterStr = item.tocTitle.substr(index + this.state.searchValue.length);
			const title =
				index > -1 ? (
					<span>
	                        {beforeStr}
						<span style={{color: '#f50'}}>{this.state.searchValue}</span>
						{afterStr}
                        </span>
				) : (
					<span>{item.tocTitle}</span>
				);

			if (item.children) {
				if (item.isPage === true) {
					return (
						<TreeNode icon = { <Icon type="file" /> }
						          key={item.id}
						          title={<EditingModal
							          parent={item}
							          title={title}
							          updateTree={this.updateLevelTree}
						          />}
						/>
					)
				}
				return (
					<TreeNode icon = {item.parent === null ? <Icon type="book" /> : <Icon type="branches" />}
					          key={item.id}
					          title={<EditingModal
						          parent={item}
						          title={title}
						          updateTree={this.updateLevelTree}/>
					          }>
						{this.renderTreeNodes(item.children)}
					</TreeNode>)
			}
		});

	onDrop = info => {
		// console.log(info);
		const node_been_dragged_key = info.dragNode.props.eventKey;
		const node_been_dropped_key = info.node.props.eventKey;

		//calc before(-1) of dropped node and after(1);
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

		let request_body = {};
		// Need to change parent and position
		//change parent
		let dragged_node_parent = getParentKey(node_been_dragged_key, this.state.treeData);
		if (typeof dragged_node_parent === 'undefined') {
			dragged_node_parent = this.state.treeData[0].parent;
		}

		let dropped_node_parent = getParentKey(node_been_dropped_key, this.state.treeData);
		if (typeof dropped_node_parent === 'undefined') {
			dropped_node_parent = this.state.treeData[0].parent;
		}

		if (dragged_node_parent !== dropped_node_parent) {
			request_body = {...request_body, parent: dropped_node_parent}
		}

		//change position
		request_body = JSON.stringify({
			...request_body,
			//position: getNode(node_been_dropped_key, this.state.treeData) + dropPosition,
			position: dropPosition,
			target: node_been_dropped_key
		});

		console.log(node_been_dragged_key, node_been_dropped_key, dropPosition);
		console.log(request_body);

		updateLevel(request_body, node_been_dragged_key).then(data => {
			if (!data || data.status !== 200) {
				if (data.status === 400){
					message.error(data.data);
				}
				console.error("Update error", request_body, data);
			}
			this.updateLevelTree();
		})
	};

	render() {
		const {expandedKeys, autoExpandParent} = this.state;
		return (
			<div>
				<Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
				<Tree
					onExpand={this.onExpand}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
					draggable
					blockNode
					onDrop={this.onDrop}
					showIcon={true}
					selectable={false}
				>
					{this.renderTreeNodes(this.state.treeData)}
				</Tree>
			</div>
		);
	}
}

