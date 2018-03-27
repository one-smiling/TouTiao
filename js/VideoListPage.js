import React , {Component}from 'react'
import {View,FlatList,Image,ImageBackground,Text, Dimensions, StyleSheet, TouchableWithoutFeedback,TouchableOpacity,AlertIOS, Slider} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Video from 'react-native-video'
import ProgressCircleSnail from 'react-native-progress/CircleSnail';

import Button from 'react-native-button'

const WINDOW_WIDTH = Dimensions.get('window').width
const VIDEO_ASPECT_RATIO = 16 / 9;
const VIDEO_HEIGHT = WINDOW_WIDTH / VIDEO_ASPECT_RATIO

const fetchUrl = 'https://c.m.163.com/recommend/getChanListNews'
const queryParams = {'channel': 'T1457068979049',
    'subtab': 'Video_Comic',
    'passport': '',
    'devId': 'Yot35DNkCmCjhl+DiPBAEtCw9+TJu7Lh/rwgZSt0OXOajwqSf9r37EcT2ocnU/pA',
    'version': '33.1',
    'spever': 'false',
    'net': 'wifi',
    'lat': 'hz22gEWHhRVC86Sj4K/Ckg==',
    'lon': 'hgi37bA86qxyvamJLQDsSw==',
    'ts': '1519652509',
    'sign': 'M2Y3hkCYcLfWUYz5RGMhywQxOlUESmVBPlenRJoT3hZ48ErR02zJ6/KXOnxX046I',
    'encryption': '1',
    'canal': 'appstore',
    'offset': '0',
    'size': '10',
    'fn': '1'}

class VideoList extends Component {
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
        this.hiddenTimer = null
    }
    state = {
        data:null,
        isLoading:false,
        playIndex:-1,
        playIndexPaused:false,
        videoDuration:0,
        currentTime:0,
        videoControlsShow:false
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let queryString = ''
        for (var key in queryParams) {
            queryString = queryString.concat(key,'=',encodeURI(queryParams[key]),'&')
        }
        fetch(fetchUrl.concat('?',queryString))
            .then(response=>response.json())
            .catch((error)=>{

            })
            .then(response=>{
                this.setState({data:response['视频']})
            })
    }

    renderItem(item) {
        let isPlayIndex = this.state.playIndex === item.index
        let needToPlay = isPlayIndex && !this.state.paused
        if (needToPlay) {
            // console.log('开始播放：'+item.index)
            // ()=>this.setState({playIndex:needToPlay ? -1 : item.index})
        }

        return(
           <View>
               <TouchableWithoutFeedback onPress={()=>{this.onVideoPressed(item)}} style={{alignItems: 'center'}}>
                   {isPlayIndex  ?
                   <Video source={{uri:item.item.mp4_url}}
                        ref={ref=>{this.video = ref}}
                        rate={1.0}
                        paused={!needToPlay}
                          onProgress={this.onProgress}
                          onLoad={this.onLoad}
                          onBuffer={this.onBuffer}
                          onPlaybackStalled={this.onPlaybackStalled}
                          onLoadStart={this.onLoadStart}
                        style={styles.backgroundVideo}>
                   </Video> : <Image source={{uri:item.item.cover}} style={styles.backgroundVideo}/>}


               </TouchableWithoutFeedback>
               {this._renderLoadingIfNeeded(item.index)}
               {isPlayIndex ? this._rederVideoPlayButton() : null}
               {isPlayIndex ? this._renderVideoControls() : null}
               <View>
                   <LinearGradient colors={['black','transparent']} style={{top:0,width:WINDOW_WIDTH,position:'absolute'}}>
                       <Text style={styles.videoTitle}>{item.item.title}</Text>
                   </LinearGradient>
               </View>

               <View style={styles.row}>
                   <Text style={styles.tname}>{item.item.videoTopic.tname}</Text>
                   <View style={[styles.row,{flex:1, justifyContent:'flex-end'}]}>
                       <TouchableOpacity style={[styles.button,{flexDirection:'row',alignItems:'center'}]}>
                           <Image source={require('../image/video_add.png')}/>
                           <Text style={[{justifyContent:'center'},styles.buttonTitle]}>关注</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={[styles.button,{flexDirection:'row',alignItems:'center'}]}>
                           <Image source={require('../image/tab_comment.png')}/>
                           <Text style={styles.buttonTitle}>{item.item.replyCount}</Text>
                       </TouchableOpacity>

                       <TouchableOpacity style={styles.button}>
                           <Image source={require('../image/More.png')}/>
                       </TouchableOpacity>
                   </View>
               </View>
               {isPlayIndex ? null : <Image source={{uri:item.item.cover}} style={styles.avatar}/>}
           </View>
       )

    }

    componentDidUpdate() {
        // console.log('componentDidUpdate')
    }

    onVideoPressed(item) {
        let isPlaying = this.state.playIndex === item.index && !this.state.paused
        let state = this.state
        if (isPlaying) {
            state.videoControlsShow = !state.videoControlsShow
            if (state.videoControlsShow) {
                clearTimeout(this.hiddenTimer)
                this.hiddenTimer = setTimeout(()=>{
                    console.log('timeout')
                    this.setState({videoControlsShow:!this.state.videoControlsShow})
                },3000)
            }

            this.setState(state)
        } else {
            if (this.state.playIndex !== item.index) {

                if (item.index === 2) {
                    console.log('播放异常')
                }
                state.playIndex = item.index
                state.videoDuration = 0
                state.currentTime = 0
            }
            state.paused = isPlaying
            this.setState(state)
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
        if (!this.isSliderDraged) {
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
        this.setState({currentTime:value})
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
                        <Image source={require('../image/FullPlay.png')} style={styles.playBtn}/>
                    </TouchableWithoutFeedback>
                )
            } else  {
                return (
                    <TouchableWithoutFeedback onPress={()=>{this.setState({paused:true})}} style={styles.playBtn}>
                        <Image source={require('../image/FullPause.png')} style={styles.playBtn}/>
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
                                    this.video.seek(parseInt(value))}
                                }
                                onValueChange={(value)=>this.onSliderValueChanged(value)}
                                style={{flex:1}}></Slider>
                        <Text style={styles.videoControlItem}>{duration}</Text>
                    <TouchableOpacity style={styles.videoControlItem}>
                        <Image source={require('./img/fullscreen.png')}/>
                    </TouchableOpacity>
                </View>
        )
    }


    render() {
        return(

            <View>
                <FlatList data={this.state.data}
                          extraData={this.state}
                          renderItem={item=>this.renderItem(item)}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    videoTitle:{
        color:'white',
        fontSize:16,
        margin:10,
        fontWeight: 'bold'
    },
    avatar:{
        position:'absolute',
        width:40,
        height:40,
        top:WINDOW_WIDTH / VIDEO_ASPECT_RATIO-30,
        left:10,
        borderRadius:20,
        backgroundColor:'white'
    },
    tname:{
        paddingHorizontal:10,
        fontWeight: 'bold'
    },
    row: {
        backgroundColor:'white',
        height:40,
        alignItems:'center',
        flexDirection:'row'
    },
    button:{
        marginRight:20
    },
    buttonTitle:{
        fontSize:12,
        color:'black',
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundVideo: {
        top: 0,
        left: 0,
        width:WINDOW_WIDTH,
        height:VIDEO_HEIGHT
    },
    playBtn:{
        top:(VIDEO_HEIGHT-40)/2,
        left:(WINDOW_WIDTH-40)/2,
        width:40,
        height:40,
        position:'absolute'
    },
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
    videoControlItem:{
        marginHorizontal:10
    }
})
export default VideoList
