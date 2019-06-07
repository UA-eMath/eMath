import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import { Card } from 'antd';
import "./index.css";
import 'antd/dist/antd.css';
import  OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default class BookDisplay extends React.Component{

    bookCard = () =>{
        const { Meta } = Card;
        let cards = [];
        const datafromapi = [1,2,3,4];

        for (let i =0; i<datafromapi.length;i++){
            let itemToPush;


            const renderTooltip = props => (
                <div
                    {...props}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                    }}
                >
                    Linear Algebra A Modern Introduction
                </div>
            );

            itemToPush =
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <div onClick = {() => {window.location.href='/math/123'}}>
                        <Card
                            hoverable
                            style={{ width: 300, margin: 20 }}
                            cover={<img alt="example"
                                        src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg" />}
                            >
                            <Meta title="Linear Algebra A Modern Introduction" description="David Poole" />
                        </Card>
                    </div>
                </OverlayTrigger>;

            cards.push(itemToPush);
        }
        return cards;
    };

    render() {
        return(
            <CardDeck style={{marginLeft:'1.5%', marginRight:'1.5%'}}>
                {this.bookCard()}
            </CardDeck>
        )
    }
}