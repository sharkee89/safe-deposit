import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeStatus } from '../../actions/screenAction';
import Config from '../../config/config';

import { Observable } from 'rxjs';

import './Key.scss';

class Key extends Component {
    
    changeStatus(value) {
        let passValue = isNaN(this.props.screen.status) ?
            value : this.props.screen.status += value.toString();
        if (passValue.length > 6) {

        } else {
            this.props.changeStatus(passValue);
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