# TouTiao
获取各大新闻客户端的推荐视频，仿今日头条界面，使用RN编写

![](https://raw.githubusercontent.com/one-smiling/TouTiao/master/toutiao_demo.gif)

# 功能
* 支持iOS和Android
* 在react-navigation下进行视频全屏
* 支持单独页面视频全屏
* 支持在FlatList中播放并全屏

# 使用
```
cd TouTiao
npm install
react-native run-ios
```

**注意**：一点资讯接口需要使用HTTPS,install完成后需要在`RCTNetwork.xcodeproj`工程下的`RCTHTTPRequestHandler.mm`文件中添加


```
- (void)URLSession:(NSURLSession *)session didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
  completionHandler(NSURLSessionAuthChallengeUseCredential, [NSURLCredential credentialForTrust:challenge.protectionSpace.serverTrust]);
}
```

# To Do
- [x] 网易新闻 
- [x] 腾讯新闻
- [x] 一点资讯  
- [x] 天天快报  
- [ ] UC头条  
- [ ] 今日头条  






