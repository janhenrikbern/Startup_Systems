import React, { Component } from 'react';
import LoginSignUp from 'components/welcome/LoginSignUp';
import SignInScreen from './welcome/SignInScreen';


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {showLogin: false};

        // This binding is necessary to make `this` work in the callback
        this.loginClick = this.loginClick.bind(this);
    }

    loginClick() {
        this.setState(state => ({
            showLogin: !this.state.showLogin
        }));
      }

    render() {
        if (this.state.showLogin){
            return (
                <SignInScreen buttonFunction={this.loginClick}/>
            );
        } else {
            return (
                // <div className="columns">
                //     <div className="column">
                        <LoginSignUp buttonFunction={this.loginClick} />
                //     </div>
                // </div>
            );
        }
    }
}

export default Welcome;