define(['CanvasUtil', 'EventEmitter', 'lodash'],function(CanvasUtil, EventEmitter, _){
	function ILike(width, height, getText,  getPostion){
		var canvas, ctx, drawed_index, search_num;

		var ee = new EventEmitter();
		var like_list = [];

		init();
		draw();

		this.init 			= init;
		this.on 				= _.bind(ee.on, ee);
		this.setGetText 	= setGetText;
		this.setGetPostion 	= setGetPostion;
		this.setLikeList 		= setLikeList;
		this.getCanvas 		= getCanvas;

		function init(){
			canvas 			= document.createElement('canvas');
			ctx 				= canvas.getContext('2d');
			canvas.width 	= width;
			canvas.height 	= height;

			drawed_index 	= 0;
			search_num 	= 0;
		}

		function setGetText(t){
			getText = t;
			init();
		}

		function setGetPostion(p){
			getPostion = p;
			init();
		}

		function setLikeList(list){
			like_list = list;
			init();
		}

		function draw(){
			var result, pre_state;

			pre_state = 'done'
			setTimeout( drawing , 30)

			function drawing(){
				result = tryDraw()
				
				if( result === 'done'){
					if( pre_state !== result ){
						ee.emit('done');
					}
					setTimeout( drawing , 500);
				}else{
					if( pre_state === 'done' ){
						ee.emit('drawing');
					}

					if( result === 'change'){
						ee.emit('change');
						setTimeout( drawing , 30);
					}
					else if( result === 'collision'){
						ee.emit('collision');
						setTimeout( drawing , 30);
					}
				}

				pre_state = result;
			}
		}

		function tryDraw(){
			var len = like_list.length;
			var item, item_canvas, search_index, search_x, search_y;
			if( drawed_index >= len ) {
				return 'done'
			}

			item = like_list[drawed_index];
			item_canvas = getText(item, drawed_index, like_list.length);

			item_canvas = CanvasUtil.getFitCanvas(item_canvas);
			
			search_index = getPostion( item_canvas, width, height, search_num, drawed_index );
			search_num++;

			search_x = parseInt(search_index[0]);
			search_y = parseInt(search_index[1]);

			if( CanvasUtil.isCollision(canvas, item_canvas, search_x, search_y) ){
				return 'collision';
			} 

			ctx.drawImage(item_canvas, search_x, search_y);
			drawed_index++;

			return 'change';
		}

		function getCanvas(){
			return canvas;
		}
	}

	return ILike;
});