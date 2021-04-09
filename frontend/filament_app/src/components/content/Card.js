import React, { Component } from 'react';
import firebase from 'firebase';

const isLocalEnv = window.location.href.includes('localhost')
let backendUrl = 'https://ulo5y72k4m.execute-api.us-east-1.amazonaws.com/dev'
if (isLocalEnv) {
  backendUrl = 'http://localhost:4000/dev'
}

class Card extends Component {
    state = {
        carbon: null
    }

	async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': idToken },
            body: JSON.stringify({ type: 'carbon', usage: 10, units: 'kg' })
        };
        const response = await fetch(backendUrl + "/carbon", requestOptions)
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
                    {this.state.carbon.cost.total.toString() + " " + this.state.carbon.cost.currency}
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Carbon cost: " + this.state.carbon.cost.offset.toString() + " " + this.state.carbon.cost.currency}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Transaction cost: " + this.state.carbon.cost.transaction.toString() + " " + this.state.carbon.cost.currency}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset Amount: " + this.state.carbon.offset_amount + " kg"}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset location: " + this.state.carbon.details.province + ", " + this.state.carbon.details.country }
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset Type: " + this.state.carbon.details.offset_type}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            <a href={this.state.carbon.url} target="_blank" rel="noopener noreferrer">More info</a>
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