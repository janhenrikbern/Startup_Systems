import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAConH4DHpaNkxZw67j-sy94LkV4ZV_24g",
  authDomain: "filament-a9298.firebaseapp.com",
  projectId: "filament-a9298",
  storageBucket: "filament-a9298.appspot.com",
  messagingSenderId: "146553736532",
  appId: "1:146553736532:web:979a40c5c3dca90fac0cc1"
};

firebase.initializeApp(firebaseConfig);


class SignInScreen extends Component {
 
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
 
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <button className="is-wide-button button is-medium is-primary" onClick={this.props.buttonFunction}>Back</button>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1 className="title">Filament</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <p>Your email address is {firebase.auth().currentUser.email}.</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

export default SignInScreen;