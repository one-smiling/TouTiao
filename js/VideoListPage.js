import React , {Component}from 'react'
import {
  View,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  StyleSheet, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  AlertIOS, 
  Slider
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ProgressCircleSnail from 'react-native-progress/CircleSnail'
import Video from './Commen/VideoControls'
import {FlatList} from'./Commen/FlatList'
import Button from 'react-native-button'
import PropTypes from 'prop-types'


const Container = ({ children, ...props }) => <View {...props}>{children}</View>

Container.propTypes = {
  children: PropTypes.node.isRequired
}

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
        this._renderVideoTitle = this._renderVideoTitle.bind(this)
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
        videoControlsShow:false,
        fullScreen:false,
        refreshing:true
    }




    

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({refreshing:true})
        let queryString = ''
        for (var key in queryParams) {
            queryString = queryString.concat(key,'=',encodeURI(queryParams[key]),'&')
        }
        fetch(fetchUrl.concat('?',queryString))
            .then(response=>response.json())
            .catch((error)=>{
                this.setState({refreshing:false})
            })
            .then(response=>{
                this.setState({
                  data:response['视频'],
                  refreshing:false,
                  playIndex:-1,
                })
            })
    }

    renderItem(item) {
        let isPlayIndex = this.state.playIndex === item.index
        let needToPlay = isPlayIndex
        if (needToPlay) {
            // console.log('开始播放：'+item.index)
            // ()=>this.setState({playIndex:needToPlay ? -1 : item.index})
        }
        let transform =  this.state.fullScreen ? {transform:  [{ rotate: '90deg'}]} :null
        return(
           <Container>
               {isPlayIndex ?
                   <Video source={{uri: item.item.mp4_url}}
                                  renderTitle={()=>this._renderVideoTitle(item.item.title)}
                                  ref={ref => {
                                      this.video = ref
                                  }}
                                  onFullScreen={this.props.onFullScreen}
                                  rate={1.0}
                                  paused={!needToPlay}
                                  style={[styles.backgroundVideo, transform]}>
                   </Video> :
                   <TouchableWithoutFeedback onPress={() => {
                       this.onVideoPressed(item)
                   }} style={{alignItems: 'center'}}>
                       <Image source={{uri: item.item.cover}} style={styles.backgroundVideo}/>
                   </TouchableWithoutFeedback>

               }
               {isPlayIndex ? null : this._renderVideoTitle(item.item.title)}
               <View style={styles.row}>
                   <Text style={styles.tname}>{item.item.videoTopic.tname}</Text>
                   <View style={[styles.row,{flex:1, justifyContent:'flex-end'}]}>
                       <TouchableOpacity style={[styles.button,{flexDirection:'row',alignItems:'center'}]}>
                           <Image source={require('../image/video_add.png')}/>
                           <Text style={[{justifyContent:'center'},styles.buttonTitle]}>关注</Text>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=>this.goToVideoDetail(item.item)} style={[styles.button,{flexDirection:'row',alignItems:'center'}]}>
                           <Image source={require('../image/tab_comment.png')}/>
                           <Text style={styles.buttonTitle}>{item.item.replyCount}</Text>
                       </TouchableOpacity>

                       <TouchableOpacity style={styles.button}>
                           <Image source={require('../image/More.png')}/>
                       </TouchableOpacity>
                   </View>
               </View>
               {isPlayIndex ? null : <Image source={{uri:item.item.cover}} style={styles.avatar}/>}
           </Container>
       )
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate')
    }

    onVideoPressed(item) {
        if (this.state.playIndex !== item.index) {
            this.setState({playIndex:item.index})
        }
    }
    goToVideoDetail(item) {
        this.props.navigation.navigate('VideoDetail',{item:item})
    }
    _renderVideoTitle(title) {
        return (
            <LinearGradient colors={['black','transparent']} style={{top:0,width:WINDOW_WIDTH,position:'absolute'}}>
                <Text style={styles.videoTitle}>{title}</Text>
            </LinearGradient>
        )
    }


    render() {
        return(
            <View>
                <FlatList data={this.state.data}
                          extraData={this.state}
                          renderItem={item=>this.renderItem(item)}
                          onRefresh={()=>{this.loadData()}}
                          refreshing={this.state.refreshing}
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
