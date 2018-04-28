/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Provider, connect } from 'react-redux'

import {TabNavigator,StackNavigator,addNavigationHelpers} from 'react-navigation'
import HomePage from './js/HomePage'
import VideoDetail from './js/VideoDetail'
import { addListener } from './js/utils/redux';

import {
    Text,
    Image,
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
export const HomeStack = StackNavigator({
    root: {
        screen: TabNav,
    },
    VideoDetail:{screen:VideoDetail}
})

class AppWithNavigate extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {nav, dispatch} = this.props
        return  (<HomeStack navigation={addNavigationHelpers({dispatch,state:nav,addListener})}/>)
    }
}

const mapStateToProps = (state) => ({
    nav:state.nav
})
export default  connect(mapStateToProps)(AppWithNavigate)







