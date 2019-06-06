import React from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import { Card } from 'antd';
import "./index.css";
import 'antd/dist/antd.css';

export default class BookDisplay extends React.Component{

    bookCard = () =>{
        const { Meta } = Card;
        let cards = [];
        const datafromapi = [1,2,3,4];

        for (let i =0; i<datafromapi.length;i++){
            let itemToPush;

            itemToPush =
                <div onClick={window.location.href='/math/123'}>
                    <Card
                        hoverable
                        style={{ width: 300, margin: 20 }}
                        cover={<img alt="example"
                                    src="https://images-na.ssl-images-amazon.com/images/I/419zQEc-u4L._SX384_BO1,204,203,200_.jpg" />}
                        >
                        <Meta title="Linear Algebra A Modern Introduction" description="David Poole" />
                    </Card>;
                </div>

            cards.push(itemToPush);
        }
        return cards;
    };

    render() {
        return(
            <CardDeck>
                {this.bookCard()}
            </CardDeck>
        )
    }
}