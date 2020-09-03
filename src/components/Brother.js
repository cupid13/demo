import React, { Component } from 'react'
import One from './One'
import Two from './Two'

export default class Brother extends Component {
    render() {
        return (
            <div>
                <One></One>
                <Two></Two>
            </div>
        )
    }
}
