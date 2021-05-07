import React from 'react';
import firebase from 'firebase';

const isLocalEnv = window.location.href.includes('localhost')
let backendUrl = 'https://ulo5y72k4m.execute-api.us-east-1.amazonaws.com/dev'
if (isLocalEnv) {
  backendUrl = 'http://localhost:4000/dev'
}

class BuyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: props.carbon, money: props.money, offset: props.offset, transaction: props.transaction};
  
      this.handleUnitChange = this.handleUnitChange.bind(this);
      this.handleValueChange = this.handleValueChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleValueChange(event) {
        this.setState({value: event.target.value});
    }
  
    handleUnitChange(event) {
        this.setState({units: event.target.value});
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      console.log(this.props)
      const idToken = await firebase.auth().currentUser?.getIdToken()
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': idToken },
        body: JSON.stringify({ type: 'carbon', usage: (-1.0 * this.props.carbon).toString(), units: 'kg' })
      };
      await fetch(backendUrl + "/carbon/", requestOptions)
      alert('You successfully offset ' + this.props.carbon.toString() + ' kg of your carbon emissions!');
      this.setState({value: 0, units: 'kg'});
    //   this.props.onClick(event)
    }
  
    render() {
      return (
        <div>
          <p className="title"><span>Offset your emissions for ${this.props.money.toString()}.</span></p>
          <p className="subtitle">
            <span>
                {"Carbon cost: $" + this.props.offset.toString()}
            </span>
            </p>
            <p className="subtitle">
                <span>
                    {"Transaction cost: $" + this.props.transaction.toString()}
                </span>
            </p>
          <button className="button login-button primary" onClick={this.handleSubmit}>Purchase Offset</button>
        </div>
      );
    }
  }
  
  export default BuyForm;