/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, NativeModules} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

const { RNTwitterSignIn } = NativeModules;
type Props = {};
export default class LoggedOut extends Component<Props> {

  constructor() {
    super();
    this.state = {
      user: firebase.auth().currentUser
    };
    this.onFBLoginOrRegister = this.onFBLoginOrRegister.bind(this);
    this.onGoogleLoginOrRegister = this.onGoogleLoginOrRegister.bind(this);
    this.onTwitterLoginOrRegister = this.onTwitterLoginOrRegister.bind(this);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  }

  // Facebookログイン
  onFBLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
      })
      .catch((error) => {
        const { code, message } = error;
        alert( code + "\n" + message )
      });
  }

  // Google+ ログイン
  onGoogleLoginOrRegister = () => {
    GoogleSignin.configure()
    GoogleSignin.signIn()
      .then((data) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {

      })
      .catch((error) => {
        const { code, message } = error;
        alert( code + "\n" + message )
      });
  }

  // Twitter ログイン
  onTwitterLoginOrRegister = () => {
    const Constants = {
      TWITTER_COMSUMER_KEY: 'qWPj1TXbreMX1SsDvdiQTaF7Y',
      TWITTER_CONSUMER_SECRET: '4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z'
    };

    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then((data) => {
        var credential = firebase.auth.TwitterAuthProvider.credential(data.authToken, data.authTokenSecret);
        return firebase.auth().signInWithCredential(credential)
      })
      .then((user) => {

      })
      .catch((error) => {
        const { code, message } = error;
        alert( code + "\n" + message )
      });
  }
  
  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={this.onFBLoginOrRegister}
                style={styles.loginBtn}
            >
                <Text style={styles.btnText}>FB ロクイン</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={this.onTwitterLoginOrRegister}
                style={styles.loginBtn}
            >
                <Text style={styles.btnText}>Twitter ロクイン</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={this.onGoogleLoginOrRegister}
                style={styles.loginBtn}
            >
                <Text style={styles.btnText}>Google+ ロクイン</Text>
            </TouchableOpacity>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginBtn: {
    height: 40,
    width: 200,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 16
  },
  btnText: {
    textAlign: 'center'
  }
});
