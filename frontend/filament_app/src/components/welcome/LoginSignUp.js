import React, { Component } from 'react';

class LoginSignUp extends Component {

    render() {
        return (
            <section className="content is-medium welcome-page-container">
                <div className="columns is-centered background_secondary">
                    <div className="column has-text-centered">
                    <figure>
                            <img src="imgs/chart.png" alt="Mock preview of recent energy usage graph."></img>
                    </figure>
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