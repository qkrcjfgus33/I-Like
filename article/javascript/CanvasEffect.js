define(['CanvasUtil'],function(CanvasUtil){
	function clipArc(ctx, x, y, r, f) {
		var temp = document.createElement('canvas'),
			temp_ctx = temp.getContext('2d');
															
		temp.width = ctx.canvas.width;
		temp.height = ctx.canvas.height;
			
		temp_ctx.translate(-temp.width, 0);
		temp_ctx.shadowOffsetX = temp.width;    
		temp_ctx.shadowOffsetY = 0;
		temp_ctx.shadowColor = '#000';
		temp_ctx.shadowBlur = f;
			
		temp_ctx.arc(x, y, r, 0, 2 * Math.PI);
		temp_ctx.closePath();
		temp_ctx.fill();


		ctx.save();
		ctx.globalCompositeOperation = 'destination-in';
		ctx.drawImage(temp, 0, 0);
		ctx.restore();
	}

	function clipEllipse(ctx, x, y, w, h, f) {
		var temp = document.createElement('canvas'),
			temp_ctx = temp.getContext('2d');
															
		temp.width = ctx.canvas.width;
		temp.height = ctx.canvas.height;
			
		temp_ctx.translate(-temp.width, 0);
		temp_ctx.shadowOffsetX = temp.width;    
		temp_ctx.shadowOffsetY = 0;
		temp_ctx.shadowColor = '#000';
		temp_ctx.shadowBlur = f;
		
		CanvasUtil.ellipse(temp_ctx, x, y, w, h);
		//temp_ctx.closePath();
		temp_ctx.fill();


		ctx.save();
		ctx.globalCompositeOperation = 'destination-in';
		ctx.drawImage(temp, 0, 0);
		ctx.restore();
	}

	return {
		clipArc		: clipArc,
		clipEllipse	: clipEllipse
	};
});