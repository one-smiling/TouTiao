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
import {connect} from  'react-redux'
import PropTypes from 'prop-types'
import {fetchNeteaseVideo,channelFetch} from './Commen/FetchVideo'
import {VIDEO_URL,PAUSE_ACTION,PLAY_ACTION} from './Actions/reducers'


const Container = ({ children, ...props }) => <View {...props}>{children}</View>

Container.propTypes = {
  children: PropTypes.node.isRequired
}

const WINDOW_WIDTH = Dimensions.get('window').width
const VIDEO_ASPECT_RATIO = 16 / 9;
const VIDEO_HEIGHT = WINDOW_WIDTH / VIDEO_ASPECT_RATIO

class VideoList extends Component {
    constructor(props) {
        super(props)
        this._renderVideoTitle = this._renderVideoTitle.bind(this)
        this.onVideoPressed = this.onVideoPressed.bind(this)
        // this.getVideoURL = this.getVideoURL.bind(this)
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


    onHandleChangeTab = ({i})=> {
        this.props.resetVideo()
    }

    getVideoURL(videos) {

        if (videos === undefined || videos.length == 0) {
            return '.p703.1.mp4'
        }
        videos.sort((item1,item2)=>{
            return item1.fs > item2.fs
        })

        let url = videos[0]

        switch(url.name) {
            case 'shd':return '.p701.1.mp4'
            case 'hd':return '.p701.1.mp4'
            default:return '.p703.1.mp4'
        }
    }

    loadData() {
        this.setState({refreshing:true})
        let _this = this;

        const fetchFunc = channelFetch[this.props.tabLabel]
        if (fetchFunc) {
          fetchFunc()
            .then(response=>response.json())
            .catch((error)=>{
              this.setState({refreshing:false})
                console.log(error)
          })
            .then(response=>{
                let data = []
                switch(this.props.tabLabel) {
                  case '网易新闻':{
                      data = response['视频']
                      response['视频'].forEach(function (value) {
                          value.tname = value.videoTopic.tname
                          data.push(value)
                      })
                  }
                      break
                  case '腾讯新闻':{
                      let newsList = response['newslist']
                      Object.values(newsList).map(function(value) {
                          let item = {}
                          let video = value['video_channel']['video']
                          let videoUrl = 'http://120.198.235.230/ugcyd.qq.com/' + video['vid'] + _this.getVideoURL(video['formatlist'])
                          item.mp4_url = videoUrl
                          item.cover = video['img']
                          item.tname = value['chlname']
                          item.title = value['title']
                          item.replyCount = value['comments']
                          data.push(item)
                      });
                  }
                      break
                  case '一点资讯':{
                      let newsList = response['result']
                      newsList.forEach((newsData)=> {
                          let item = {}
                          let videoURLs = newsData['video_urls']
                          if (videoURLs) {
                              item.mp4_url = videoURLs.sort((item1,item2)=> item1.size>item2.size)[0].url
                          } else {
                              console.log(newsData)
                              return
                          }
                          item.cover = ''
                          // item.cover = newsData['image']
                          item.tname = newsData['source']
                          item.title = newsData['title']
                          item.replyCount = newsData['comment_count']
                          data.push(item)
                      })
                  }
                      break
                  case '天天快报':{
                      let videos = response['kankaninfo']['videos']
                      let newslist = response['newslist']
                          videos.forEach((video,index)=> {
                          let item = {}
                          let videoUrl = 'http://120.198.235.230/ugcyd.qq.com/' + video['id'] + _this.getVideoURL(video['formatlist'])
                          item.mp4_url = videoUrl
                          item.cover = video['imageurl']
                          item.tname = newslist[index]['chlname']
                          item.title = video['title']
                          item.replyCount = video['cmtnum']
                          data.push(item)
                      })


                  }
                      break
                    default:
                        console.log('数据为空')
                }
                this.setState({
                    data:data,
                    refreshing:false,
                    playIndex:-1,
                })



     
            })
        }
    }

    renderItem(item) {
        let isPlayIndex = this.state.playIndex === item.index && this.props.playingURL === item.item.mp4_url
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
                   <TouchableWithoutFeedback onPress={() => {this.onVideoPressed(item)}} style={{alignItems: 'center'}}>
                       <View>
                           <Image source={{uri: item.item.cover}} style={styles.backgroundVideo}/>
                           <Image source={require('../image/FullPlay.png')} style={styles.playBtn}/>
                       </View>
                   </TouchableWithoutFeedback>
               }

               {isPlayIndex ? null : this._renderVideoTitle(item.item.title)}
               <View style={styles.row}>
                   <Text style={styles.tname}>{item.item.tname}</Text>
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
        this.props.navigation.dispatch({type:PLAY_ACTION})
        this.props.navigation.dispatch({type:VIDEO_URL,url:item.item.mp4_url})
        if (this.state.playIndex !== item.index) {
            this.setState({playIndex:item.index})
        }
    }
    goToVideoDetail(item) {
        this.props.resetVideo()
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
                          keyExtractor={(item,index) => String(index)}
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

VideoList.propTypes = {
    index:PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
    return {
        playingURL:state.videoInfo.playingURL,
        paused:state.videoInfo.paused
    }
}

const mapDispatchToProps = (dispatch,getState,ownProps)=> {
    return {
        resetVideo:(url)=>dispatch({type:VIDEO_URL,url:url})
    }
}

export default connect(mapStateToProps,mapDispatchToProps,null,{withRef: true})(VideoList)
