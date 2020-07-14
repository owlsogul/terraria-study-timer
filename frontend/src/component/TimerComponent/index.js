import React, { Component } from 'react';

export default class TimerComponent extends Component {

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
        }, 10)
    }

    componentWillUnmount(){
        if (this.timer) clearInterval(this.timer)
    }

    render(){
        let diff = this.state.diff
        let hour = Math.floor(diff / (60*60*1000))
        diff -= hour * (60*60*1000)
        let min = Math.floor(diff / (60*1000))
        diff -= min * (60*1000)
        let sec = Math.floor(diff/1000)

        return (
            <div style={{ fontSize: "10vmin"}}>
                {padding(hour)} : {padding(min)} : {padding(sec)}
            </div>
        )
    }
}