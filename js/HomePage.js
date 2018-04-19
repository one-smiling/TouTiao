
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import React,{Component} from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import VideoList from './VideoListPage'
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const channel = ['今日头条','网易新闻','腾讯新闻','一点资讯','天天快报','UC头条']

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
                    ref={'tabView'}
                    renderTabBar={()=><ScrollableTabBar page={0} style={{height:64}} tabStyle={styles.tab} underlineStyle={styles.underline}/>}
                    tabBarUnderlineStyle={{ height: 2, minWidth:80, backgroundColor: 'rgba(216,30,6,.8)'}}
                    tabBarInactiveTextColor="#515151"
                    tabBarActiveTextColor="#d81e06"
                    tabBarTextStyle={{fontSize: 15}}
                    onChangeTab={(ref)=>{}}
                    onScroll={(postion)=>{}}
                    locked={false}
                    initialPage={0}
                >
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
    tab:{
        top:20,
        height:34,
    }
}

export default HomePage