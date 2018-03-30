/**
 * Created by lushuai on 2018/3/29.
 */
import React,{Component} from 'react'
import {View,Image,Text, Dimensions, StyleSheet, TouchableWithoutFeedback,TouchableOpacity, Slider} from 'react-native'
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'
import Video from 'react-native-video'
import ProgressCircleSnail from 'react-native-progress/CircleSnail'


const WINDOW_WIDTH = Dimensions.get('window').width
const VIDEO_ASPECT_RATIO = 16 / 9;
const VIDEO_HEIGHT = WINDOW_WIDTH / VIDEO_ASPECT_RATIO

export  default  class VideoControls extends Component {
    constructor(props) {
        super(props)
        this._renderLoadingIfNeeded = this._renderLoadingIfNeeded.bind(this)
        this.onLoadStart = this.onLoadStart.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.onBuffer = this.onBuffer.bind(this)
        this.onProgress = this.onProgress.bind(this)
        this.onPlaybackStalled= this.onPlaybackStalled.bind(this)
        this.onVideoPressed = this.onVideoPressed.bind(this)
        this.isSliderDraged = false
        this.isFullScreen = false
        this.hiddenTimer = null

    }
    state = {
        isLoading:false,
        videoDuration:0,
        currentTime:0,
        videoControlsShow:false,
        paused:this.props.paused,
    }

    onVideoPressed() {
        let isPlaying = !this.state.paused
        let state = this.state
        if (isPlaying) {
            state.videoControlsShow = !state.videoControlsShow
            this.automateHiddenVideoControls()
            this.setState(state)
        } else {
            state.paused = isPlaying
            this.setState(state)
        }
    }

    cancelHiddenVideoControls() {
        clearTimeout(this.hiddenTimer)
    }
    automateHiddenVideoControls() {
        if (this.state.videoControlsShow) {
            clearTimeout(this.hiddenTimer)
            this.hiddenTimer = setTimeout(()=>{
                console.log('timeout')
                this.setState({videoControlsShow:!this.state.videoControlsShow})
            },3000)
        }
    }

    onPlaybackStalled() {
        console.log('onPlaybackStalled')
        this.setState({isLoading:true})
    }

    onProgress(data) {
        // console.log('onProgress' + data.currentTime)
        let state = this.state
        if (this.state.isLoading === true) {
            state.isLoading = false
            this.setState(state)
        }
        if (!this.isSliderDraged && this.state.videoControlsShow) {
            state.currentTime = data.currentTime
            this.setState(state)
        }
    }

    getTimeForSecond(time) {
        let minite = time / 60
        let second = time % 60
        return this.pad(parseInt(minite),2) + ':' + this.pad(second,2)
    }

    /* 质朴长存法 */
    // http://www.nowamagic.net/javascript/js_AddZeroFrontOfNumber.php
    pad(num, n) {
        var len = num.toString().length;
        while(len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }

    onLoad(data) {
        console.log('onLoad')
        this.setState({isLoading:false,videoDuration:parseInt(data.duration)})
    }
    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        console.log('onBuffer'+isBuffering)
    }
    onLoadStart() {
        console.log('onLoadStart')
        this.setState({isLoading:true})
    }
    onSliderValueChanged(value){
        this.isSliderDraged = true
        this.cancelHiddenVideoControls()
        this.setState({currentTime:value})
    }

    videoFullScreen() {
        this.isFullScreen = true
        this.video.presentFullscreenPlayer()
    }

    onFullscreenPlayerWillDismiss() {
        this.isFullScreen = false
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate' + !this.isFullScreen)
        return !this.isFullScreen
    }

    _renderLoadingIfNeeded(playingIndex) {
        // return null
        if (playingIndex !== this.state.playIndex || this.state.isLoading !== true) return null
        return (
            <View style={{top:(VIDEO_HEIGHT-40)/2,left:(WINDOW_WIDTH-40)/2,position:'absolute'}}>
                <ProgressCircleSnail indeterminate={true} color={['red']} />
            </View>
        )
    }

    _rederVideoPlayButton() {
        // return null
        if (!this.state.videoControlsShow) return null

        if (!this.state.isLoading) {
            if (this.state.paused) {
                return (
                    <TouchableWithoutFeedback onPress={()=>{this.setState({paused:false})}} >
                        <Image source={require('../../image/FullPlay.png')} style={styles.playBtn}/>
                    </TouchableWithoutFeedback>
                )
            } else  {
                return (
                    <TouchableWithoutFeedback onPress={()=>{this.setState({paused:true})}} style={styles.playBtn}>
                        <Image source={require('../../image/FullPause.png')} style={styles.playBtn}/>
                    </TouchableWithoutFeedback>
                )

            }
        }
    }


    _renderVideoControls() {
        if (!this.state.videoControlsShow) return null
        console.log('_renderVideoControls')
        let sliderProps = this.isSliderDraged ?  null : {value:this.state.currentTime}
        let currentTime = this.getTimeForSecond(parseInt(this.state.currentTime))
        let duration = this.getTimeForSecond(this.state.videoDuration)
        return (
            <View style={styles.videoControls}>
                <Text ref={(ref)=>this.currentTimeText = ref} style={[styles.videoControlItem,{width:40}]}>{currentTime}</Text>
                <Slider {...sliderProps}
                        minimumValue={0}
                        maximumValue={this.state.videoDuration}
                        onSlidingComplete={(value)=>{
                            this.isSliderDraged = false
                            this.automateHiddenVideoControls()
                            this.video.seek(parseInt(value))}
                        }
                        onValueChange={(value)=>this.onSliderValueChanged(value)}
                        style={{flex:1}}></Slider>
                <Text style={styles.videoControlItem}>{duration}</Text>
                <TouchableOpacity onPress={this.videoFullScreen.bind(this)} style={styles.videoControlItem}>
                    <Image source={require('../img/fullscreen.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
    render () {
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=>{this.onVideoPressed()}} style={{alignItems: 'center'}}>
                        <Video
                            {...this.props}
                            ref={ref=>{this.video = ref}}
                            rate={1.0}
                            paused={this.state.paused}
                            onProgress={this.onProgress}
                            onLoad={this.onLoad}
                            onBuffer={this.onBuffer}
                            onPlaybackStalled={this.onPlaybackStalled}
                            onLoadStart={this.onLoadStart}
                            onFullscreenPlayerWillDismiss={()=>{this.onFullscreenPlayerWillDismiss()}}
                            style={[styles.backgroundVideo,this.props.style]}
                        >
                        </Video>
                </TouchableWithoutFeedback>
                {this._renderLoadingIfNeeded()}
                {this._rederVideoPlayButton()}
                {this._renderVideoControls()}
                {this.state.videoControlsShow ? this.props.renderTitle && this.props.renderTitle() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoControls:{
        position:'absolute',
        top: VIDEO_HEIGHT - 30,
        width:WINDOW_WIDTH,
        left:0,
        flexDirection:'row',
        alignItems:'center',
        height:30,
        backgroundColor:"transparent",
    },
    playBtn:{
        top:(VIDEO_HEIGHT-40)/2,
        left:(WINDOW_WIDTH-40)/2,
        width:40,
        height:40,
        position:'absolute'
    },
    videoControlItem:{
        marginHorizontal:10
    }
})

VideoControls.propTypes = {
    title:PropTypes.string,
    renderTitle:PropTypes.func,
    showTitle:PropTypes.bool,
    ...Video.propTypes
}