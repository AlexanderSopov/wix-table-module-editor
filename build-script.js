"use strict";
var utils	= require('./lib/utils.js'),
	html 	= {
				locals: utils.getLocals(),
				options:{
					filename:"index.pug",
					compileDebug:true,
					pretty:true
				},
				path: "./templates/index.pug"
			};

utils.build(html, "./static/css/style.styl");




