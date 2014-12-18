define(['jquery', 'ILike'], function($, ILike){
	var il, ctx;

	var max = 50;
	var min_fontsize = 10;
	var margin = 10;

	function ILikeInit(){
		var $canvas = $('#board');
		var canvas = $canvas[0];
		ctx = canvas.getContext("2d");
		var width = canvas.width - margin*2;
		var height = canvas.height - margin*2;

		il = new ILike(width, height, getCanvas, getSearchIndex);
	}

	function onEvent(){
		var $add_itme = $('#add_itme');
		var $item = $('#itme');
		var item;
		$add_itme.on('click', function(){
			item = $item.val();
			il.push(item);
			il.draw();
			$('body').append(il.getCanvas());
			ctx.drawImage(il.getCanvas() , margin, margin)
		});
	}

	function getCanvas(item, drawed_index){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");

		

		var height = max/(drawed_index+1) + min_fontsize;
		ctx.font = height+"px Arial";
		var width = ctx.measureText(item).width;

		canvas.width = width;
		canvas.height = height;

		ctx.font = height+"px Arial";
		ctx.fillText(item, 0, height);

		return canvas;
	}

	var x = 0, y = 0;
	function getSearchIndex(searched_list, drawed_index, width, height, item_width, item_height){
		if( drawed_index === 0){
			return [width/2 - item_width/2, height/2 - item_height/2]
		}
		return [x++, y++];
	}


	return function(){
		$(function(){
			ILikeInit();
			onEvent();
		});
	};
});