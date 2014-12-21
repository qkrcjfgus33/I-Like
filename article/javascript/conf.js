(function(){
	var node_modules = '../../node_modules';

	require.config({
		paths: {
			'jquery' 		: node_modules + '/jquery/dist/jquery.min',
			'lodash' 		: node_modules + '/lodash/dist/lodash.min',
			'bootstrap'		: node_modules + '/bootstrap/dist/js/bootstrap.min',
			'EventEmitter'	: node_modules + '/wolfy87-eventemitter/EventEmitter.min'
		},
		shim : {
			'bootstrap' : { 'deps' :['jquery', 'css!' + node_modules + '/bootstrap/dist/css/bootstrap.min'] }
		},
		map: {
			'*': {
				'css':  node_modules+ '/require-css/css' // or whatever the path to require-css is
			}
		},
		deps:['']
	});

	require(['app', 'jquery', 'bootstrap'], function(app, $){
		$.noConflict( true );
		app();
	});
})();
