import React, { Component } from 'react';
import GettingStarted from 'components/welcome/GettingStarted';
import LoginSignUp from 'components/welcome/LoginSignUp';

class Welcome extends Component {

    render() {
        return (
        <div className="columns">
            <div className="column">
                <GettingStarted />
            </div>
            <div className="column">
                <LoginSignUp />
            </div>
        </div>
        );
    }
}

export default Welcome;