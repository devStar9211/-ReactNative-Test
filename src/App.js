/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
    this.checkNotificationPermission();
  }

  componentWillUnmount() {
    this.authSubscription();

    this.notificationDisplayedListener();
    this.notificationListener();
  }

  checkNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // push通知が設定されています。
    } else {
      try {
        // push通知の設定要請する。
        await firebase.messaging().requestPermission();
      } catch (error) {
        console.log(error)
      }
    }

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // push通知の表示時に呼び出される。
      alert(JSON.stringify(notification))

    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // push通知受信時に呼び出される。
      alert(JSON.stringify(notification))
    });
  }

  render() {

    if (this.state.loading) 
      return (
        <View style={styles.container}>
          <ActivityIndicator size={'small'} animating/>
        </View>
      );
    // 既にログインされている。
    if (this.state.user) 
      return <LoggedIn />;
    // ログアウト/ログインされていない。
    return <LoggedOut />;
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
});

