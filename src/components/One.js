import React, { Component } from 'react'
import EventHub from "../utils/event-hub"
export default class One extends Component {

    down=()=>{
        EventHub.trigger("bianse","yellow")
    }
    render() {
        return (
            <div>
                <button onClick={this.down}>点击</button>
            </div>
        )
    }
}
