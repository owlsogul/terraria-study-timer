import React, { Component } from 'react';
import {
    Tabs, 
    Tab,
} from "react-bootstrap";

import PageStudy from "./PageStudy"
import PageAdmin from "./PageAdmin"

class TabNavigation extends Component {

    constructor(props){
        super(props)
        this.state = {
            key: "home"
        }
    }

    render(){
        return (
            <Tabs 
                id="tab-container"
				activeKey={this.state.key}
				onSelect={key => this.setState({ key })}
            >
                <Tab eventKey="home" title="Study" style={{ width: "100%"}}>
                    <PageStudy />
                </Tab>
                <Tab eventKey="profile" title="Admin" style={{ width: "100%"}}>
                    <PageAdmin />
                </Tab>
            </Tabs>
        )
    }

}

const containerStyle = {
    width: "80vmin",
    height: "80vh",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,

    display: "flex",
    flexDirection: "column"
}

export default class Container extends Component{

    render(){
        return (
            <div style={containerStyle}>
                <TabNavigation/>
            </div>
        )
    }

}