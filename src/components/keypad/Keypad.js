import React, { Component } from 'react'
import './Keypad.scss';
import Key from '../key/Key';
import Config from '../../config/config';
import { connect } from 'react-redux';
import { testAction } from '../../actions/testAction';
import PropTypes from 'prop-types';

class Keypad extends Component {
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

Keypad.propTypes = {
    testAction: PropTypes.func.isRequired,
    safe: PropTypes.array.isRequired
}

const mappStateToProps = state => ({
    safe: state.safe.name
})

export default connect(mappStateToProps, { testAction })(Keypad);