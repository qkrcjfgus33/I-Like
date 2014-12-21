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
			var item, item_canvas, search_index, search_x, search_y;
			while( drawed_index < len ) {
				item = like_list[drawed_index];
				item_canvas = getCanvas(item, drawed_index);

				item_canvas = CanvasUtil.getFitCanvas(item_canvas);
				
				do{
					search_index = getSearchIndex(searched_list, drawed_index, width, height, item_canvas);
					search_x = parseInt(search_index[0]);
					search_y = parseInt(search_index[1]);
					searched_list.push([search_x, search_y]);
				}while(CanvasUtil.isCollision(canvas, item_canvas, search_x, search_y));

				ctx.drawImage(item_canvas, search_x, search_y);

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