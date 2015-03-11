/*--------------------------------------------------------tooltip plugin-------------------------------------------------------------*/
var tooltipLayout=function(msg,x,y){
	var tooltip = '<div  id="tooltipPanel" style="top:'+y+'px;left:'+x+'px;">';
	    tooltip+= msg;
	    tooltip+= '</div>';
	return tooltip;
};
var tooltipMove=function(x,y){
	$('#tooltipPanel').show().css({'top':y+'px','left':x+'px'});
};
var tooltipRemove=function(){
	if($('#tooltipPanel').length>0){
		$('#tooltipPanel').empty().remove();
	}
};

jQuery.fn.tooltipFN=function(parameters){
	    return this.each(function(){
	    	/*預設參數*/
			var defaults ={
				content:''
			};
			/*映射參數*/
			jQuery.extend(defaults,parameters);
			/*取得版型*/
			
			$(this).hover(
			   function(event){
			   	tooltipRemove();
			   	var initX = event.pageX+15;
			   	var initY = event.pageY+10;
			   	var layout=tooltipLayout(defaults.content,initX,initY);
				$('body').append(layout);
				$(this).mousemove(function(event){
					var x=event.pageX+15;
					var y=event.pageY+10;
					tooltipMove(x,y);
				});
			   },
			   function(){
			   	tooltipRemove();
			   }
			);
			$('*').click(function(){
				tooltipRemove();
			});
	    });
};




$.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };
/*------------------------------------------------------------paliie block------------------------------------------------------------------*/
jQuery.myBlock = function(parameters){
	/*預設參數*/
	var defaults={
		content       : '',
		title         : '',
		cancelBtn     : true,
		width         : 300,
		height        : 100,
		overlayCSS    : {
			margin          : 0,
			padding         : 0,
			border          : 'none',
			opacity         : '0.6',
			cursor          : 'wait',
			top             : 0,
			left            : 0,
			zIndex          : 2400000,
			backgroundColor : '#000000',
			width           : '100%',
			height          : '100%',
			position        : 'fixed'
		},
		ie6OverlayCSS : {
			margin          : 0,
			padding         : 0,
			border          : 'none',
			opacity         : '0.6',
			cursor          : 'wait',
			top             : 0,
			left            : 0,
			zIndex          : 2400000,
			backgroundColor : '#000000',
			width           : '100%',
			height          : '100%',
			position        : 'absolute'
		}
	};
	/*映射參數*/
	jQuery.extend(defaults,parameters);
	var IE6OverLayCss = function(){
		var windowWidth=parseInt(getBrowserWidth());
		var windowHeight=parseInt(getBrowserHeight());
		var bodyWidth=parseInt($('body').outerWidth());
		var bodyHeight=parseInt($('body').outerHeight());
		
		var setWidth= windowWidth>bodyWidth ? windowWidth : bodyWidth;
		var setHeight= windowHeight>bodyHeight ? windowHeight : bodyHeight;
		$('#overLay').css({
			width:setWidth,
			height:setHeight
		});
	};
	
	var blockContent = function(){
		var layout = '<div id="blockContentBG">';
		if(defaults.cancelBtn){
			layout+= '<div id="blockContentDel"></div>';
		}			
			layout+= defaults.content;			
		    layout+= '</div>';
		return layout;
		
	};
	
	var setPosition = function(){
		/*總寬高*/
		var totalWidth  = parseInt($('#blockContentBG').outerWidth());
		var totalHeight = parseInt($('#blockContentBG').outerHeight());
		
		/*取得視窗寬高*/
		var windowWidth  = parseInt(getBrowserWidth());
		var windowHeight = parseInt(getBrowserHeight());
		/*set top,left*/
		var top  = totalHeight >= windowHeight ? 50 : (windowHeight-totalHeight)/2;
		var left = totalWidth  >= windowWidth  ? 50 : (windowWidth-totalWidth)/2;
		//alert(top+':'+left);
		if(IE6){
			top += $(document).scrollTop( );
		}
		/*set position*/
		$('#blockContentBG').css({
			'top'     : top+'px',
			'left'    : left+'px'
		});
	};
	
	var overLay = '<div id="overLay"></div>';
	if($('#blockContentBG').length != 0){
		$('#blockContentBG').empty().remove();
	}
	
	$('body').append(overLay);
	//$('object').css('visibility','hidden');
	if(IE6){
		$('select').css('visibility','hidden');
		
		$('#overLay').css(defaults.ie6OverlayCSS);
		IE6OverLayCss();
		$(window).resize(IE6OverLayCss);
	}
	else{
		$('#overLay').css(defaults.overlayCSS);
	}
	$('body').append(blockContent());
	//setPosition();
	$('#blockContentBG').imagesLoaded(setPosition);
	
	
	$('#blockContentDel').click(function(){
		$.unMyBlock();
	});
	
};

jQuery.unMyBlock = function(parameters){
	var defaults={
		fadeOut:400
	};
	jQuery.extend(defaults,parameters);
	
	$('#blockContentBG').empty().remove();
	
	var removeOverlay = function(){
		$('#overLay').empty().remove();
		$('object').css('visibility','visible');
		if(IE6){
			$('select').css('visibility','visible');
		}
	};
	if(defaults.fadeOut==0){
		removeOverlay();
	}
	else{
		$('#overLay').fadeOut(defaults.fadeOut,removeOverlay);
	}
};




















