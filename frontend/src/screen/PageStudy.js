import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            index: 0
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(selectedIndex, e){
        this.setState({ index: selectedIndex })
    }

    render(){
        return (
            <div>
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                        <Carousel.Item>
                            hi
                        </Carousel.Item>
                        <Carousel.Item>
                            hello
                        </Carousel.Item>
                    </Carousel>
            </div>
        )
    }
}

class Logger extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                공부 기록표 <br />
                20.11.12 23:00:00 수학공부 + 1h 30min (~20.11.12 24:30:00)<br />
                스크롤 가능하게<br />
            </div>
        )
    }
}

const studyStyle = {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection : "column",
    justifyContent: "center",
    alignItems: "center"
}

const timerStyle = {
    height: "50%"
}

const loggerStyle = {
    height: "50%"
}

export default class PageStudy extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={studyStyle}>
                <div style={timerStyle}>
                    <Timer />
                </div>
                <div style={loggerStyle}>
                    <Logger />
                </div>
            </div>
        )
    }

}