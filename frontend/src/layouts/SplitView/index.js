import React from 'react'
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Layout } from 'antd';

export default class SplitView extends React.Component{



    render(){
        const {  Content } = Layout;

        return(
            <Row gutter={16}>
                <Col span={12}>
                    <Layout>
                        <Content style={{ margin: '2em 2em 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>content</div>
                        </Content>
                    </Layout>
                </Col>

                <Col span={12}>
                    <Layout>
                        <Content style={{ margin: '2em 2em 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>content</div>
                        </Content>
                    </Layout>
                </Col>
            </Row>

        )
    }
}