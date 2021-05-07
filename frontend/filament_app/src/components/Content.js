import React, { Component } from 'react';
import Navbar from './content/Navbar';
import Card from 'components/content/Card';
import CarbonForm from 'components/content/Form';



class MemberContent extends Component {

    emissionOptions() {
        return (
            <CarbonForm />
        )
    }

    render() {
        return (
            <div>
                <Navbar firebase={this.props.firebase} />
            <div className="columns is-centered">
                <div className="column has-text-centered content-column">
                    <Card emissionOptions={this.emissionOptions()}/>
                </div>
            </div>
            </div>
        );
    }
}

export default MemberContent;