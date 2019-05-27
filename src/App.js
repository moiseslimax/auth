import React, { Component } from 'react';
import * as firebase from 'firebase'
import { View } from 'react-native';
import Header from './components/common/Header';
import LoginForm from './components/LoginForm'
import Button from './components/common/Button';
import Spinner from './components/common/Spinner';
import CardSection from './components/common/CardSection';

class App extends Component {
    state = { loggedIn: null};

    componentWillMount() {

        console.log('will mount');

        let firebaseConfig = {
           
          };
          console.log('will mount');
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);

          console.log('will mount');
          firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false })
            }

          })
          console.log(this.state);

    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (
                <CardSection style={{paddingTop: 20}}>
                    <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
                </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }

    }

    render() {
        return(
            <View>
                <Header headerText='Authentication'/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
