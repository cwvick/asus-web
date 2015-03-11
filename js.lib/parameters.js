var IE6 = ($.browser.msie)&&($.browser.version=='6.0') ? true : false;
var IE7 = ($.browser.msie)&&($.browser.version=='7.0') ? true : false;
var IE8 = ($.browser.msie)&&($.browser.version=='8.0') ? true : false;
var navigatorLang = $.browser.msie? navigator.systemLanguage : navigator.language;                                //瀏覽器語言
/*----------------------------------------------------------目前檔案根目錄------------------------------------------------------------------*/
var root_path=function(){
    	var href=location.pathname;
		var myindex=href.lastIndexOf('/');
		return href.substring(0,myindex);
};
/*----------------------------------------------------------目前檔案名稱--------------------------------------------------------------------*/
var file_name=function(){
	var href=location.pathname;
	var myindex=href.lastIndexOf('/');
	return href.substring(myindex+1,href.length);
};



//var emailReg  = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;           				//email  正規表達式
var emailReg  = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;
var mobileReg = /^09[0-9]{8}$/;                            					//手機號碼 正規表達式
var phoneReg  = /^[0][1-9]{1,2}-([0-9]{7,8})+((#([0-9]){1,5}){0,1})$/;		//電話號碼 正規表達式


/*----------------------------------------------------------檢查是否含中文或是英文--------------------------------------------------------------------*/
function checkSTR(rmessages,type) {
	var i=0;
	
	while (i<rmessages.length) {
	    i++;
	    
	    switch(type){
			case 'zh':{
				if(rmessages.charCodeAt(i)<=128){
			       return false;
			       break;
			    }
				break;
			}
			case 'en':{
				if(rmessages.charCodeAt(i) > 128){
			       return false;
			       break;
			    }
				break;
			}
		}
	    
	    
	}

};


























