import React , {Component}from 'react'
import {View,FlatList,Image,ImageBackground,Text, Dimensions, StyleSheet, TouchableOpacity,  AlertIOS,} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Video from 'react-native-video'
import * as Progress from 'react-native-progress';

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

    }
    state = {
        data:null,
        playIndex:-1
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
        let needToPlay = this.state.playIndex === item.index ? true : false
        if (needToPlay) {
            console.log('开始播放：'+item.index)
        }

        return(
           <View>
               <TouchableOpacity onPress={()=>{this.setState({playIndex:needToPlay ? -1 : item.index })}}>
                   <Video source={{uri:item.item.mp4_url}}
                        ref={ref=>{this.video = ref}}
                        rate={1.0}
                        paused={!needToPlay}
                        poster={item.item.cover}
                        style={styles.backgroundVideo}/>
                   {this._renderLoadingIfNeeded(item.index)}
               </TouchableOpacity>
               {/*<ImageBackground source={{uri:item.item.cover}} style={[{width:WINDOW_WIDTH,height:WINDOW_WIDTH / VIDEO_ASPECT_RATIO,backgroundColor:'blue'},styles.center]}>*/}
                   {/*<Image source={require('../image/Play.png')}/>*/}
               {/*</ImageBackground>*/}
               <LinearGradient colors={['black','transparent']} style={{top:0,width:WINDOW_WIDTH,position:'absolute'}}>
                   <Text style={styles.videoTitle}>{item.item.title}</Text>
               </LinearGradient>
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
               <Image source={{uri:item.item.cover}} style={styles.avatar}/>
           </View>
       )

    }

    _renderLoadingIfNeeded(playingIndex) {
        if (playingIndex !== this.state.playIndex) return null
        return (
            <Progress.Circle size={30} indeterminate={true} />
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
})
export default VideoList
