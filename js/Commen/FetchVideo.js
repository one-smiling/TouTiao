

//网易视频
 function fetchNeteaseVideo() {
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
    return fetchData('GET',fetchUrl,queryParams)
}

//今日头条视频
function fetchTouTiaoVideo() {
	const fetchUrl = 'https://is.snssdk.com/api/news/feed/v64/'
	const queryParams = {
		'fp': '22Tqc2L5JYT_FlPqFlU1FYFScMGt',
		'version_code': '6.6.1', 
		'app_name': 'news_article', 
		'vid': 
		'4EEB7381-E9D8-45D0-A00E-D443F53A0DB8', 
		'device_id': '40311630697', 
		'channel': 'App Store', 
		'resolution': '750*1334', 
		'aid': '13', 'ab_version': 
		'297980,295921,298071,298260,286904,229304,300732,300106,298631,283849,301884,301984,285404,295827,302144,299898,239096,301191,170988,300502,294503,302019,301280,286209,281391,299983,297059,276204,285353,257281,302169,302060,277769,301541,295187,295754,296695,301319,259489,284438,295647,240866,280773,301026,298953,185734,300050,300763,251713,298180,299701,290245,289003,299776,297519,282028,258356,247850,280448,281292,249045,297320,210684,275610,298572,301153,283491,296955,299191,288417,282702,290190,260653,241181,299542,302153,271178,299557,252768,249828,246859', 
		'ab_feature': 'z1',
		'openudid': 
		'09d3ae08b54f8d1f34c7e3984b38a479123db390', 
		'pos': '5pe9vb%252F%252B9Onkv72nvb94EQp5JzG%252FsZe9vb%252Fx8vP69Ono%252Bfi%252Fvae9rKyrs6%252BlpaytrqikqKqlq6mxl729v%252FH86fTp6Pn4v72nva6ks6SpqaWtqKitraWopKill%252BA%253D', 
		'idfv': '4EEB7381-E9D8-45D0-A00E-D443F53A0DB8', 
		'ac': 'WIFI', 
		'os_version': '10.3.3', 
		'ssmix': 'a', 
		'device_platform': 'iphone', 
		'iid': '27826792193', 'ab_client': 'a1,f2,f7,e1', 
		'device_type': 'iPhone 6S', 
		'idfa': 'E5DD54EC-2B51-404D-B65A-119CE6574FFE', 
		'detail': '1', 
		'category': 'subv_voice', 
		'last_refresh_sub_entrance_interval': '5', 
		'list_entrance': 'main_tab', 
		'tt_from': 'pull', 
		'count': '20', 
		'loc_mode': '1', 
		'LBS_status': 'authroize', 
		'cp': '5eA7B605B4DDAq1', 
		'min_behot_time': '1521532371', 
		'image': '1', 
		'strict': '0', 
		'language': 'zh-Hans-CN', 
		'refer': '1', 
		'as': 'a2f54bbb99bd2aad905333', 
		'ts': '1521532377'}

		return fetchData('GET',fetchUrl,queryParams)
}

//腾讯新闻
function fetchTencentVideo() {
	const fetch_url = 'http://r.inews.qq.com/getQQNewsUnreadList'
	const query_params = {'idfa': 'E5DD54EC-2B51-404D-B65A-119CE6574FFE',
          'apptype': 'ios',
          'screen_height': '667',
          'network_type': 'wifi',
          'store': '1',
          'activefrom': '',
          'global_info': '0%7C1%7C0%7C0%7C1%7C2%7C1%7C',
          'screen_scale': '2',
          'adcode': '110108', 'screen_width': '375',
          '__qnr': '204650117040',
          'isJailbreak': '0',
          'qqnews_refpage': 'QNLaunchWindowViewController',
          'omgid': '2d00223e23d3e940809ba7a144bedb27127a0010112a0a',
          'device_model': 'iPhone8%2C1',
          'startFrom': 'icon',
          'startarticleid': '',
          'devid': '711AA5D0-68F1-474C-B42E-3F5D1897AB55',
          'omgbizid': '8cf99c0bbceab143c89904f9692877d6679a006011311c',
          'appver': '10.3.3_qqnews_5.5.40'}

	const post_datas = {'chlid': 'news_video_child_recommend',
              'forward': '0',
              'uid': '038C819B-66E6-4D09-96C4-540E1C8598B4',
              'lon': '116.2940028211806',
              'kankaninfo': {"gender": 1, "lastExp": 1, "refresh": 0, "scene": 0, "latitude": 39.94594102647569, "lonitude": 116.2940028211806},
              'channelPosition': '0',
              'lat': '39.94594102647569',
              'rendType': 'kankan',
              'page': '0'}

    const headers = {'Content-Type':"application/x-www-form-urlencoded"}


    return fetchData('POST',fetch_url,query_params,jsonToQueryString(post_datas), headers)
}


//天天快报
function fetchTianTianVideo() {
	const fetch_url = 'https://r.cnews.qq.com/getSubNewsChlidInterest'
 const query_params = {'qqnetwork': 'wifi',
                'omgbizid': 'da0bb8818e47564d1b09365e2a707837b7910090113207',
                'appver': '10.3.3_qnreading_4.6.70',
                'apptype': 'ios',
                'screen_height': '667',
                'logfrom': '0',
                'ssid': '906',
                'store': '1',
                'apptypeExt': 'qnreading',
                'appversion': '4.6.70',
                'currentTab': 'video',
                'muid': '147128994724807733',
                'activefrom': 'icon',
                'screen_scale': '2',
                'screen_width': '375',
                '__qnr': '2050cb96533f',
                'isJailbreak': '0',
                'mac': '020000000000',
                'commonGray': '1_3|2_0|12_1',
                'idfv': '711AA5D0-68F1-474C-B42E-3F5D1897AB55',
                'omgid': '2d00223e23d3e940809ba7a144bedb27127a0010112a0a',
                'device_model': 'iPhone8,1',
                'startarticleid': '',
                'devid': '711AA5D0-68F1-474C-B42E-3F5D1897AB55',
                'qimei': '711aa5d0-68f1-474c-b42e-3f5d1897ab55',
                'idfa': 'E5DD54EC-2B51-404D-B65A-119CE6574FFE'}


const post_datas = {'uid': '4DF51B85-608D-459B-9442-A9DD15CF1C68',
              'chlid': 'kb_video_news',
              'netType': '1',
              'longitude': '0',
              'wifi_ssid': '906',
              'latitude': '0',
              'last_id': '20180301V09W3400',
              'mode': 'iPhone8,1',
              'is_wap': '1',
              'sessionid': '',
              'adcode': '',
              'page': '23',
              'kankaninfo': {"gender":1,"manualRefresh":1,"scene":0,"realTimeVideoData":{"lastestThreeSetsData":[{"startTime":1520472146978.983,"idStr":"b0545f0u1s8","algid":"102040","aid":"20180203V15NQ700","channelId":"kb_video_news","duration":22338.56030273438},{"startTime":1520472174998.559,"idStr":"g0548nebvs9","algid":"102022","aid":"20180207V1DF0P00","channelId":"kb_video_news","duration":7552.56396484375},{"startTime":1520472182796.519,"idStr":"f0558ok395r","algid":"102022","aid":"20171007V04ZTB00","channelId":"kb_video_news","duration":1417.607177734375}],"lastestRefreshExposeData":[{"idStr":"g0565tx4fou","algid":"102001","aid":"20180304V0MF7U00","channelId":"kb_video_news","exposureTime":1520473104164.382},{"idStr":"d0559gqdtfk","algid":"102001","aid":"20180226V13BD300","channelId":"kb_video_news","exposureTime":1520473104165.06}],"lastestRefreshPlayData":[]},"lastExp":6,"refresh":0,"needCollect":1},
              'forward': '0',
              'cachedCount': '15'}

const headers = {
    'mac': "020000000000",
    'deviceToken': "<77a4a3e1 34423462 0ec83b40 0b52e4e1 d32dfb19 20dce82c 951892c3 c6cf2855>",
    'qn-rid': "0A7AD17E-7A26-46C4-8862-B5A08C97B39F",
    'muid': "147128994724807733",
    'qqnetwork': "wifi",
    'qn-sig': "4751B7B3B4511F03EFD29294A2A71FBC",
    'svqn': "1_4",
    'Accept-Encoding': "gzip, deflate",
    'Cookie': "logintype=2",
    'unixtimesign': "1520473110",
    'lastCheckCardType': "0",
    'omghost': "r.cnews.qq.com",
    'qimei': "711aa5d0-68f1-474c-b42e-3f5d1897ab55",
    'omgbizid': "da0bb8818e47564d1b09365e2a707837b7910090113207",
    'Referer': "http://r.cnews.qq.com/inews/iphone/",
    'screen-height': "667",
    'commonGray': "1_3|2_0|12_1",
    'logfrom': "0",
    '--qnr': "2050cb96f358",
    'Accept-Language': "zh-Hans-CN;q=1",
    'omgid': "2d00223e23d3e940809ba7a144bedb27127a0010112a0a",
    'idfa': "E5DD54EC-2B51-404D-B65A-119CE6574FFE",
    'screen-scale': "2",
    'idfv': "711AA5D0-68F1-474C-B42E-3F5D1897AB55",
    'screen-width': "375",
    'Connection': "keep-alive",
    'Content-Type': "application/x-www-form-urlencoded",
    'isJailbreak': "0",
    'snqn': "qRz%2BkHnS%2FlbsGGj11fE3kBqnm%2BsbvdNEDskaPQ2tFXOq5YGh32646yLQTIp5Kj67%0D%0AjLiWiqkVgrFKumX8OiLfPz8nCk%2FejbPeXtm3xsYjrFRzTOqEcFYyry7htb4QyALM",
    'appver': "10.3.3_qnreading_4.6.70",
    'store': "1",
    'apptypeExt': "qnreading",
    'ssid': "906",
    'appversion': "4.6.70",
    'devid': "711AA5D0-68F1-474C-B42E-3F5D1897AB55",
    'activefrom': "icon",
    'currentTab': "video",
    'kingCardType': "0",
    'device-model': "iPhone8,1",
    'apptype': "ios",
    'Cache-Control': "no-cache",
    }

    return fetchData('POST',fetch_url,query_params,jsonToQueryString(post_datas) ,headers)
}


//一点咨询
function fetchYiDianVideo() {
	const fetch_url = 'https://124.243.238.17/Website/channel/news-list-for-channel'
const query_params = {'cend': '30',
                'channel_fake': 'suggest',
                'channel_id': '101310807700',
                'cstart': '0', 'fields[]': 'down',
                'group_fromid': 'g184',
                'infinite': 'true',
                'refresh': '1',
                'version': '020600',
                'distribution': 'com.apple.appstore',
                'appid': 'yidian',
                'cv': '4.6.1.6',
                'platform': '0',
                'net': 'wifi',
                'reqid': 'auv72cpl_1520405797379_37'}

	const post_datas = {'appid': 'yidian',
              'clientInfo[deviceInfo][device]': '',
              'clientInfo[deviceInfo][iosVersion]': '10.3.3',
              'clientInfo[deviceInfo][model]': 'iPhone',
              'clientInfo[deviceInfo][screenDensity]': '',
              'clientInfo[deviceInfo][screenHeight]': '1334',
              'clientInfo[deviceInfo][screenResolution]': '',
              'clientInfo[deviceInfo][screenWidth]': '750',
              'clientInfo[userInfo][appVersion]': '4.6.1.6',
              'clientInfo[userInfo][country]': 'CN',
              'clientInfo[userInfo][ifa]': '5fc09d9bef16df6be9efa1590ce9a2d3',
              'clientInfo[userInfo][language]': 'zh-Hans',
              'clientInfo[userInfo][mac]': '',
              'clientInfo[userInfo][plainIfa]': 'E5DD54EC-2B51-404D-B65A-119CE6574FFE',
              'clientInfo[userInfo][region]': '中国',
              'clientInfo[userInfo][serviceProvider]': '中国移动',
              'cv': '4.6.1.6',
              'distribution': 'com.apple.appstore',
              'net': 'wifi',
              'platform': '0',
              'reqid': 'auv72cpl_1520405797379_37',
              'version': '020600'}
    const headers = {
	    "Cookie": "JSESSIONID=BJ2HIYzm3pqoPusbAtA9rg",
        "Content-Type": "application/x-www-form-urlencoded"
	}

    return fetchData('POST',fetch_url,query_params,jsonToQueryString(post_datas),headers)
}

function jsonToQueryString(json) {
    return Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

function fetchData(method,url,queryParams,body,headers) {
    let queryString = url + "?" + jsonToQueryString(queryParams)
	if (method === 'GET') {
		return fetch(queryString)
	} else if (method === 'POST') {
		return fetch(queryString,{
			method:'POST',
			headers:headers,
			body:body
		})
	}
}

const channel = ['网易新闻','腾讯新闻','一点资讯','天天快报']
const channelFetch = {
	'网易新闻':fetchNeteaseVideo,
	'腾讯新闻':fetchTencentVideo,
	'一点资讯':fetchYiDianVideo,
	'天天快报':fetchTianTianVideo,
}


export { fetchNeteaseVideo,channel,channelFetch}