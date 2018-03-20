import React , {Component}from 'react'
import {View,FlatList,Image,Text} from 'react-native'

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
       return( <View >
            <Image source={{uri:item.item.cover}} style={{width:320,height:200,backgroundColor:'bblue'}}/>
            <Text>{item.item.title}</Text>
        </View>)

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

export default VideoList