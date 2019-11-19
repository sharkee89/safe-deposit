import React, { Component } from 'react'
import Key from '../key/Key';
import Config from '../../config/config';
import './Keypad.scss';

export default class Keypad extends Component {
    state = {
        keys: Config.keys
    }
    onKeyPress(event) {
        const position = Config.keyCodes[event.key] && Config.keyCodes[event.key].position;
        const keys = document.querySelectorAll('.key');
        if (keys[position]) {
            keys[position].click();
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPress, false);
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
