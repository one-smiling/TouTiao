/**
 * Created by lushuai on 2018/3/29.
 */
import React,{Component} from 'react'
import {
    View,
    Image,
    Text,
    Animated, 
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Slider
  } from 'react-native'
import PropTypes from 'prop-types';
import Video from 'react-native-video'
import ProgressCircleSnail from 'react-native-progress/CircleSnail'
import Orientation from 'react-native-orientation'

const Win = Dimensions.get('window')
const WINDOW_WIDTH = Win.width
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
        this.onRotated = this.onRotated.bind(this)

        this.isSliderDraged = false
        this.isFullScreen = false
        this.hiddenTimer = null
        this.animInline = new Animated.Value(Win.width * 0.5625)
        this.animFullscreen = new Animated.Value(Win.width * 0.5625)

    }
    state = {
        isLoading:false,
        videoDuration:0,
        currentTime:0,
        videoControlsShow:false,
        paused:this.props.paused,
        fullScreen:false,
        inlineHeight: Win.width * 0.5625,

    }
    componentDidMount() {
        Dimensions.addEventListener('change', this.onRotated)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onRotated)
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

    onRotated({ window: { width, height } }) {
        // Add this condition incase if inline and fullscreen options are turned on
        const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT'

          if (orientation === 'LANDSCAPE') {
            this.setState({ fullScreen: true }, () => {
              this.animToFullscreen(height)
              this.props.onFullScreen(this.state.fullScreen)
            })
            return
          }
          if (orientation === 'PORTRAIT') {
            this.setState({
              fullScreen: false,
              paused:this.state.paused
            }, () => {
              this.animToInline()
              this.props.onFullScreen(this.state.fullScreen)
            })
            return
          }
        if (this.state.fullScreen) this.animToFullscreen(height)
    }

    videoFullScreen() {
    this.setState({ fullScreen: !this.state.fullScreen }, () => {
      Orientation.getOrientation((e, orientation) => {
        if (this.state.fullScreen) {
          const initialOrient = Orientation.getInitialOrientation()
          const height = orientation !== initialOrient ?
            Win.width : Win.height
          this.animToFullscreen(height)
          this.props.onFullScreen(this.state.fullScreen)
          Orientation.lockToLandscape()
        } else {
          this.animToInline()
          this.props.onFullScreen(this.state.fullScreen)
          Orientation.lockToPortrait()
        }
      })
    })
    }

    animToFullscreen(height) {
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: height, duration: 200 }),
      Animated.timing(this.animInline, { toValue: height, duration: 200 })
    ]).start()
    }

    animToInline(height) {
    const newHeight = height || this.state.inlineHeight
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: newHeight, duration: 100 }),
      Animated.timing(this.animInline, { toValue: this.state.inlineHeight, duration: 100 })
    ]).start()
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

    _renderVideoControls() {
        const {
            videoControlsShow,   
            fullScreen,
            isLoading,
            paused,
            currentTime
        } = this.state

        const width = fullScreen ? Win.height : Win.width

        const playPosition = {
            top:(width / VIDEO_ASPECT_RATIO - 40)/2,
            left:(width-40)/2
        }
        if (!videoControlsShow||isLoading ) return null

        let sliderProps = this.isSliderDraged ? null : {value:currentTime}
        let current = this.getTimeForSecond(parseInt(currentTime))

        let duration = this.getTimeForSecond(this.state.videoDuration)

        return (
            <View style= {{...StyleSheet.absoluteFillObject,zIndex: 99}}>
                <TouchableWithoutFeedback onPress={()=>{this.setState({paused:!paused})}} >
                    <Image source=  {paused ? require('../../image/FullPlay.png') : require('../../image/FullPause.png')} style={[styles.playBtn,playPosition]}/>
                </TouchableWithoutFeedback>
                <View style={[styles.bottomBar,{width:fullScreen ? Win.height : Win.width}]}>
                    <Text ref={(ref)=>this.currentTimeText = ref} style={[styles.videoControlItem,{width:40}]}>{current}</Text>
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
                    <TouchableOpacity onPress={()=>this.videoFullScreen()} style={styles.videoControlItem}>
                        <Image source={require('../img/fullscreen.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render () {
        const {
            fullScreen,
            paused,
            inlineHeight,
        } = this.state

        const {
              style,
          } = this.props

        const inline = {
          height: inlineHeight,
          alignSelf: 'stretch'
        }

        return (
            <Animated.View
                style={[
                  styles.background,
                  fullScreen ?
                    (styles.fullScreen, { height: this.animFullscreen })
                    : { height: this.animInline },
                  fullScreen ? null : style
                ]}
                >
                <TouchableWithoutFeedback onPress={()=>{this.onVideoPressed()}}>
                <Video
                            {...this.props}
                            ref={ref=>{this.video = ref}}
                            rate={1.0}
                            paused={paused}
                            onProgress={this.onProgress}
                            onLoad={this.onLoad}
                            onBuffer={this.onBuffer}
                            onPlaybackStalled={this.onPlaybackStalled}
                            onLoadStart={this.onLoadStart}
                            style={fullScreen ? styles.fullScreen : inline}

                        >
                        </Video>
                </TouchableWithoutFeedback>
                {this._renderLoadingIfNeeded()}
                {this._renderVideoControls()}
            </Animated.View>

        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        ...StyleSheet.absoluteFillObject
    },

    fullscreenVideoControls: {
        top: Win.height - 60,
        width:Win.height,
        left:0,
        flexDirection:'row',
        alignItems:'center',
        height:30,
        backgroundColor:"blue",
    },
    bottomBar:{
        position:'absolute',
        bottom:0,
        flexDirection: 'row',
        height: 30,
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems:'center',

        // backgroundColor:"transparent",

    },
    playBtn:{
        width:40,
        height:40,
        position:'absolute'
    },
    videoControlItem:{
        marginHorizontal:10
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 98
  },
})

VideoControls.propTypes = {
    onFullScreen: PropTypes.func,
    title:PropTypes.string,
    renderTitle:PropTypes.func,
    showTitle:PropTypes.bool,
    ...Video.propTypes
}

VideoControls.defaultProps = {
    onFullScreen: () => {},
}
