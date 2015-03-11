$(function() {
	
	var current_page = [];
	var _limit = [];
    var slideMove = false;
	
	function page_chg(direction,idx,_obj ,_this){		
		var $allBox = $(_this,_obj).children();

		switch(direction){
			case 'right':{
				$allBox.eq(current_page[idx]-1).animate({left:'-100%'},500);
				current_page[idx]++;
		        if(current_page[idx] > _limit[idx]){
		        	current_page[idx] = 1;
		        }
				$allBox.eq(current_page[idx]-1).css({left:'100%'}).animate({left:0},500,function(){ slideMove = false; });	
                $('.dots',_obj).find('li').removeClass('select').eq(current_page[idx]-1).addClass('select');
				break;
			}
			case 'left':{
				$allBox.eq(current_page[idx]-1).animate({left:'100%'},500);
				current_page[idx]--;
		        if(current_page[idx] < 1){
		        	current_page[idx] = _limit[idx];
		        }
		        $allBox.eq(current_page[idx]-1).css({left:'-100%'}).animate({left:0},500,function(){ slideMove = false; });
                $('.dots',_obj).find('li').removeClass('select').eq(current_page[idx]-1).addClass('select');
				break;
			}
		}

		var txt = _this.parent().next().find('.slide_box');
		txt.hide();
		txt.eq(current_page[idx]-1).show();
	};
	
	$('.slide').each(function(idx,_obj){

		_limit.push($('.allbox',_obj).children().length);
		current_page.push(1);
		var $allBox = $('.allbox',_obj).children();
		
		$allBox.css('left', '100%');
		$allBox.eq(0).css('left', '0');
        
        
		
		$('.arrow_r a',_obj).click(function(e) {
	        e.preventDefault();
            if(slideMove)return;
            slideMove = true;
            
	        var direction = 'right';
	        var _this = $(this).closest('.slide').find('.allbox');
	        page_chg(direction,idx,_obj,_this);
	    })
	    $('.arrow_l a',_obj).click(function(e) {
	        e.preventDefault();
            if(slideMove)return;
            slideMove = true;
            
	        var direction = 'left';
	        var _this = $(this).closest('.slide').find('.allbox');
	        page_chg(direction,idx,_obj,_this);
	    })
        
        //滑動手勢
	    $(".allbox",_obj).touchwipe({
	 		wipeLeft: function() {
	 			$('.arrow_r a',_obj).click();
	 		},
	 		wipeRight: function() {
	 			$('.arrow_l a',_obj).click();
	        },
	        preventDefaultEvents: true,
		});
	});
	
	return;

});