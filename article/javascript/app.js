define(['jquery', 'ILike', 'lodash'], function($, ILike, _){
	var il, ctx,width, height

	var max = 70;
	var min_fontsize = 10;
	var margin = 10;

	function ILikeInit(){
		var $canvas = $('#board');
		var canvas = $canvas[0];
		ctx = canvas.getContext("2d");
		width = canvas.width - margin*2;
		height = canvas.height - margin*2;

		il = new ILike(width, height, getCanvas, getSearchIndex);
	}

	function onEvent(){
		var $add_itme = $('#add_itme');
		var $item = $('#itme');
		$add_itme.on('click', function(){
			addItem();
			removeInput();
		});
		
		$item.on('keyup',function(e) {
			if (e.keyCode == 13) {
				addItem();
				removeInput();
			}
		});
	}

	function addItem(){
		var $item = $('#itme');
		var item = $item.val();

		$item.attr('disabled');

		il.push(item);
		il.draw();
		ctx.drawImage(il.getCanvas() , margin, margin);
		
		$item.val('');
		$item.removeAttr('disabled');
	}

	function disableInput(){
		var $item = $('#itme');
		
	}

	function ableInput(){
		var $item = $('#itme');
		
	}

	function removeInput(){
		var $item = $('#itme');
		
	}

	function getCanvas(item, drawed_index){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		var font_height 	= max;// - drawed_index*10;
		ctx.textBaseline	="top"; 
		ctx.font 		= font_height+"px Arial";
		ctx.fillText(item, 0, 0);

		return canvas;
	}

	var __i = 0;
	function getSearchIndextest(searched_list, drawed_index, width, height, item_canvas){
		__i ++;
		var start_x, start_y, end_x, end_y;

		var item_width = item_canvas.width,
			item_height = item_canvas.height;

		var half_w = width/2;
		var half_h = height/2;
		var half_item_w = item_width/2;
		var half_item_h = item_height/2;

		start_x = half_w - __i;
		start_y = half_h - __i;
		end_x = half_w + __i;
		end_y = half_h + __i;

		if( start_x < half_item_w ){
			start_x = half_item_w;
		}

		if( end_x > width + half_item_w ){
			end_x = width + half_item_w;
		}

		if( start_y < half_item_h ){
			start_y = half_item_h;
		}

		if( end_y < height + half_item_h ){
			end_y = height + half_item_h;
		}

		
		/*
		if( drawed_index === 0){
			return [width/2 - item_width/2,  - item_height/2]
		}*/
		return [_.random(start_x - half_item_w, end_x - half_item_w), _.random(start_y - half_item_h, end_y - half_item_h)];
	}

	function getSearchIndex(searched_list, drawed_index, width, height, item_canvas){
		__i ++;
		var start_x, start_y, end_x, end_y;

		var item_width = item_canvas.width,
			item_height = item_canvas.height;

		if(__i*10>width - item_width){
			__i = 0;
		}

		var j = (__i-1)*10;
		if(j<0){
			j=0;
		}


		return [_.random(j, __i*10), _.random(0, height - item_height)];
	}

	function randomIndex(searched_list, drawed_index, width, height, item_canvas){
		var item_width = item_canvas.width,
			item_height = item_canvas.height;

		return [_.random(0, width - item_width), _.random(0, height - item_height)];
	}


	return function(){
		$(function(){
			ILikeInit();
			onEvent();
		});
	};
});