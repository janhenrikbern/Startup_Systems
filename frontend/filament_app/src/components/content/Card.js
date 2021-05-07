import React, { Component } from 'react';
import firebase from 'firebase';
import BuyForm from './BuyButton';

const isLocalEnv = window.location.href.includes('localhost')
let backendUrl = 'https://ulo5y72k4m.execute-api.us-east-1.amazonaws.com/dev'
if (isLocalEnv) {
  backendUrl = 'http://localhost:4000/dev'
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {carbon: null, id: 1, showEmissionModal: false, showBuyModal: false, showCard: true};
    }
    
	async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': idToken }
        };
        const response = await fetch(backendUrl + "/carbon", requestOptions)
        if (response.status === 401) {
            return console.log('unauthorized')
          }
		const carbonData = await response.json()
		this.setState({carbon: carbonData})
	}

    toggleEmissionModal(e) {
        this.setState({showEmissionModal: !this.state.showEmissionModal})
        this.setState({showCard: !this.state.showCard})
        !this.state.showEmissionModal && this.componentDidMount()
    }

    toggleBuyOffsetModal(e) {
        this.setState({showBuyModal: !this.state.showBuyModal})
        this.setState({showCard: !this.state.showCard})
        !this.state.showBuyModal && this.componentDidMount()
    }

    buyOffsets() {
        return (
            <div>                
                <BuyForm money={this.state.carbon.cost.total} offset={this.state.carbon.cost.offset} transaction={this.state.carbon.cost.transaction} carbon={this.state.carbon.offset_amount}/>
                <button className="button login-button secondary" onClick={() => (this.toggleBuyOffsetModal())}>Back</button>
            </div>
        );
    }

    submitEmissions() {
        return (
            <div>                
                {this.props.emissionOptions}
                <button className="button login-button secondary" onClick={() => (this.toggleEmissionModal())}>Back</button>
            </div>
        );
    }

    cardContent() {
        return (
            <div className="card-content">
                <button className="button no-button-style secondary" onClick={(e)=>(this.componentDidMount(e))}>Refresh</button>
                <p className="title">
                {this.state.carbon.cost.total.toString() + " " + this.state.carbon.cost.currency}
                </p>
                {/* <p className="subtitle">
                    <span>
                        {"Carbon cost: " + this.state.carbon.cost.offset.toString() + " " + this.state.carbon.cost.currency}
                    </span>
                </p>
                <p className="subtitle">
                    <span>
                        {"Transaction cost: " + this.state.carbon.cost.transaction.toString() + " " + this.state.carbon.cost.currency}
                    </span>
                </p> */}
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
        );
    }
    
    cardFooter() {
        return(
            <footer className="card-footer">
            <p className="card-footer-item">
            <span>
                <button className="button is-medium login-button no-button-style secondary" onClick={(e)=>(this.toggleEmissionModal(e))}>Submit Emission Entry</button>
            </span>
            </p>
            <p className="card-footer-item">
            <span>
                <button className="button is-medium login-button no-button-style primary" onClick={(e)=>(this.toggleBuyOffsetModal(e))}>Buy Offset</button>
            </span>
            </p>
            </footer>
        );
    }

    render() {
        if (!this.state.showCard) {
            if (this.state.showBuyModal) {
                return (
                    this.buyOffsets()
                );
            } else if (this.state.showEmissionModal) {
                return (
                    this.submitEmissions()
                );
            }
        } else {
            if (this.state.carbon && this.state.carbon.cost) {
                return (
                    <div className="card">
                        {this.cardContent()}
                        {this.cardFooter()}
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
                    </div>
                );
            }
        }
    }
}

export default Card;