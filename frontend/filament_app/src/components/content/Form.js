import React from 'react';
import firebase from 'firebase';

const isLocalEnv = window.location.href.includes('localhost')
let backendUrl = 'https://ulo5y72k4m.execute-api.us-east-1.amazonaws.com/dev'
if (isLocalEnv) {
  backendUrl = 'http://localhost:4000/dev'
}

class CarbonForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 0, units: 'kg'};

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
      const idToken = await firebase.auth().currentUser?.getIdToken()
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': idToken },
        body: JSON.stringify({ type: 'carbon', usage: this.state.value, units: this.state.units })
      };
      await fetch(backendUrl + "/carbon/", requestOptions)
      alert('You submitted a new emission of ' + this.state.value.toString() + ' ' + this.state.units);
      this.setState({value: 0, units: 'kg'});
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Submit new emission amount:
            <input type="number" value={this.state.value} onChange={this.handleValueChange} />
            <select value={this.state.units} onChange={this.handleUnitChange}>            
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default CarbonForm;
