import React, { Component } from 'react';
import List from "./List";
import Input from "./Input"

export default class Todo extends Component {
    state={
        list:["a","b","c"]
    }
    add=(str)=>{
        this.setState({
            list:[...this.state.list,str]
        })
    }

    render() {
        let {list} =this.state;
        return (
            <div>
                <Input add={this.add}/>
                <List list={list}/>
            </div>
        )
    }
}
