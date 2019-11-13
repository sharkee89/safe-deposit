import React, { Component } from 'react'
import './Keypad.scss';
import Key from '../key/Key';
import Config from '../../config/config';
import { connect } from 'react-redux';
import { testAction } from '../../actions/testAction';
import PropTypes from 'prop-types';

class Keypad extends Component {
    componentWillMount() {
        this.props.testAction();
    }
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

Keypad.propTypes = {
    testAction: PropTypes.func.isRequired,
    safe: PropTypes.array.isRequired
}

const mappStateToProps = state => ({
    safe: state.safe.name
})

export default connect(mappStateToProps, { testAction })(Keypad);