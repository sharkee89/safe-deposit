import React, { Component } from 'react'
import './Key.scss';

export default class Key extends Component {
    render() {
        return (
            <button className="key">
                {this.props.value}
            </button>
        )
    }
}
