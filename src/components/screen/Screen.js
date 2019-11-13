import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Screen.scss';

class Screen extends Component {
    render() {
        return (
            <div className={(this.props.screen.on ? 'screen on' : 'screen off')}>
                <div className="screen__lseg">
                    {this.props.screen.locked}
                </div>
                <div className="screen__mseg">
                    {this.props.screen.status}
                </div>
            </div>
        )
    }
}

const mappStateToProps = state => ({
    screen: state.screen
})

export default connect(mappStateToProps, { })(Screen);
