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
    Image,
  View
} from 'react-native';


const TabNav = TabNavigator({
    Home:{
        screen:HomePage,
        navigationOptions: {
            tabBarLabel:({ tintColor, focused }) => (
                <Text style={{color:"#d81e04"}}>推荐</Text>
            ),
            tabBarIcon: ({ tintColor, focused }) => (
                <Image source={require('./image/home.png')} style={{width:30,height:30,tintColor:"#d81e04"}}/>
            ),
        },
    }
})
const HomeStack = StackNavigator({
    Root: {
        screen: TabNav,
    },
    VideoDetail:{screen:VideoDetail}
})




export default class App extends Component{
  render() {
    return (
        <HomeStack/>
    )
  }
}


