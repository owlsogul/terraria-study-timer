import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

function ifElse(l, v){
    return l ? l : v
}

function padding(n){
    return n < 10 ? "0"+n : n;
}

class TimerComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            diff: 0
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            const nowAt = new Date()
            const startedAt = ifElse(this.props.startedAt, nowAt)
            this.setState({ diff: nowAt - startedAt })
            console.log(nowAt- startedAt)
        }, 10)
    }

    componentWillUnmount(){
        //if (this.timer) clearInterval(this.timer)
    }

    render(){
        let diff = this.state.diff
        let hour = Math.floor(diff / (60*60*1000))
        diff -= hour * (60*60*1000)
        let min = Math.floor(diff / (60*1000))
        diff -= min * (60*1000)
        let sec = Math.floor(diff/1000)

        return (
            <div>
                {padding(hour)} : {padding(min)} : {padding(sec)}
            </div>
        )
    }
}

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
            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} style={{ height: "100%"}} slide={false}>
                <Carousel.Item>
                    <TimerComponent startedAt={new Date()}/>
                </Carousel.Item>
                {/* <Carousel.Item>
                    <TimerComponent startedAt={new Date()}/>
                </Carousel.Item> */}
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
    width: "100%",
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