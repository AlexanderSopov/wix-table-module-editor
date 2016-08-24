"use strict";
var	fs		= require('fs'),
	pug 	= require('pug'),
	stylus	= require('stylus');

module.exports = (function(){
	function build(html,cssPath){
		fs.writeFileSync("./build/index.html", (pug.compileFile(html.path,html.options))(html.locals))
		var css = fs.readFileSync(cssPath, "utf8");
		stylus(css).render(function(err, css){
			if (err)
				return console.log(err);
			fs.writeFileSync("./build/css/style.css", css)
		});
		fs.writeFileSync("./build/js/script.js", fs.readFileSync("./static/js/script.js","utf8"));
	}

	function getLocals(){
		return JSON.parse(fs.readFileSync("./locals.json", "utf8"));
	}

	var publicApi = {
		build:build,
		getLocals:getLocals
	};
	return publicApi;



	/*	//TODO: FIX THIS FUNCTION - ITS VERY BUGGY!!! OR! USE A LIB!
	function mkdir(path){
		var pathArray 	= path.split("/"),
			currentPath	= "/";
		console.log(pathArray);
		for (let i in pathArray)
			if (!exists(pathArray, i))
				createDir();
		function exists(array, i){
			var dir = fs.readdirSync(currentPath);
			currentPath += array[i]+"/";
			for (let j in dir)
				if (array[i]==dir[j])
					return true;
			return false;
		}
		function createDir(){
			fs.mkdirSync(currentPath);
		}
	}*/
})();