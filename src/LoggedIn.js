/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NativeModules, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
const { RNTwitterSignIn } = NativeModules;

type Props = {};
export default class LoggedIn extends Component<Props> {

  constructor() {
    super();
    this.state = {
      user: firebase.auth().currentUser
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  }

  //ログアウトする。
  onLogout() {
    const { user } = this.state;
    const providerId = user.providerData[0].providerId;
    if (providerId === "google.com") {
      GoogleSignin.signOut()
    } else if (providerId === "facebook.com") {
      LoginManager.logOut()
    } else if (providerId === "twitter.com") {
      RNTwitterSignIn.logOut()
    }
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.state;
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.photoURL }} style={styles.userAvatar} resizeMode={'center'}/>
            <Text style={styles.userInfoText}>{`ユーザー名 : ${user.displayName}`}</Text>
            <Text style={styles.userInfoText}>{`メールアドレス : ${user.email}`}</Text>

            <TouchableOpacity
                onPress={this.onLogout}
                style={styles.logoutBtn}
            >
                <Text style={styles.btnText}>ログアウト</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  userAvatar: {
    width: 80,
    height: 80,
    marginBottom: 16
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16
  },
  logoutBtn: {
    height: 40,
    width: 200,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 64
  },
  btnText: {
    textAlign: 'center'
  }
});
