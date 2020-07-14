import React, { Component } from 'react';
import {
    Button,
    Carousel,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import Title from "../component/Title"
import TimerContent from "../component/TimerContent"

function ifElse(l, v){
    return l ? l : v
}

function padding(n){
    return n < 10 ? "0"+n : n;
}

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            index: 0,
            isStudying: false,
            title: ""
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.handleStartStudy = this.handleStartStudy.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
    }

    handleSelect(selectedIndex, e){
        this.setState({ index: selectedIndex })
    }

    handleTitle(e){
        this.setState({ title: e.currentTarget.value })
    }

    handleStartStudy(){

    }

    render(){
        return (
            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} style={{ height: "100%"}} interval={null}>
                <Carousel.Item>
                    <p>공부 시간</p>
                    <TimerComponent startedAt={new Date()}/>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="무엇을 공부하나요?"
                            value={this.state.title}
                            onInput={this.handleTitle}
                        />
                        <InputGroup.Append>
                            <Button variant="primary" onClick={this.handleStartStudy}>START</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Carousel.Item>
                <Carousel.Item>
                    <p>남은 시간</p>
                    <TimerComponent startedAt={new Date()}/>
                </Carousel.Item>
            </Carousel>
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
                <p>공부 기록표</p>
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
    alignItems: "center",
    padding: 5
}

const timerStyle = {
    width: "100%",
    height: "50%",
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    overflow:"auto",
    padding: 10
}

const loggerStyle = {
    height: "50%",
    overflow: "auto"
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