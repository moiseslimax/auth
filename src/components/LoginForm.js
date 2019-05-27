import React, {Component} from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Spinner from './common/Spinner';


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onButtonPress() {
        const { email, password } = this.state

        this.setState({error: '', loading: true})
        
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSucess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(this.onLoginSucess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            })
    }

    onLoginSucess(){
        console.log('rodeie');
        this.setState({
            error: '', 
            loading: false,
            password: '',
            email: ''
        })
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication or creation fail!',
            loading: false,
        })
    }

    renderButton(){
        if (this.state.loading) {
           return <Spinner size="small" /> 
        }
        
        return (
            <Button onPress={() => this.onButtonPress()}> Log in</Button>
        );
        
    }

    render(){
        return (
           <Card>
               <CardSection>
                    <Input
                    label="Email" 
                    placeholder="user@exemple.com"
                    onChangeText={(email) => this.setState({ email })} 
                    value={this.state.email}
                    />
               </CardSection>
              
               <CardSection>
                <Input 
                    isPassword={true}
                    label="Password"
                    placeholder="password"
                    onChangeText={(password) => this.setState({ password })} 
                    value={this.state.password}
                    />
               </CardSection>

               <Text style={styles.errorTextStyle}>{this.state.error}</Text>
               
                <CardSection>
                    {this.renderButton()}
                </CardSection>
           </Card>
        );
    }
}

const styles= {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;