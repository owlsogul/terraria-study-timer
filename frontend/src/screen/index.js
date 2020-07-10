import React, { Component } from 'react';

import Container from "./Container"

const wrapperStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEDE3D"
}

export default class Screen extends Component{

    render(){
        return (
            <div style={wrapperStyle}>
                <Container />
            </div>
        )
    }

}