define(['CanvasUtil'],function(CanvasUtil){
	function ILike(width, height, getCanvas,  getSearchIndex){
		var canvas  = document.createElement('canvas');
		var ctx 			= canvas.getContext('2d');
		canvas.width 	= width;
		canvas.height 	= height;

		var like_list = [];
		var drawed_index = 0;

		var searched_list = [];

		this.draw = function(){
			//var def = $.Deffered();
			var len = like_list.length;
			var item, item_canvas, item_width, item_height, search_index, search_x, search_y;
			while( drawed_index < len ) {
				item = like_list[drawed_index];
				item_canvas = getCanvas(item, drawed_index);
				item_width = item_canvas.width;
				item_height = item_canvas.height;
				
				do{
					search_index = getSearchIndex(searched_list, drawed_index, width, height, item_width, item_height);
					search_x = search_index[0];
					search_y = search_index[1];
					searched_list.push(search_index);
				}while(!CanvasUtil.filled(ctx, search_x, search_y, item_width, item_height, [0, 0, 0, 0]));

				ctx.save();

				ctx.drawImage(item_canvas, search_x, search_y);
				ctx.restore();

				drawed_index++;
			}

			//return def.promise();
		}

		this.pop = function(){
			Array.prototype.pop.apply(like_list, arguments);
		}

		this.push = function(){
			Array.prototype.push.apply(like_list, arguments);
		}

		this.getCanvas = function(){
			return canvas;
		}
	}

	return ILike;
});