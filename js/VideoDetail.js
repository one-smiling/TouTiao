/**
 * Created by lushuai on 2018/3/29.
 */

import React, { Component } from 'react';
import Video from 'react-native-video'
import {View, StyleSheet,Dimensions} from 'react-native'
import VideoControls from './Commen/VideoControls'

const WINDOW_WIDTH = Dimensions.get('window').width
const VIDEO_ASPECT_RATIO = 16 / 9;
const VIDEO_HEIGHT = WINDOW_WIDTH / VIDEO_ASPECT_RATIO

export  default  class VideoDetail extends React.Component {

    constructor(props){
        super(props)
    }
    static navigationOptions = ({ navigation }) => {
        const { item } = navigation.state.params;
        return {
            title: item.title
        }};
    state = {
        isLoading:false,
        videoDuration:0,
        currentTime:0
    }
    render() {
        let {item} = this.props.navigation.state.params
        return(
            <View style={{flex:1}}>
                <VideoControls
                    source={{uri:item.mp4_url}}
                    ref={ref=>{this.video = ref}}
                    rate={1.0}
                    paused={true}
                    style={styles.backgroundVideo}
                   />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    backgroundVideo: {
        top: 0,
        left: 0,
        width:WINDOW_WIDTH,
        height:VIDEO_HEIGHT
    },
})
