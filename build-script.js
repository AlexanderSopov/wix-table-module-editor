"use strict";
var utils	= require('./lib/utils.js'),
	html 	= {
				locals: utils.getLocals(),
				options:{
					filename:"index.pug",
					compileDebug:true,
					pretty:false
				},
				path: "./templates/index.pug"
			},
	babel 	= {
		srcPath: "./static/js/script.js",
		destPath: "./dist/js/script.js",
		options: {
			minified: true,
			comments: false,

		}
	}

utils.build(html, "./static/css/style.styl", babel);




