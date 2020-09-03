import React, { Component } from 'react'

export default class Input extends Component {

    down=(e)=>{
        if(e.keyCode===13){
            this.props.add(e.target.value)
        }

    }

    render() {
        // let {add} =this.props;s
        return (
            <div>
                <input onKeyUp={this.down}/>
            </div>
        )
    }
}
