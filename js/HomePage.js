
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import React,{Component} from 'react'
import {View} from 'react-native'
import VideoList from './VideoListPage'

const channel = ['今日头条','腾讯新闻','一点资讯','天天快报','UC头条']

class HomePage extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return(
            <ScrollableTabView
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor='red'
                renderTabBar={()=><ScrollableTabBar style={{height:64}}/>}>
                {
                    channel.map((result,i,arr)=>{
                       return <VideoList key={i} tabLabel={result}/>
                    })
                }
            </ScrollableTabView>

        )
    }
}

export default HomePage