
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import React,{Component} from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import VideoList from './VideoListPage'
import { channel } from './Commen/FetchVideo'
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

class HomePage extends Component {

    static navigationOptions = ({ navigation }) => {
      const { state } = navigation
      // Setup the header and tabBarVisible status
      const tabBarVisible = state.params ? state.params.fullscreen : true
      return {
        // For stack navigators, you can hide the header bar like so
        // For the tab navigators, you can hide the tab bar like so
        header: null,
        tabBarVisible,
      }
    }

    constructor(props) {
        super(props)
        this.state = {
            fullscreen:false
        }
    }

    onFullScreen(status) {
        this.setState({
            fullscreen:status
        })
    
        // Set the params to pass in fullscreen status to navigationOptions
        this.props.navigation.setParams({
          fullscreen: !status
        })
    }

    render() {

        const {fullscreen} = this.state
        const height =  fullscreen ? 0 : 64
        const renderTabBarProps = {renderTabBar:()=><ScrollableTabBar page={0} style={{height:height}} tabStyle={styles.tab} underlineStyle={styles.underline}/>}
        return(
               <ScrollableTabView
                    ref={'tabView'}
                    {...renderTabBarProps}
                    tabBarUnderlineStyle={{ height: 2, minWidth:80, backgroundColor: 'rgba(216,30,6,.8)'}}
                    tabBarInactiveTextColor="#515151"
                    tabBarActiveTextColor="#d81e04"
                    tabBarTextStyle={{fontSize: 15}}
                    onChangeTab={(ref)=>{}}
                    onScroll={(postion)=>{}}
                    locked={fullscreen}
                    initialPage={0}
                >
                {
                    channel.map((result,i,arr)=>{
                       return <VideoList 
                       key={i} 
                       {...this.props} 
                        onFullScreen={status => this.onFullScreen(status)}
                       tabLabel={result}/>
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