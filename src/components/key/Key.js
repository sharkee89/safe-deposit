import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeStatus } from '../../actions/screenAction';
import store from '../../store/store';

import './Key.scss';
import Config from '../../config/config';

class Key extends Component {

    changeStatus(value) {
        if (
            this.props.screen.status !== Config.screenStatus.VALIDATE &&
            this.props.screen.status !== Config.screenStatus.ERROR &&
            this.props.screen.status !== Config.screenStatus.UNLOCK
        ) {
            if (value === 'L') {
                store.dispatch({ type: 'START_LOCK_ASYNC', payload: this.props.screen.status });
                store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                return;
            }
            let passValue = isNaN(this.props.screen.status) ?
                value : this.props.screen.status += value.toString();
            if (passValue.length > 6) {

            } else {
                store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                store.dispatch({ type: 'CHANGE_STATUS_ASYNC', payload: passValue });
                store.dispatch({ type: 'START_IDLE_TIMING' });
            }
        }
    }
    render() {
        return (
            <button className="key" onClick={() => this.changeStatus(this.props.value)}>
                {this.props.value}
            </button>
        )
    }
}
const mappStateToProps = state => ({
    screen: state.screen
})

export default connect(mappStateToProps, { changeStatus })(Key);