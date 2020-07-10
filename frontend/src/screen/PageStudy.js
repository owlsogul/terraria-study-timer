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
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=282c34"
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
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

export default class PageStudy extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={studyStyle}>
                <div>
                    <Timer />
                </div>
                <div>
                    <Logger />
                </div>
            </div>
        )
    }

}