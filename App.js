/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {createStore,combineReducers} from 'redux'
import {Provider,connect} from 'react-redux'
import {TabNavigator,StackNavigator,addNavigationHelpers,NavigationActions} from 'react-navigation'
import HomePage from './js/HomePage'
import VideoDetail from './js/VideoDetail'

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


type Props = {};
const TabNav = TabNavigator({
    Home:{screen:HomePage}
})
const HomeStack = StackNavigator({
    Root: {
        screen: TabNav,
    },
    VideoDetail:{screen:VideoDetail}
})




export default class App extends Component<Props> {
  render() {
    return (
        <HomeStack />
    );
  }
}


