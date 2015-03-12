var $win = $(window);
var _se6ScrollProp = 0.73,
    _se6ScrollHeight = 725,
    _scrollFlag = false;
var _sectionSize,
    indexTxtSize,
    palyAni,
    scrollFunction,
    se_full_foto;

var _loading = false;
var _fullhover = false;
var _sectionAni = false;
var _fullFotoWidth = 1920,
    _fullFotoHeight = 996;

// IE versions
var IE = BROWSER.versions.trident,
    IE8over = IE && parseFloat($.browser.version) > 8,
    _isIE8;

if(IE == true && IE8over == true || IE == false && IE8over == false){
    _isIE8 = false;
}else if(IE == true && IE8over == false){
    _isIE8 = true;
}

$(function () {
    // alert(_isIE8);

    // Setting Current Page
    var _initPage = parseInt($('#wrapper').attr('curPage') ,10);

    // loading
    function loading() {
        var imgSize = $("#imagesLoading img").size();
        var imgCount = 0;
        var percent = 0;
    
        loadingReset();

        $('.loading_bg').css({
            top:'50%',
            left:'50%',
            marginLeft : ($win.width()/2)*-1,
            marginTop : ($win.width()/2+30)*-1,
            width :$win.width(),
            height: $win.width()
        });

        $("#imagesLoading img").one("load", function() {
            imgCount++;
            percent = ( imgCount / (imgSize+1) ) * 100;
            
            $(".loading_bar").css({"width":percent + "%"});

            if ( imgCount == $("#imagesLoading img").size() ) {
                TweenMax.to('.loading_bg' ,.6 ,{delay:1 ,scale:0 ,borderRadius: '50%' ,ease:Back.easeOut ,onComplete:function(){ 
                    _sectionAni = true;
                    init(_sectionAni);
                    setTimeout(function(){ $('#loading').hide(); },500);
                }});
                TweenMax.to('.loading_bar' ,.2 ,{delay:1 ,autoAlpha:0});
                TweenMax.to('.loading_logo' ,.5 ,{delay:1 ,scale:.5 ,autoAlpha:0 ,ease:Back.easeOut});
            }

        }).each(function() {
            if(this.complete) {
                $(this).load();
            } 
        });

    }


    function loadingReset(){
        _sectionAni = false;
        
        $('#loading').show();

        TweenMax.set('.loading_bg' ,{scale:1 ,borderRadius: '0'});
        TweenMax.set('.loading_bar' ,{autoAlpha:1});
        TweenMax.set('.loading_logo' ,{scale:1 ,autoAlpha:1});
    }
    
    loading();



    /* 
    ------------------------------------------------------------------------------------------------------------------------
    0. Base Function
    ------------------------------------------------------------------------------------------------------------------------
    */

    // base object
    var $wrapper = $('#wrapper'),
        $pagination = $('.pagination'),
        $paginationLi = $pagination.find('li'),
        _sectionLength = $('.section').length-1,
        pageHash = ['2-in-1','Power','Razor-Thin','Super-Light','Picture-Perfect','Chi-Series','Life'];

    var _mouse = false;
    var _minPage = 0 , _maxPage = _sectionLength;
    var _a;
    
    // **************** Init *******************//
    // ****************************************//
    function init(aniFlag) {
        if(aniFlag){
            //Hash 
            for (var i = 0; i<pageHash.length; i++) {
                if(pageHash[i] == window.location.hash.slice(1) || window.location.hash.slice(1) == ''){
                    movePage(i);
                    _initPage = i;
                }
            }
            // console.log('進入init:'+_initPage);

            var _curPage = _initPage;
            var _setWrap = $wrapper.attr('curPage',_initPage);
            var _curWrap = parseInt($wrapper.attr('curPage') ,10);

            window.location.hash = '#'+pageHash[_initPage];

            $('.section').removeClass('hide');

            windowResise();
        }
    }

    

    // section size
    _sectionSize = function(){
        var _curPage = parseInt($wrapper.attr('curPage') ,10);

        $wrapper.css({
            position:'absolute' ,
            left:0,
            top : Math.floor($win.height() * _curPage) *-1,
            width : $win.width(),
            height : Math.floor($win.height() * _sectionLength)
        });

        $('.section').css({
            width : $win.width(),
            height : $win.height()
        });
    };


    // body MouseWheel
    $('body').on('mousewheel', function(event) {
        var _m = event.deltaY ,e;
        if(_mouse == false){
            if(_m < 0){
                e = 1;
            }else if(_m > 0){
                e = -1;
            }

            sectoinCheckPage(e);
        }
    });


    // 確認滾動的頁數
    function sectoinCheckPage(e){
        _mouse = true;
        if(_mouse){
            var _curPage = parseInt($wrapper.attr('curPage') ,10);
                _curPage = _curPage + e;

                if(_curPage < _minPage){
                    _curPage = _minPage;
                }else if(_curPage > _maxPage){
                    _curPage = _maxPage;
                }

                movePage(_curPage);
        }
    }

    

    // 移動場景
    function movePage(_curPage){
        oldAni = parseInt($wrapper.attr('curpage') ,10);
        var oldStop = oldAni;
        var newPlay = _curPage;
        $wrapper.attr('curPage',_curPage);
        
        window.location.hash = '#' + pageHash[_curPage];

        TweenMax.to($wrapper ,.8 ,{top: ($win.height() *_curPage)*-1 ,ease:Power1.easeOut ,onComplete:function(){
            if(_isIE8){
                pausedAni();
            }else{
                stopAni(oldStop);
                playAni(newPlay);
            }

            setTimeout(function(){
                _mouse = false;
            },1000)
        }});
        
        $paginationLi.removeClass('select');
        $paginationLi.eq(_curPage).addClass('select');
        $('#navi li').removeClass('select');
        $('#navi li').eq(_curPage).addClass('select');

        if(_curPage != 5){
            // console.log('hideInfo')
            hideInfo();
        }

        if(_curPage == 6){
            $('body').addClass('baseWhite');
        }else{
            $('body').removeClass('baseWhite');
        }
    }


    // 移動至指定頁數
    $paginationLi.click(function(e) {
        e.preventDefault();
        clickGoPage($(this));
    });

    // 移動至指定頁數
    $('#navi li').click(function(e) {
        e.preventDefault();
        clickGoPage($(this));
    });

    // 移動至指定頁數
    function clickGoPage(e){
        var goPage = e.index();
        if(goPage <= _maxPage){
            movePage(goPage);
        }
    }

    // 移動到Section 2
    $('.btn_se1_more').click(function(e){
        e.preventDefault();
        movePage(1);
    });


    // 視窗變化時跑回原先位置
    $win.resize(function(){
        var _in = parseInt( $('#wrapper').attr('curPage') ,10);
        // console.log(_in);
        $('#wrapper').css({
            top: -($win.height() *_in)
        });
    });



    /* 
    ------------------------------------------------------------------------------------------------------------------------
    Section Animation
    ------------------------------------------------------------------------------------------------------------------------
    */
    
    
    // section 1 title size
    indexTxtSize = function (){
        $('.se1_txt_2').attr({width:'' ,height :''});
        $('.se1_txt_2 div').attr({width:'' ,height :''});

        var se1_txtWidth = $('.se1_txt').width();
        var se1_txtHeight = $('.se1_txt_2 .se1_t2').height();

        $('.se1_txt_2').css({
            width : se1_txtWidth,
            height : se1_txtHeight
        });

        if(_isIE8 == false){
            $('.se1_t1').css({
                left : (se1_txtWidth/4)
            });
        }
    };

    var aniSe1 = new TimelineMax({paused:true});
    var aniSe2 = new TimelineMax({paused:true});
    var aniSe3 = new TimelineMax({paused:true});
    var aniSe4 = new TimelineMax({paused:true});
    var aniSe5 = new TimelineMax({paused:true});
    var aniSe6 = new TimelineMax({paused:true});
    var aniSe7 = new TimelineMax({paused:true});


    // Section 1
    TweenMax.set('.se1_t1' ,{autoAlpha:0});
    aniSe1.set('.se1_t1' ,{autoAlpha:0 ,top: '+=15%'})
          .set('.se1_t2' ,{autoAlpha:0})
          .from('.se1_book_1' ,1  ,{autoAlpha:0  ,marginTop:'+=30px', onStart: function(){
            imgSizeHandler_1();
          }})
          .from('.se1_book_2' ,.5 ,{rotation:-20 ,autoAlpha:0 ,transformOrigin:'80% 50%'})
          .to('.se1_t1' ,.4 ,{autoAlpha:1 ,top: '-=15%', onStart: function(){
            var maxWidth = $('.se1_txt_2').width();
            while ( $('.se1_t1 span').width() + $('.se1_t2 span').width() > maxWidth ) {
                var fontSize = parseInt($('.se1_txt_2').css('font-size'));
                $('.se1_txt_2').css('font-size', fontSize - 1 + 'px');
            }
            console.log($('.se1_t1 span').width());
            console.log($('.se1_t2 span').width());
          }})
          .from('.se1_t2' ,.4 ,{autoAlpha:0 ,left: '+=10%' ,ease:Quart.easeOut})
          .to('.se1_t1' ,.6 ,{left: 0 , ease:Back.easeOut} ,"-=.4")
          .staggerFrom(['.se1_txt_1','.se1_chi'] ,.5 ,{autoAlpha:0 ,scale:.90 ,ease:Back.easeOut},.15 ,'-=.2')
          .from('.btn_se1_more' ,.5 ,{delay:.8 ,autoAlpha:0 ,onComplete:function(){
            repeatTablet();
          }});


    function repeatTablet(){
        var repeatMove = new TimelineMax({repeat:2 ,repeatDelay:10});

        repeatMove.to('.se1_book_2' ,.5 ,{rotation:1})
                  .to('.se1_book_2' ,.5 ,{rotation:-1})
                  .to('.se1_book_2' ,.5 ,{rotation:1})
                  .to('.se1_book_2' ,.5 ,{rotation:-1})
                  .to('.se1_book_2' ,.5 ,{rotation:1})
                  .to('.se1_book_2' ,.5 ,{rotation:0});
    }

          
    // Section 2
    aniSe2.from('.se2_book_1' ,.8 ,{autoAlpha:0 ,marginLeft:'-=100px' ,rotation:-10,onComplete:function(){
            keyIn($('.se2_txt .title span'));
          }})
          .from('.se2_book_2' ,.8 ,{autoAlpha:0 ,marginLeft:'+=30px' ,scale:.95 ,ease:Back.easeOut} ,"-=.5")
          .from('.se2_txt .title' ,.4 ,{scale:.8 ,autoAlpha:0  ,ease:Quart.easeOut})
          .staggerFrom(['.se2_txt .subTitle','.se2_txt .subTxt'] ,.5 ,{marginTop:'-=10px' ,autoAlpha:0  ,ease:Back.easeOut} ,.2);


    // Section 3
    aniSe3.from('.se3_book_1' ,.8 ,{autoAlpha:0 ,marginLeft:'-=30px' ,onComplete:function(){
            keyIn($('.se3_txt .title span'));
          }})
          .from('.se3_book_2' ,.8 ,{autoAlpha:0 ,marginLeft:'+=30px'} ,"-=.8")
          .from('.se3_txtBox' ,.5 ,{marginLeft:'-=10px' ,autoAlpha:0  ,ease:Back.easeOut})
          .from('.se3_txt .title' ,.4 ,{scale:.8 ,autoAlpha:0  ,ease:Quart.easeOut})
          .from('.se3_book_1_brief .brief_1' ,.4 ,{autoAlpha:0 ,scale:1.2 ,transformOrigin:'right center'})
          .from('.se3_book_1_brief .line' ,.4 ,{width:0} ,'-=.4')
          .from('.se3_book_1_brief .brief_3' ,.4 ,{autoAlpha:0} ,'-=.3')
          .from('.se3_book_1_brief .brief_4' ,.4 ,{autoAlpha:0} ,'-=.3')
          .from('.se3_book_1_brief .brief_5' ,.4 ,{autoAlpha:0 ,height:0 ,rotationY:-10} ,'-=.4')
          .from('.se3_book_2_brief .brief_1' ,.4 ,{autoAlpha:0 ,scale:1.2 ,transformOrigin:'left center'} ,'-=.5')
          .from('.se3_book_2_brief .line' ,.4 ,{width:0} ,'-=.5')
          .from('.se3_book_2_brief .brief_3' ,.4 ,{autoAlpha:0} ,'-=.5')
          .from('.se3_book_2_brief .brief_4' ,.4 ,{autoAlpha:0} ,'-=.5')
          .from('.se3_book_2_brief .brief_5' ,.4 ,{autoAlpha:0 ,height:0 ,rotationY:-10} ,'-=.5');
    

    // Section 4
    aniSe4.from('.se4_book_1' ,.8 ,{autoAlpha:0 ,marginTop:'-=30px' ,ease:Back.easeOut})
          .from('.se4_book_2' ,.8 ,{autoAlpha:0 ,marginLeft:'+=50px' ,ease:Back.easeOut})
          .from('.se4_txtBox' ,.5 ,{right:'-=30px' ,autoAlpha:0  ,ease:Quart.easeOut} ,"-=.5")
          .from('.se4_book_3' ,.8 ,{autoAlpha:0 ,marginLeft:'-=50px' ,ease:Quart.easeOut,onComplete:function(){
            keyIn($('.se4_txt .title span'));
          }},"-=.5")
          .from('.se4_txt .title' ,.4 ,{delay:.2 ,scale:.8 ,autoAlpha:0  ,ease:Quart.easeOut});

    // Section 5
    aniSe5.from('.se5_book_1' ,.8 ,{autoAlpha:0 ,marginTop:'+=40px' ,ease:Quart.easeOut,onComplete:function(){
            keyIn($('.se5_txt .title span'));
          }})
          .from('.se5_book_2' ,.8 ,{autoAlpha:0 ,rotationZ:10 ,marginLeft:'+=50px' ,ease:Quart.easeOut})
          .from('.se5_txtBox' ,.6 ,{right:'-=40px' ,autoAlpha:0  ,ease:Quart.easeOut} ,"-=.5")
          .from('.se5_txt .title' ,.4 ,{scale:.8 ,autoAlpha:0  ,ease:Quart.easeOut} ,'-=.3');


    // Section 6
    aniSe6.from('.show_book' ,.8 ,{autoAlpha:0 ,marginTop:'+=40px' ,ease:Quart.easeOut,onComplete:function(){
            keyIn($('.se6_txt .title span'));
            $('#section_6 .slider > div').each(function(){
                if ( $(this).css('left') == '0px') {
                    $('#section_6 .slider').height($(this).height());
                }
            });
          }, onStart: imgSizeHandler_6})
          .from('.se6_txt .title' ,.4 ,{delay:.2 ,scale:.8 ,autoAlpha:0  ,ease:Quart.easeOut})
          .from('.se6_txtBox' ,.8 ,{marginTop:'-=30px' ,autoAlpha:0  ,ease:Back.easeOut})
          .from('.model_pagination' ,.8 ,{scale:.8 ,autoAlpha:0  ,ease:Back.easeOut})
          .from('.btn_arrow' ,.8 ,{autoAlpha:0  ,ease:Quart.easeOut} ,"-=.5")
          .to('.btn_showOther' ,.5 ,{autoAlpha:1} ,"-=.5")
          .from('.btn_showOther' ,.5 ,{bottom:'-=10px' ,ease:Quart.easeOut} ,"-=.6");



    // Section 7
    TweenMax.set('.btn_showFoto' , {autoAlpha:0});
    TweenMax.set('.full_mask' , {autoAlpha:.7});

    aniSe7.set('.btn_showFoto' , {autoAlpha:0 ,scale:1 ,onComplete:function(){
            $('.full_foto').removeClass('pointer');
          }})
          .set('.se7_txt' ,{autoAlpha:0 ,scale:.9 ,onComplete:function(){
            setTimeout(function(){
                keyIn($('.se7_txt .title span'));
            },1200);
          }})
          .staggerTo(['.full_1 .full_mask' ,'.full_2 .full_mask' ,'.full_3 .full_mask' ,'.full_4 .full_mask'] ,.5 ,{autoAlpha:0 ,ease:Linear.easeNone} ,.15)
          .to('.full_mask' ,.3 ,{delay:.4 ,autoAlpha:.7 ,ease:Linear.easeNone})
          .to('.se7_txt' ,.8 ,{delay:.3 ,autoAlpha:1 ,scale:1 ,ease:Back.easeOut ,onComplete:function(){
            _fullhover = true;
            if(_fullhover){
                $('.full_foto').addClass('pointer');
                fullHover();
            }
          }},"-=.5");
    
    

    /* 共用 function
    -----------------------------------------------------------------------*/

    // keyin Animation
    function keyIn(ele){
        var str = ele.text();
        var i = 0;
        var typing_inst = setInterval(function(){typing();}, 100);

        function typing()
        {
            if(i < str.length -1)
            {
                ele.text(str.substr(0,i) + "_");
                i++;
            }
            else if(i == str.length-1)
            {
                ele.text(str);
                clearInterval(typing_inst);
            }
        }
    }



    // stop section animation
    function stopAni(old){
        // console.log('停止舊的頁面:'+old);
        switch (old){            
            case 0 :
            aniSe1.stop();
            aniSe1.seek(0);
            break;

            case 1 :
            aniSe2.stop();
            aniSe2.seek(0);
            break;

            case 2 :
            aniSe3.stop();
            aniSe3.seek(0);
            break;

            case 3 :
            aniSe4.stop();
            aniSe4.seek(0);
            break;

            case 4 :
            aniSe5.stop();
            aniSe5.seek(0);
            break;

            case 5 :
            aniSe6.stop();
            aniSe6.seek(0);
            break;

            case 6 :
            aniSe7.stop();
            aniSe7.seek(0);
            break;
        }
        
    }

    function playAni(cur){
        // console.log('目前播放:'+cur);
        switch (cur){
            case 0 :
            aniSe1.play();
            break;

            case 1 :
            aniSe2.play();
            break;

            case 2 :
            aniSe3.play();
            break;

            case 3 :
            aniSe4.play();
            break;

            case 4 :
            aniSe5.play();
            break;

            case 5 :
            aniSe6.play();
            break;

            case 6 :
            aniSe7.play();
            break;
        }
    }



    function pausedAni(){
        aniSe1.progress(1, false);
        aniSe2.progress(1, false);
        aniSe3.progress(1, false);
        aniSe4.progress(1, false);
        aniSe5.progress(1, false);
        aniSe6.progress(1, false);
        aniSe7.progress(1, false);
    }

    




    /* 
    ------------------------------------------------------------------------------------------------------------------------
    6. Section 06 Object
    ------------------------------------------------------------------------------------------------------------------------
    */
    var $section6 = $('#section_6'),
        $section6_showInfo = $section6.find('.show_book'),
        $section6_slider = $section6.find('.slider'),
        _sliderLength = $section6_slider.find('div').length;




    /* -- Section6 function code
    -------------------------------------------------------------*/
    
    // Section 6 Slider Show
    var _slide = 1,
        _show = false;
    
    $section6_showInfo.attr('slide',_slide);
    TweenMax.set($('.se6_txtBox').find('.se6Txt'),{autoAlpha:0});
    TweenMax.set($('.se6_txtBox').find('.se6Txt').eq(_slide-1),{autoAlpha:1});
    

    // next
    $('.btn_next').click(function(e){ 
        e.preventDefault();
        var p = 'next';
        resetSlide(p);
        if(_show){
            sliderPage(1 ,p);
        }
    });
    
    // prev
    $('.btn_prev').click(function(e){
        e.preventDefault();
        var p = 'prev';
        resetSlide(p);
        if(_show){
            sliderPage(-1 ,p);
        }
    });

    // 點選到指定頁面
    $('.model_pagination li').click(function(e){
        e.preventDefault();
        var _cur = parseInt($section6_showInfo.attr('slide'),10);
        var _this = parseInt($(this).index(),10)+1,
            _page;
        
        if(_this > _cur){
            _page = 'next';
        }else if (_this < _cur){
            _page = 'prev';
        }
        
        resetSlide(_page);
        $section6_showInfo.attr('slide',_this);

        if(_show){
            sliderMove(_this ,_page);
        }
    });


    // slider Reset
    function resetSlide(p){
        var _cur = $section6_showInfo.attr('slide');
        if(p == 'next'){
            TweenMax.set($('.show_'+_cur) ,{left:0});
            TweenMax.set($('.show_'+_cur).siblings() ,{left:'100%'});
            
        }else if(p == 'prev'){
            TweenMax.set($('.show_'+_cur) ,{left:0});
            TweenMax.set($('.show_'+_cur).siblings() ,{left:'-100%'});
        }

        _show = true;
    }

    // 確認Page數
    function sliderPage(i ,p){
        _show = false;
        _slide+=i;

        if(_slide > _sliderLength){
            _slide = 1;
        }else if(_slide < 1){
            _slide = _sliderLength
        }

        $section6_showInfo.attr('slide',_slide);
        sliderMove(_slide,p);
    }


    // 移動滑塊
    function sliderMove(cur ,p){
        var _curPrev = cur-1,
            _curNext = cur+1;

            if(_curPrev < 1){
                _curPrev = _sliderLength;
            }else if(_curNext > _sliderLength){
                _curNext = 1;
            }


        if(p == 'next'){
            TweenMax.to($('.show_'+cur) ,.5 ,{left:0, onStart: function(){
                $('#section_6 .slider').height($('.show_'+cur).height());
            }});
            TweenMax.to($('.show_'+_curPrev),.5 ,{left:'-100%'});
            TweenMax.set($('.show_'+_curNext) ,{left:'100%'});
        }

        if(p == 'prev'){
            TweenMax.to($('.show_'+cur) ,.5 ,{left:0, onStart: function(){
                $('#section_6 .slider').height($('.show_'+cur).height());
            }});
            TweenMax.to($('.show_'+_curNext),.5 ,{left:'100%'});
            TweenMax.set($('.show_'+_curPrev) ,{left:'-100%'});
        }

        $('.model_pagination li').removeClass('select');
        $('.model_pagination li').eq(cur-1).addClass('select');

        TweenMax.set($('.se6_txtBox').find('.se6Txt') ,{autoAlpha:0});
        TweenMax.set($('.se6_txtBox').find('.book_'+cur) ,{autoAlpha:1});
    }



    // hide bookshow
    TweenMax.set('.se6_list' ,{autoAlpha:0});
    TweenMax.set('.btn_hide' ,{autoAlpha:0});


    // 使用滑鼠控制左右slider
    $(document).bind('keydown', function(e) {
        // e.preventDefault();
        var key = e.keyCode;

        if(_mouse == false){
            // console.log(_mouse);
            if(key == 38){
                e = -1;
                sectoinCheckPage(e);
            }else if(key == 40){
                e = 1;
                sectoinCheckPage(e);
            }

            if(key == 116){
                window.location.reload();
            }
        }
    });

    // 看更多產品細項資訊
    $('.btn_showOther').click(function(){
        TweenMax.to('.se6_info' ,.5 ,{autoAlpha:0 ,top:'5%' ,ease:Back.easeOut});
        TweenMax.to('.btn_showOther' ,.35 ,{autoAlpha:0 ,bottom:-15});
        TweenMax.to('.se6_list' ,.5 ,{delay:.3 ,autoAlpha:1});
        TweenMax.from('.btn_hide' ,.5 ,{bottom:-15})
        TweenMax.to('.btn_hide' ,.5 ,{autoAlpha:1 ,onComplete:function(){
            TweenMax.set('.se6_info' ,.5 ,{top:'10%' ,autoAlpha:0});
        }});
    });

    // 隱藏產品細項資訊
    $('.btn_hide').click(function(){
        TweenMax.to('.se6_info' ,.5 ,{autoAlpha:1 ,top:'10%' ,ease:Back.easeOut});
        TweenMax.to('.btn_showOther' ,.8 ,{delay:.3 ,autoAlpha:1 ,bottom:15 ,ease:Back.easeOut});
        TweenMax.to('.se6_list' ,.5 ,{autoAlpha:0})
        TweenMax.to('.btn_hide' ,.5 ,{autoAlpha:0 ,onComplete:function(){
            TweenMax.set('.se6_list' ,.5 ,{top:'10%' ,autoAlpha:0});
        }});
    });
    

    // 滑到其他頁時 reset 用
    function hideInfo(){
        TweenMax.set('.se6_info',{autoAlpha:1 ,top:'10%'});
        TweenMax.set('.se6_list' ,{top:'10%' ,autoAlpha:0});
        TweenMax.set('.btn_showOther',{autoAlpha:0 ,bottom:15});
        TweenMax.set('.btn_hide' ,{autoAlpha:0});
    }

    hideInfo();




     /* 
    ------------------------------------------------------------------------------------------------------------------------
    7. Section 07 Object
    ------------------------------------------------------------------------------------------------------------------------
    */
    var $fullFoto = $('.full_foto'),
        _fullFotoMask = $fullFoto.find('.full_mask');

    TweenMax.set(_fullFotoMask ,{autoAlpha:.7});



    /* -- Section7 function code
    -------------------------------------------------------------*/
    function fullHover(){
        $('.btn_full').hover(function(){
            var $this = $(this),
                _activeImg = $this.find('.full_mask'),
                _activeImBtn= $this.find('.btn_showFoto');

            $('.btn_full').addClass('default')
            $this.removeClass('default').addClass('active');

            if($this.hasClass('active')){
                TweenMax.set(_activeImBtn ,{scale:1 ,autoAlpha:0});
                TweenMax.to(_activeImg ,.5 ,{autoAlpha:0 ,ease:Linear.easeNone});
                TweenMax.to(_activeImBtn ,.5 ,{autoAlpha:1 ,ease:Linear.easeNone});
                TweenMax.to(_activeImBtn ,.5 ,{scale:.8 ,ease:Bounce.easeOut});
            }
            
        },function(){
            var $this = $(this),
                _btnfullImg = $this.find('.full_mask'),
                _btnfullImBtn= $this.find('.btn_showFoto');
            
            $('.btn_full').addClass('default');
            $this.removeClass('active');

            TweenMax.to(_btnfullImg,.5 ,{autoAlpha:.7 ,ease:Linear.easeNone});
            TweenMax.to(_btnfullImBtn ,.5 ,{autoAlpha:0 ,ease:Linear.easeNone});
            TweenMax.to(_btnfullImBtn ,.2,{scale:1 ,autoAlpha:0,ease:Back.easeOut});
        });
    }


    $(document).on('click', '.btn_full', function(){
        var _thisImg = $(this).find('.full_img').attr('src'),
            _thisUrl = _thisImg.replace('.jpg' ,'_full.jpg'),
            _w = $(window).width() > $(window).height() ? $(window).width() : $(window).height(),
            _r = Math.floor(_w * 0.5);

        var layout = '<div class="full_box">';
            layout += '<div class="btn_close"><img src="images/btn_close.png" alt="" /></div>';
            layout += '<img src="'+ _thisUrl +'" alt="" />';
            layout += '</div>';
        
        $.myBlock({
            content: layout,
            cancelBtn: false
        });

        $(document).on('click', '.btn_close', function(){
            $.unMyBlock();            
        });
    });


    function fullHeight(){
        $('.full_top').css({
            height : $('.full_1 img').height()
        });

        $('.full_bottom').css({
            height : $('.full_1 img').height()
        });

        $('.full_right').css({
            height : $('.full_foto').height()
        });
    }

    $win.load(function(){
        fullHeight();
    });



    $('.product_video').click(function(){
        var _thisUrl = $(this).attr('video');

        var layout = '<div class="video_box">';
            layout += '<div class="btn_close"><img src="images/btn_close.png" alt="" /></div><div class="clear"></div>';
            layout += '<div class="play"><iframe width="420" height="315" src="https://www.youtube.com/embed/'+ _thisUrl +'?rel=0&autoplay=1"" frameborder="0" allowfullscreen></iframe></div>';
            layout += '</div>';
        
        $.myBlock({
            content: layout,
            cancelBtn: false
        });

        $('.btn_close').click(function(){
            $.unMyBlock();            
        });
    });

    // windowResize
    var windowResise = function () {
        var _winWidth = $win.width();
        var _winHeight = $win.height();
       
        _sectionSize();


        if(_winHeight < 840){
            _scrollFlag = true;
            $('#se6_scroll').css({
                height : Math.floor(_winHeight * _se6ScrollProp)
            });
        }else if(_winHeight > 840){
            _scrollFlag = false;
            $('#se6_scroll').css({
                height : _se6ScrollHeight
            });
        }

        scrollFunction();
        indexTxtSize();
        se_full_foto();
        fullHeight();


        $('.slider div ,.slider').removeAttr('width height'); //移除原有css
        var _sliderwidth = $('#section_6 .inner').width(); //抓取最新寬度

        $('.slider div ,.slider').css({
            width : _sliderwidth,
            height : _sliderwidth * 0.7
        });

    };

    windowResise();
   
   var _oldWidth = $win.width();

    $(window).resize(function(){
        
        var _newWidth = $win.width();
        
        if(_newWidth != _oldWidth){
            window.location.reload();
        }

        windowResise();
        loading(); 
    });

});

scrollFunction = function(){
    if(_scrollFlag){
        $("#se6_scroll").mCustomScrollbar();
    }
}

se_full_foto = function(){
    var _l1 = $(window).width()/_fullFotoWidth,
        _l2 = $(window).height()/_fullFotoHeight,
        _r = _l1 > _l2 ? _l1 : _l2;

    $('.full_foto').css({
        position :'absolute',
        top: '50%',
        left : '50%',
        marginLeft : -Math.floor( _fullFotoWidth * _r)/2,
        marginTop : -Math.floor( _fullFotoHeight * _r)/2,
        width : Math.floor(_fullFotoWidth * _r),
        height : Math.floor(_fullFotoHeight * _r)
    });
}

var imgSizeHandler_1 = function() {
    var section_1_height = $('#section_1 .inner').height();
    var section_1_top = parseInt($('#section_1 .inner').css('top'));
    var btn_1_height = $('#section_1 .btn_more').height();
    var btn_1_bottom = parseInt($('#section_1 .btn_more').css('bottom'));
    var maxHeight = $win.height() - section_1_top - btn_1_height - btn_1_bottom;

    $('#section_1 img').css('max-width', '100%');
    if ( maxHeight < section_1_height ) {
        var ratio = parseInt(maxHeight / section_1_height * 100) - 5;
        $('#section_1 img').css('max-width', ratio + '%');
    }
};

var imgSizeHandler_6 = function() {
    var section_6_top = parseInt($('#section_6 .inner').css('top'));
    var btn_6_height = $('#section_6 .btn_more').height();
    var btn_6_bottom = parseInt($('#section_6 .btn_more').css('bottom'));
    var maxHeight = $win.height() - section_6_top - btn_6_height - btn_6_bottom;
    var originalHeight = $('#section_6 .inner').width() * 0.7;

    $('#section_6 .slider > div').each(function(index){
        var txtHeight = $('.se6Txt.book_' + (index + 1)).height();
        var selfHeight = $(this).height() + txtHeight;
        console.log(selfHeight);
        if ( maxHeight < selfHeight ) {
            var newHeight = $(this).height() - (selfHeight - maxHeight);
            $(this).height(newHeight);

            var ratio = parseInt($(this).height() / originalHeight * 100);
            $(this).find('img').css('max-width', ratio + '%');
        }

         
    });
};

