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





$.fn.imagesLoaded = function( callback ){
	var elems = this.find( 'img' ),
	elems_src = [],
	self = this,
	len = elems.length;
	if ( !elems.length ) {
		callback.call( this );
		return this;
	} 

	elems.one('load error', function() {
	if ( --len === 0 ) {
	// Rinse and repeat.
	len = elems.length;
	elems.one( 'load error', function() {
	if ( --len === 0 ) {
	callback.call( self );
	}
	}).each(function() {
	this.src = elems_src.shift();
	});
	}
	}).each(function() {
	elems_src.push( this.src );
	// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
	// data uri bypasses webkit log warning (thx doug jones)
	this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	});
	return this;
};


/*------------------------------------------------------------paliie block------------------------------------------------------------------*/
jQuery.myBlock = function(parameters){
	/*預設參數*/
	var defaults={
		content   : '',
		title     : '',
		cancelBtn : true,
		scrollTop : false,
		width     : 0,
		height    : 0,
		overlayCSS : {
			margin          : 0,
			padding         : 0,
			border          : 'none',
			opacity         : '0.85',
			cursor          : 'wait',
			top             : 0,
			left            : 0,
			zIndex          : 10000,
			backgroundColor : '#000000',
			width           : '100%',
			height          : '100%',
			position        : 'fixed'
		},
		ie6OverlayCSS : {
			margin          : 0,
			padding         : 0,
			border          : 'none',
			opacity         : '0.85',
			cursor          : 'wait',
			top             : 0,
			left            : 0,
			zIndex          : 1000,
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
		var top  = totalHeight >= windowHeight ? 0 : (windowHeight-totalHeight)/2-30;		
		// var left = totalWidth  >= windowWidth  ? 0 : (windowWidth-totalWidth)/2;
		var left = totalWidth/2;
		
		console.log(totalWidth ,windowWidth);

		if(defaults.scrollTop){
			if(BROWSER.versions.mobile){
				top = $(document).scrollTop();	
			}
			else{
				top+= $(document).scrollTop();
			}
		}
		
		if(top<0){
			top = 0;
		}
		/*set position*/
		$('#blockContentBG').css({
			'top' : top+'px',
			'marginLeft' : '-'+left+'px',
			'left' : '50%'
		});
		/*if(defaults.scrollTop){
			$('#blockContentBG').css({
				width: '100%',
				'marginLeft' : '-50%',
			});
			
		}*/
	};	

	var overLay = '<div id="overLay"></div>';
	if($('#blockContentBG').length != 0){
		$('iframe',$('#blockContentBG')).attr('src','');
		$('#blockContentBG').empty().remove();
	}	
	
	if($('#overLay').length == 0){
		$('body').append(overLay);
	}
	
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
	
	if(defaults.width != 0){
		$('#blockContentBG').css({width:defaults.width});
	}
	if(defaults.height != 0){
		$('#blockContentBG').css({height:defaults.height});
	}
	
	setPosition();
	//$('#blockContentBG').imagesLoaded(setPosition);
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







jQuery.hover_direction = function(parameters){
	var defaults={
		initX : 0,
		initY : 0,
		width : 0,
		height : 0,
		type : 'hover'
	};

	/*映射參數*/
	jQuery.extend(defaults,parameters);
	var a1 = (defaults.initY-0)/(defaults.initX-0);
   	var a2 = (defaults.initY-defaults.height)/(defaults.initX-defaults.width);
   	var b1 = (defaults.initY-defaults.height)/(defaults.initX-0);
   	var b2 = (defaults.initY-0)/(defaults.initX-defaults.width);
   	var a = a1-a2;
   	var b = b1-b2;
   	if(a>=0 && b>=0){          //bottom
   		return 'bottom';
   	}
   	else if(a>=0 && b<0){      //left
   		return defaults.type == 'over' ? 'left':'right';
   	}
   	else if(a<0 && b>=0){      //right
   		return defaults.type == 'over' ? 'right':'left';
   	}
   	else if(a<0 && b<0){       //top
   		return 'top';
   	}
};


jQuery.fn.mouse_over_direction = function(event){
	var initX = event.pageX-$(this).posX();
   	var initY = event.pageY-$(this).posY();
   	var width = $(this).width();
   	var height = $(this).height();
	
	var a1 = (initY-0)/(initX-0);
   	var a2 = (initY-height)/(initX-width);
   	var b1 = (initY-height)/(initX-0);
   	var b2 = (initY-0)/(initX-width);
   	
   	var a = a1-a2;
   	var b = b1-b2;
   	if(a>=0 && b>=0){         
   		return 'bottom';
   	}
   	else if(a>=0 && b<0){    
   		return 'left';
   	}
   	else if(a<0 && b>=0){    
   		return 'right';
   	}
   	else if(a<0 && b<0){    
   		return 'top';
   	}
};


jQuery.fn.mouse_out_direction = function(event){
	var initX = event.pageX-$(this).posX();
   	var initY = event.pageY-$(this).posY();
   	var width = $(this).width();
   	var height = $(this).height();
	
	var a1 = (initY-0)/(initX-0);
   	var a2 = (initY-height)/(initX-width);
   	var b1 = (initY-height)/(initX-0);
   	var b2 = (initY-0)/(initX-width);
   	
   	var a = a1-a2;
   	var b = b1-b2;
   	if(a>=0 && b>=0){          
   		return 'bottom';
   	}
   	else if(a>=0 && b<0){      
   		return 'right';
   	}
   	else if(a<0 && b>=0){     
   		return 'left';
   	}
   	else if(a<0 && b<0){       
   		return 'top';
   	}
	
};


jQuery.fn.hoverMove=function(){
    return this.each(function(){
    	/*取得版型*/
		$(this).hover(
			function(event){
				var initX = event.pageX-$(this).posX();
			   	var initY = event.pageY-$(this).posY();		   	
			   	var width = $(this).width();
			   	var height = $(this).height();	
			   	
			   	var direction = $.hover_direction({
			   		initX : initX,
					initY : initY,
					width : width,
					height : height,
					type : 'over'
			   	});
			   	switch(direction){
			   		case 'bottom':{
			   			$('.textBox',this).show().css({
				   			top:'100%',
				   			left:0
				   		}).stop().animate({
				   			top:0,
				   			left:0
				   		},300);
			   			break;
			   		}
			   		case 'left':{
			   			$('.textBox',this).show().css({
				   			top:0,
				   			left:'-100%'
				   		}).stop().animate({
				   			top:0,
				   			left:0
				   		},300);
			   			break;
			   		}
			   		case 'right':{
			   			$('.textBox',this).show().css({
				   			top:0,
				   			left:'100%'
				   		}).stop().animate({
				   			top:0,
				   			left:0
				   		},300);
			   			break;
			   		}
			   		case 'top':{
			   			$('.textBox',this).show().css({
				   			top:'-100%',
				   			left:0
				   		}).stop().animate({
				   			top:0,
				   			left:0
				   		},300);
			   			break;
			   		}
			   	}
			},
			function(event){
				var initX = event.pageX-$(this).posX();
			   	var initY = event.pageY-$(this).posY();		   	
			   	var width = $(this).width();
			   	var height = $(this).height();
			   	
			   	var direction = $.hover_direction({
			   		initX : initX,
					initY : initY,
					width : width,
					height : height,
					type : 'out'
			   	});
			   	
			   	switch(direction){
			   		case 'bottom':{
			   			$('.textBox',this).stop().animate({
				   			top:'100%',
				   			left:0
				   		},300);
			   			break;
			   		}
			   		case 'left':{
			   			$('.textBox',this).stop().animate({
				   			top:0,
				   			left:'-100%'
				   		},300);
			   			break;
			   		}
			   		case 'right':{
			   			$('.textBox',this).stop().animate({
				   			top:0,
				   			left:'100%'
				   		},300);
			   			break;
			   		}
			   		case 'top':{
			   			$('.textBox',this).stop().animate({
				   			top:'-100%',
				   			left:0
				   		},300);
			   			break;
			   		}
			   	}
			}
		);
    });
};

































