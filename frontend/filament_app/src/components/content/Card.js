import React, { Component } from 'react';
import firebase from 'firebase';


class Card extends Component {
    state = {
        carbon: null
    }

	async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
		const response = await fetch('http://localhost:4000/dev/carbon/1',{ 
                    headers: { 
                        'Authorization': idToken
                }
            })
        if (response.status === 401) {
            return console.log('unauthorized')
          }
		const carbonData = await response.json()
		this.setState({carbon: carbonData})
		console.log(carbonData)
	}

    render() {
        if (this.state.carbon) {
            return (
                <div className="card">
                <div className="card-content">
                    <p className="title">
                    {this.state.carbon.offset.price.toString() + " " + this.state.carbon.offset.units}
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset type: " + this.state.carbon.offset.metadata.type}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset location: " + this.state.carbon.offset.metadata.location.state + ", " + this.state.carbon.offset.metadata.location.country}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset amount: " + this.state.carbon.carbon.usage.toString() + " " + this.state.carbon.carbon.units}
                        </span>
                    </p>
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                    <span>
                        {// eslint-disable-next-line
                        <a href="">Buy Offset</a>
                        }
                    </span>
                    </p>
                </footer>
                </div>
            );
        } else {
            return (
                <div className="card">
                <div className="card-content">
                    <p className="title">
                    "Fetching data..."
                    </p>
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                    <span>
                        Buy Offset
                    </span>
                    </p>
                </footer>
                </div>
            );
        }
    }
}

export default Card;