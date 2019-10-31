import React from 'react';
import 'antd/dist/antd.css';
import {Tree, Input} from 'antd';
import getToc from "../../requests/getToc";
import {Menu, Dropdown} from 'antd';
import EditingModal from './editingModal';

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
			if (node.children.some(item => item.id === id)) {
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
		let id = 1;
		getToc({id: id}).then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_TAGS_FAILED", data);
				} else {
					this.setState({
						treeData: data.data.children
					});
					generateList(this.state.treeData);
					this.setState({
						expandedKeys: parentId
					});
				}
			}
		)
	}

	updateLevelTree() {
		let id = 1;
		getToc({id: id}).then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_TAGS_FAILED", data);
				} else {
					this.setState({
						treeData: data.data.children
					});
					generateList(this.state.treeData);
					this.setState({
						expandedKeys: parentId
					});
				}
			}
		)
	}

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
				return (
					<TreeNode key={item.id} title={
						<EditingModal parent={item} title={title} updateTree={this.updateLevelTree}/>
					}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.id} title={item.tocTitle}/>;
		});

	render() {
		const {expandedKeys, autoExpandParent} = this.state;
		return (
			<div>
				<Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
				<Tree
					onExpand={this.onExpand}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
				>
					{this.renderTreeNodes(this.state.treeData)}
				</Tree>
			</div>
		);
	}
}

