import React from 'react'
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import SplitPane from 'react-split-pane'
export default class SplitView extends React.Component{



    render(){
        const {  Content } = Layout;

        return(
            <SplitPane split="vertical" minSize={50} defaultSize={100}>
                 <Content style={{ margin: '2em 2em 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>content</div>
                 </Content>
                <Content style={{ margin: '2em 2em 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>content</div>
                </Content>
            </SplitPane>
            
        )
    }
}