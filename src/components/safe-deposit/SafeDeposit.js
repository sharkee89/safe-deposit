import React, { Component } from 'react'
import Screen from '../screen/Screen';
import Keypad from '../keypad/Keypad';
import Config from '../../config/config';
import './SafeDeposit.scss';

export default class SafeDeposit extends Component {
    state = {
        serialNumber: Config.serialNumber
    }
    render() {
        return (
            <div className="safe-deposit">
                <Screen />
                <Keypad />
                <div className="safe-deposit__serial-number">
                    S/N: {this.state.serialNumber}
                </div> 
            </div>
        )
    }
}
 