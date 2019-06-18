import {Drawer, Tabs, Icon} from 'antd';
import React from 'react'
import {Tree} from 'antd';
import treeData from './treeData'
const {TreeNode} = Tree;

const {TabPane} = Tabs;


export default class Controls extends React.Component {

	state= {
		treeData:treeData.treeData,
		visible:false
	};

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


	render() {
		return (
			<div>

				<Icon type='menu' onClick={this.showDrawer}
				      style={{fontSize: '25px', height: '20px', width: '20px', color: 'lightGrey'}}/>

				<Drawer
					title="Basic Drawer"
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={800}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Table of Contents" key="1">
							<Tree

							      defaultSelectedKeys={['0-0-0']}
							      switcherIcon={<Icon type="down"/>}
							      style={{fontSize: '25px'}}>

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
		);
	}

}