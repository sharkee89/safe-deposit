import React, { Component } from 'react'
import './Screen.scss';

export default class Screen extends Component {
    render() {
        return (
            <div className="screen">
                <div className="screen__lseg">
                    Unlocked
                </div>
                <div className="screen__mseg">
                    Ready
                </div>
            </div>
        )
    }
}
