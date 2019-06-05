import React from 'react';
import TopNav from './layouts/TopNav';
import SplitView from './layouts/SplitView'
import Footer from './layouts/Footer'

export default class App extends React.Component{
    render(){
        return(
            <div>
                <TopNav/>
                {/*<SplitView/>*/}
                {/*<Footer/>*/}
            </div>
        )
    }
}