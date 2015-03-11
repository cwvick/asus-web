var BROWSER={
    versions:function(){
    	   
	    	var mobiles = new Array
	    	(
	    	    "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
	    	    "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
	    	    "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
	    	    "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
	    	    "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
	    	    "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
	    	    "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
	    	    "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
	    	    "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
	    	    "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
	    	    "s8000", "bada", "googlebot-mobile","ipad"
	    	)
	
	    	var ua = navigator.userAgent.toLowerCase();
	    	var isMobile = false;
	    	for (var i = 0; i < mobiles.length; i++) {
	    		if (ua.indexOf(mobiles[i]) > 0) {
	    			isMobile = true;
	    			break;
	    		}
	    	}
    	   
           var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1,                                         //IE内核
                presto: u.indexOf('Presto') > -1,                                           //opera内核
                webKit: u.indexOf('AppleWebKit') > -1,                                      //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,                 //火狐内核
                //mobile: (!!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/)) && !u.match(/Windows.*NT.*/), //是否为移动终端
                mobile: isMobile,                                                           //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                            //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,              //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,                  //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1,                                               //是否iPad
                iPod: u.indexOf('iPod') > -1,
                webApp: u.indexOf('Safari') == -1                                           //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}