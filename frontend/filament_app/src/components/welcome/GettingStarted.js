import React, { Component } from 'react';

class GettingStarted extends Component {

    render() {
        return (
            <section className="content is-medium welcome-page-container">
                <div className="columns is-centered is-multiline">
                    <div className="column has-text-centered background_ellipse">
                        <div className="">

                        </div>
                        <h4 className="title">Be more concious about your energy usage</h4>
                        <figure>
                            <img src="imgs/rafiki.png" alt="A woman and a man stading next to each other. They are collaborating on organizing their data."></img>
                        </figure>
                        <button className="button is-primary is-medium is-rounded">Get Started</button>
                        <p>
                        <strong> No login necessary </strong>
                        </p>
                        <p className="">
                        All it takes is a billing or usage file from your utility provider.
                        </p>
                    </div>
                </div>
          </section>
        );
    }
}

export default GettingStarted;