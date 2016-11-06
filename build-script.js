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
			},
	babel 	= {
		srcPath: "./static/js/index.js",
		destPath: "./dist/js/bundle.js",
		presets: ["es2015"],
		options: {
			minified: false,
			comments: true,
		}
	}

utils.build(html, "./static/css/style.styl", babel);




