define(['jquery', 'ILike', 'lodash', 'EventEmitter'], function($, ILike, _, EventEmitter){
	var IL,width, height

	var ee = new EventEmitter();

	var max, min;

	function app(){
		$(function(){
			ILikeInit();
			onEvents(ee);
			onDomEvents(ee);
		});
	}

	function ILikeInit(){
		var $canvas = $('#board');
		var canvas = $canvas[0];
		var margin = 10;
		var delay = 3000;

		var ctx = canvas.getContext("2d");

		function draw(){
			ctx.clearRect(margin, margin, width, height);
			ctx.drawImage(IL.getCanvas() , margin, margin);
		}
		var delayDraw = _.throttle(draw, delay);

		width = canvas.width - margin*2;
		height = canvas.height - margin*2;

		IL = new ILike(width, height, getText, getPostion);

		IL.on('drawing', function(){
			var $redraw_icon = $('#redraw_icon');
			$redraw_icon.addClass('drawing');
		});

		IL.on('change', delayDraw);

		IL.on('done', function(){
			draw();
			var $redraw_icon = $('#redraw_icon');
			$redraw_icon.removeClass('drawing');
		});

		
	}

	function onEvents(ee){
		ee.on('change like list', function(data){
			IL.setLikeList(data);
		});

		var color_preview, color_preview_ctx, grd, color_preview_width, color_preview_height;
		ee.on('change color', function(data){
			color_preview 			= $('#color_preview')[0];
			color_preview_ctx 		= color_preview.getContext('2d');
			color_preview_width 	= color_preview.width;
			color_preview_height 	= color_preview.height;

			grd = color_preview_ctx.createLinearGradient(0, 0, color_preview_width, color_preview_height);
			grd.addColorStop(0, data.start);
			grd.addColorStop(1, data.end);

			color_preview_ctx.fillStyle=grd;
			color_preview_ctx.fillRect(0,0,color_preview_width, color_preview_height);

			IL.init();
		});

		ee.on('change size', function(data){
			console.log(data);
			max = parseInt(data.start);
			min = parseInt(data.end);
			IL.init();
		});

		ee.on('change pattern', function(data){
			console.log(data);
		});
	}

	function onDomEvents(ee){
		var $redraw = $('#redraw');
		$redraw.on('click', function(){
			IL.init();
		});

		registChangeLikeList(ee);
		registChangeColor(ee);
		registChangeSize(ee);
		registChangePattern(ee);
	}

	function getText(item, drawed_index, like_num){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;

		var font_height 	= min + (((max - min) / like_num) * ( like_num - drawed_index));
		
		var pos 			= drawed_index / like_num;
		var color			= $('#color_preview')[0];
		var	color_ctx 		= color_preview.getContext('2d');
		var	color_width 	= color_preview.width;
		var color_imgData	= color_ctx.getImageData( parseInt(color_width * pos), 1,1,1).data;
		var r 	= color_imgData[0];
		var g 	= color_imgData[1];
		var b 	= color_imgData[2];
		var color = 'rgb(' + r + ',' + g + ',' + b + ')';

		ctx.fillStyle 	= color;
		ctx.textBaseline	= "top"; 
		ctx.font 			= font_height+"px Arial";
		ctx.fillText(item, 0, 0);

		return canvas;
	}

	function getPostion( item_canvas, width, height, search_num, drawed_index ){
		var item_width = item_canvas.width,
			item_height = item_canvas.height;

		return [_.random(0, width - item_width), _.random(0, height - item_height)];
	}

	function registChangeLikeList(ee){
		var likes_val, new_like_list;
		var like_list=[];
		var $likes = $('#likes');

		var getLikes = _.debounce(function(){
			likes_val = $likes.val();
			new_like_list = likes_val.split(',');
			_.remove(new_like_list, function(like){ return $.trim(like) === ''});

			if( !_.isEqual(like_list, new_like_list) ){
				like_list = new_like_list;
				ee.emit('change like list', like_list);
			}
		}, 300)

		$likes.on('keyup', getLikes);
		getLikes();
	}

	function registChangeColor(ee){
		var $start_color = $('#start_color');
		var $end_color = $('#end_color');

		var start_color, end_color;

		var getColor = function(){
			start_color = $start_color.val();
			end_color = $end_color.val();

			ee.emit('change color', { start : start_color, end: end_color });
		}

		$start_color.add($end_color).change(getColor);
		getColor();
	}

	function registChangeSize(ee){
		var $start_size = $('#start_size');
		var $end_size = $('#end_size');

		var start_size, end_size;

		var getSize = function(){
			start_size = $start_size.val();
			end_size = $end_size.val();

			ee.emit('change size', { start : start_size, end: end_size });
		}

		$start_size.add($end_size).change(getSize);
		getSize();
	}

	function registChangePattern(ee){
		var $pattern = $('#pattern');

		var pattern;

		var getPattern = function(){
			pattern = $pattern.val();

			ee.emit('change pattern', pattern);
		}

		$pattern.change(getPattern);
		getPattern();
	}

	return app;
});