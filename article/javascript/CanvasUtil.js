define(function(){
	function ellipseByCenter(ctx, cx, cy, w, h) {
		ellipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
	}

	function ellipse(ctx, x, y, w, h) {
		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle

		ctx.beginPath();
		ctx.moveTo(x, ym);
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		//ctx.closePath(); // not used correctly, see comments (use to close off open path)
		ctx.stroke();
	}

	function isCollision(layer, sprite, x, y){
		var sprite_ctx 		= sprite.getContext('2d'),
			sprite_width		= sprite.width,
			sprite_height	= sprite.height,
			sprite_imgData	= sprite_ctx.getImageData(0,0, sprite_width, sprite_height);

		var layer_ctx 		= layer.getContext('2d'),
			layer_width		= layer.width,
			layer_height		= layer.height,
			layer_imgData	= layer_ctx.getImageData(x, y, sprite_width, sprite_height);

		var i_x, i_y;

		for(i_x = 0 ; i_x < sprite_width ; i_x++){
			for(i_y = 0 ; i_y < sprite_height ; i_y++){
				if(existed(sprite_imgData, i_x, i_y)){
					if(existed(layer_imgData, i_x, i_y)){
						return true;
					}
				}
			}
		}

		return false;
	}

	function existed(imgData, x, y){
		x = parseInt(x);
		y = parseInt(y);
		var rgba = getData(imgData, x, y);
		if(rgba[3] === 0){
			return false;
		}
		return true;
	}

	function getFitCanvas(canvas){
		var ctx 		= canvas.getContext('2d'),
			height	= canvas.height,
			width	= canvas.width,
			imgData 	= ctx.getImageData(0,0, width, height);

		var fit_x	= -1,
			fit_y	= -1,
			fit_w	= -1,
			fit_h	= -1;

		var x, y;

		search_fit_x:
		for( x = 0 ; x < width ; x++){
			for( y = 0 ; y < height ; y++){
				if(existed(imgData, x, y)){
					fit_x = x;
					break search_fit_x;
				}
			}
		}

		search_fit_y:
		for( y = 0 ; y < height ; y++){
			for( x = 0 ; x < width ; x++){
				if(existed(imgData, x, y)){
					fit_y = y;
					break search_fit_y;
				}
			}
		}

		search_fit_w:
		for( x = width-1 ; x > -1  ; x--){
			for( y = 0 ; y < height ; y++){
				if(existed(imgData, x, y)){
					fit_w = x - fit_x + 1;
					break search_fit_w;
				}
			}
		}

		search_fit_h:
		for( y = height-1 ; y > -1 ; y--){
			for( x = 0 ; x < width ; x++){
				if(existed(imgData, x, y)){
					fit_h = y - fit_y + 1;
					break search_fit_h;
				}
			}
		}

		var result_canvas 	= document.createElement('canvas'),
			result_ctx		= result_canvas.getContext('2d');
		result_canvas.width 	= fit_w;
		result_canvas.height	= fit_h;
		result_ctx.drawImage(canvas, fit_x, fit_y, fit_w, fit_h, 0, 0, fit_w, fit_h);

		return result_canvas;
	}

	function getData(imgData, x, y){
		x = parseInt(x);
		y = parseInt(y);
		
		var width	= imgData.width,
			data 	= imgData.data,
			index	= (y*width+x)*4;

		return [ data[index + 0] , data[index + 1] , data[index + 2] , data[index + 3] ] 
	}

	return {
		ellipse 			: ellipseByCenter,
		existed			: existed,
		isCollision		: isCollision,
		getFitCanvas	: getFitCanvas,
		getData 			: getData
	};
});