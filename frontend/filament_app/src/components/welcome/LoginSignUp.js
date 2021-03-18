import React, { Component } from 'react';

class LoginSignUp extends Component {

    render() {
        if (true) {
            return (
                <section className="content is-medium welcome-page-container">
                    <div className="columns is-centered background_secondary">
                        <div className="column has-text-centered">
                        <figure>
                                <img src="imgs/chart.png" alt="Mock preview of recent energy usage graph."></img>
                        </figure>
                            <p>
                            <button className="is-wide-button button is-medium is-primary">Login</button>
                            </p>
                            <p>
                            <button className="is-wide-button button is-medium is-primary">Sign Up</button>
                            </p>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
            <form className="box">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="e.g. jen.doe@example.com"></input>
                    </div>
                </div>
    
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="********"></input>
                    </div>
                </div>
                <button className="button is-primary">Login</button>
    
            </form>
            );
        }
    }
}

export default LoginSignUp;