import React, { Component } from 'react';
import Navbar from './content/Navbar';
import Card from 'components/content/Card';
import CarbonForm from 'components/content/Form';



class MemberContent extends Component {

    render() {
        return (
            <div>
                <Navbar firebase={this.props.firebase} />
            <div>
            <p>Welcome {this.props.firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <p>Your email address is {this.props.firebase.auth().currentUser.email}.</p>
            </div>
                <CarbonForm />
                <Card />
            </div>
        );
    }
}

export default MemberContent;