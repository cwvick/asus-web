$(function () {
    
    /**************************** loading ****************************/
    
    var $allcontainer = $('.wrapper');

    showLoading();
    function showLoading() {
        var layout = '<div class="loading-container">';
        layout += '<div class="loading"></div>';
        layout += '<div id="loading-text">loading</div>';
        layout += '</div>';
        $.myBlock({
            content: layout,
            cancelBtn: false,
        });
    }
    

    imagesLoaded($allcontainer, function() {
        setTimeout( hideLoading() , 300);
    });

    function hideLoading() {
        $.unMyBlock();
    }
    
    
    
    //RESIZE
    var _resise = function () {
        
//        var $winH = $(window).height();
//        
//        
//        $('.section').each( function (i,obj) {
//            var $centerH = $(obj).find('.center').height();
//            var $secH = $('.section').height($centerH+50);
//            var $paddingT = ($secH-$centerH)/2;
//            $(obj).find('.center').css('padding-top', $paddingT);
//        });
        
    };
    
    _resise();    
    $(window).resize(_resise);
    
    
    //menu選單_收合
    var toggled=0
    $('.btn_menu').click( function () {
        if( toggled == 0 ){
            $('.btn_menu').addClass('select');
            TweenMax.to(".page",.7,{ left: "-75%", ease: Quint.easeOut});
            toggled = 1;
        }else{
            $('.btn_menu').removeClass('select');
            TweenMax.to(".page",.7,{ left: "0%", ease: Quint.easeOut});
            toggled = 0;
        }
    });
    
    
    //menu選單_點選
    $('.menu li a').click( function(){
        TweenMax.to(".page",0,{ left: "0%", ease: Quint.easeOut});
        $('.btn_menu').removeClass('select');
        toggled = 0;
    });
        
    
    //see other_收合
    $('#family').slideUp(0);
    $('.btn_seeother').click(function(e){
        e.preventDefault();
        $('#family').slideDown();
        $('.btn_seeother').addClass('hide');
        $('.btn_hide').removeClass('hide');
    });
    $('.btn_hide').click(function(e){
        e.preventDefault();
        $('#family').slideUp();
        $('.btn_seeother').removeClass('hide');
        $('.btn_hide').addClass('hide');
    })
    
    
    //移動式錨點連結程式碼
    $('.anchor a').click(function() {
	    $("html, body").animate({
    	    scrollTop: $($(this).attr("href")).offset().top + "px"
	    }, {
	        duration: 500,
	        easing: "swing",
	    });
	    return false;
	});
    
    
    
    //LIGHTBOX
    function lightbox(i,obj){

        var layout = '<div class="lb_container">';
            layout += '<div class="lightbox">';
            layout += '<div class="content">';
            layout += '<div class="btn_close"><a href="#"><img src="../images/m_close_x.png" alt=""></a></div>';
            layout += '<img src="../images/m_07_foto_0'+(i+1)+'.jpg" alt="">';
            layout += '</div>';
            layout += '</div>';
            layout += '</div>';

        $.myBlock({
            content: layout,
            cancelBtn: false,
            scrollTop: false
        });


        $('.btn_close a').click(function() {

            TweenMax.to('#blockContentBG', .1, {
                autoAlpha: 0,
                onComplete: function() {
                    $.unMyBlock();
                }
            });
            return false;
        });

    }
    
    $('.pic li a').each(function(i,obj){
        $(obj).click(
            function(e) {
                e.preventDefault();
                lightbox(i,obj);
                return false;
            }
        );
    });
    
    
    
    $('.product_video a').click(function(e){
        e.preventDefault();
        var _thisUrl = $(this).parent().attr('video');

        var layout = '<div class="lb_container">';
            layout += '<div class="lightbox">';
            layout += '<div class="content">';
            layout += '<div class="btn_close"><a href="#"><img src="../images/m_close_x.png" alt=""></a></div>';
            layout += '<div class="play"><iframe width="420" height="315" src="https://www.youtube.com/embed/'+ _thisUrl +'?rel=0&autoplay=1"" frameborder="0" allowfullscreen></iframe></div>';
            layout += '</div>';
            layout += '</div>';
            layout += '</div>';
        
        $.myBlock({
            content: layout,
            cancelBtn: false
        });

        $('.btn_close a').click(function(e){
            e.preventDefault();
            $.unMyBlock();            
        });
    });
  
   
});