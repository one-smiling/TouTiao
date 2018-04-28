import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import {combineReducers,createStore,applyMiddleware} from 'redux'
import {videoInfo} from './js/Actions/reducers'
import App,{HomeStack} from './App'
import { Provider } from 'react-redux';
import { middleware } from './js/utils/redux';

console.disableYellowBox = true

const nav = (state, action)=> {
    const nextState = HomeStack.router.getStateForAction(action,state);
    return nextState || state
}

const AppReducer = combineReducers({videoInfo, nav})
const store = createStore(AppReducer, applyMiddleware(middleware))

export default class TouTiao extends Component{
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('TouTiao', () => TouTiao);

