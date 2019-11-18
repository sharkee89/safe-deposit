import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeStatus } from '../../actions/screenAction';
import store from '../../store/store';
import './Key.scss';
import Config from '../../config/config';
import soundFile from '../../audio/button.mp3';
import { isStatusNumber } from '../../helper/utils';

class Key extends Component {

    btnSound = new Audio(soundFile);

    changeStatus(value) {
        if (
            this.props.screen.status !== Config.screenStatus.VALIDATE &&
            this.props.screen.status !== Config.screenStatus.ERROR &&
            this.props.screen.status !== Config.screenStatus.UNLOCK
        ) {
            if (value === 'L') {
                this.btnSound.play();
                const lengthStr = this.props.screen.status.length > 6 ? 6 : this.props.screen.status.length;
                if (this.props.screen.status.substr(0, lengthStr) === Config.setPasswordCode) {
                    store.dispatch({ type: 'START_SET_PASSWORD'});
                    store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                } else if (this.props.screen.locked === Config.screenLocked.UNLOCK) {
                    store.dispatch({ type: 'START_LOCK_ASYNC', payload: this.props.screen.status.substr(0, lengthStr)});
                    store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                }
                return;
            }
            let passValue = isStatusNumber(this.props.screen.status) ? value : this.props.screen.status += value.toString();
            if (this.props.screen.serviceMode || this.props.screen.setPassword) {
                this.btnSound.play();
                store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                store.dispatch({ type: 'CHANGE_STATUS_ASYNC', payload: passValue });
                store.dispatch({ type: 'START_IDLE_TIMING' });
            } else {
                if (passValue.length > 6) {

                } else {
                    this.btnSound.play();
                    store.dispatch({ type: 'STOP_BACKGROUND_SYNC' });
                    store.dispatch({ type: 'CHANGE_STATUS_ASYNC', payload: passValue });
                    store.dispatch({ type: 'START_IDLE_TIMING' });
                }
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