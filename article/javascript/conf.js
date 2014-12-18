(function(){
	var node_modules = '../../node_modules';

	require.config({
		paths: {
			'jquery' : node_modules + '/jquery/dist/jquery.min',
			'lodash' : node_modules + '/lodash/dist/lodash.min'
		}
	});

	require(['app'], function(app){
		app();
	});
})();
