
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import React,{Component} from 'react'
import {StyleSheet,} from 'react-native'
import VideoList from './VideoListPage'

const channel = ['今日头条','腾讯新闻','一点资讯','天天快报','UC头条']

class HomePage extends Component {

    static navigationOptions = {
        header: 'none',
    };

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ScrollableTabView
                tabBarUnderlineStyle={styles.underline}
                tabBarInactiveTextColor='black'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor='red'
                renderTabBar={()=><ScrollableTabBar page={0} style={{height:64}} tabStyle={styles.tab} underlineStyle={styles.underline}/>}>
                {
                    channel.map((result,i,arr)=>{
                       return <VideoList key={i} {...this.props}  tabLabel={result}/>
                    })
                }
            </ScrollableTabView>

        )
    }
}

const styles = {
    underline:{
        height:2,
        backgroundColor:'white'
    },
    tab:{top:30,height:34}
}

export default HomePage