import React , {Component}from 'react'
import {View,FlatList,Image,ImageBackground,Text, Dimensions, StyleSheet ,Button} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

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
        this.state = {
            data:null
        }
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
       return(
           <View >
               <ImageBackground source={{uri:item.item.cover}} style={{width:WINDOW_WIDTH,height:WINDOW_WIDTH / VIDEO_ASPECT_RATIO,backgroundColor:'blue'}}>
                    <LinearGradient colors={['black','transparent']}
                    >
                        <Text style={styles.videoTitle}>{item.item.title}</Text>
                    </LinearGradient>
               </ImageBackground>

               <View style={styles.row}>
                   <Text style={styles.tname}>{item.item.videoTopic.tname}</Text>
                   <View style={[styles.row,{flex:1, justifyContent:'flex-end'}]}>
                       <Button title="关注" style={{left:0,position:'absolute'}}/>
                       <Button title={`评论:${item.item.replyCount}`} style={{marginRight:30}} />
                       <Button title="..." style={{marginRight:30}}/>
                   </View>
               </View>
               <Image source={{uri:item.item.cover}} style={styles.avatar}/>
           </View>
       )

    }

    render() {
        return(

            <View>
                <FlatList data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
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
    }
})
export default VideoList
