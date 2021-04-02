import React, { Component } from 'react';
import firebase from 'firebase';


class Card extends Component {
    state = {
        energy: null
    }

	async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
		const response = await fetch('http://localhost:4000/dev/energy/1',{ 
                    headers: { 
                        'Authorization': idToken
                }
            })
        if (response.status === 401) {
            return console.log('unauthorized')
          }
		const energyData = await response.json()
		this.setState({energy: energyData})
		console.log(energyData)
	}

    render() {
        if (this.state.energy) {
            return (
                <div className="card">
                <div className="card-content">
                    <p className="title">
                    {this.state.energy.offset.price.toString() + " " + this.state.energy.offset.units}
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset type: " + this.state.energy.offset.metadata.type}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset location: " + this.state.energy.offset.metadata.location.state + ", " + this.state.energy.offset.metadata.location.state}
                        </span>
                    </p>
                    <p className="subtitle">
                        <span>
                            {"Offset amount: " + this.state.energy.carbon.usage.toString() + " " + this.state.energy.carbon.units}
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