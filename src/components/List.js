import React, { Component } from 'react'

export default class List extends Component {
    render() {
        let {list} =this.props;
        return(
            <div>
                {
                    list.map((item,index)=>{
                    return <li key={index}>{item}</li>
                    })
                }
            </div>
        )
    }
}
