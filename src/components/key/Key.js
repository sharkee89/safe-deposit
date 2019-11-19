import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../../store/store';
import Config from '../../config/config';
import { isStatusNumber } from '../../helper/utils';
import './Key.scss';
import soundFile from '../../audio/button.mp3';

class Key extends Component {

    btnSound = new Audio(soundFile);

    dispatchSetPassword() {
        store.dispatch({ type: 'START_SET_PASSWORD'});
        store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
    }

    dispatchLockAsync(code) {
        store.dispatch({ type: 'START_LOCK_ASYNC', payload: code});
        store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
    }

    process(passValue) {
        this.btnSound.play();
        store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
        store.dispatch({ type: 'CHANGE_STATUS_ASYNC', payload: passValue });
        store.dispatch({ type: 'START_IDLE_TIMING' });
    }

    lockPress() {
        this.btnSound.play();
        const lengthStr = this.props.screen.status.length > 6 ? 6 : this.props.screen.status.length;
        const code = this.props.screen.status.substr(0, lengthStr);
        if (code === Config.setPasswordCode) {
            this.dispatchSetPassword();            
        } else if (this.props.screen.locked === Config.screenLocked.UNLOCK) {
            this.dispatchLockAsync(code);            
        }
        return;
    }

    changeStatus(value) {
        if (
            this.props.screen.status !== Config.screenStatus.VALIDATE &&
            this.props.screen.status !== Config.screenStatus.ERROR &&
            this.props.screen.status !== Config.screenStatus.UNLOCK
        ) {
            if (value === 'L') {
                this.lockPress();
            }
            let passValue = isStatusNumber(this.props.screen.status) ? value : this.props.screen.status += value.toString();
            if (!this.props.screen.serviceMode) {
                if (passValue.length > 6) {} else {this.process(passValue)}
            } else {
                this.process(passValue);
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

export default connect(mappStateToProps, { })(Key);