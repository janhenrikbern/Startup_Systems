import React, { Component } from 'react';
import SvgGlobe from '../icons/Globe';

class LoginSignUp extends Component {

    render() {
        return (
            <section className="content is-medium welcome-page-container">
                <div className="columns is-centered">
                    <div className="column has-text-centered">
                        <SvgGlobe height={300} width={400}/>
                        <p className="title filament">
                        Filament
                        </p>
                        <p>
                        Track your consumption.
                        </p>
                        <p>
                        Offset your emissions.
                        </p>
                        <p>
                        Save our planet.
                        </p>
                        <p>
                        <button className="is-wide-button button is-medium is-primary" onClick={this.props.buttonFunction}>Login</button>
                        </p>
                        <p>
                        <button className="is-wide-button button is-medium is-primary" onClick={this.props.buttonFunction}>Sign Up</button>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginSignUp;