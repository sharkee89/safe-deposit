import React, { Component } from 'react'
import './Keypad.scss';
import Key from '../key/Key';
import Config from '../../config/config';

export default class Keypad extends Component {
    state = {
        keys: Config.keys
    }
    render() {
        return (
            <div className="keypad">
                {this.state.keys.map((key) => {
                    return <Key key={key.id} value={key.value}/>
                })}
            </div>
        )
    }
}
