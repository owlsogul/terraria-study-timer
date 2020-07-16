import React, { Component } from 'react';
import {
    Button,
    Carousel,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import Title from "../component/Title"
import TimerComponent from "../component/TimerComponent"

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
        this.getStartedAt = this.getStartedAt.bind(this)
    }

    handleSelect(selectedIndex, e){
        this.setState({ index: selectedIndex })
    }

    handleTitle(e){
        this.setState({ title: e.currentTarget.value })
    }

    handleStartStudy(){
        alert("공부시작!")
    }

    getStartedAt(){
        console.log(this.props.studyLog.startedAt)
        console.log(Date.parse(this.props.studyLog))
        if (this.props.studyLog) return Date.parse(this.props.studyLog.startedAt)
        else return new Date()
    }

    render(){
        return (
            <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} style={{ height: "100%"}} interval={null}>
                <Carousel.Item>
                    <p>공부 시간</p>
                    <TimerComponent startedAt={this.getStartedAt}/>
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
        this.state = {
            logs: [],
            studyLog: false,
            gameLog: false
        }
    }

    componentDidMount(){
        fetch("http://localhost/student/log/", {
            method: "GET",
            header: { "Content-Type": "application/json", "Accept": "*/*"}
        })
        .then(res=>res.json())
        .then(res=>{

            let logs = []
            let study = {}
            let game = {}

            res.forEach(log=>{
                if (log.endedAt) logs.push(log)
                else if (log.logType == 0) game = log
                else if (log.logType == 1) study = log
                else console.log("except it")
            })
            console.log(res)
            this.setState({ logs: logs, studyLog: study, gameLog: game })
        })
        .catch(console.log)
    }
    render(){
        return (
            <div style={studyStyle}>
                <div style={timerStyle}>
                    <Timer studyLog={this.state.studyLog}/>
                </div>
                <div style={loggerStyle}>
                    <Logger logs={this.state.logs}/>
                </div>
            </div>
        )
    }

}