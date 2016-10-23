"use strict";
var	fs		= require('fs'),
	pug 	= require('pug'),
	stylus	= require('stylus');

module.exports = (function(){
	function build(html,cssPath){
		mkdir("./build")
		var css = fs.readFileSync(cssPath, "utf8");
		stylus(css).render(function(err, css){
			if (err)
				throw err;
			mkdir("./templates/css");
			fs.writeFileSync("./templates/css/style.css", css)
		});
		fs.writeFileSync("./build/index.html", (pug.compileFile(html.path,html.options))(html.locals))
		copyStatics();
	}

	function getLocals(){
		return JSON.parse(fs.readFileSync("./locals.json", "utf8"));
	}

	function copyStatics(){
		mkdir("./build/js");
		//TODO: MAKE THIS INTO A BABEL COMMAND
		fs.writeFileSync("./build/js/script.js", fs.readFileSync("./static/js/script.js","utf8"));
		var images = fs.readdirSync("./static/img");
		mkdir("./build/img");
		for (var i in images)
			fs.writeFileSync("./build/img/" + images[i], fs.readFileSync("./static/img/"+images[i]));
	}

	function mkdir(path){
		var pathArr 	= path.split("/"),
			walkedPath	= "";
		for (var i = 0; i<pathArr.length-1;i++){
			var found = false;
			walkedPath += pathArr[i] + "/";
			var folderArr = fs.readdirSync(walkedPath);
			for (var j in folderArr){
				if(folderArr[j] == pathArr[i+1]){
					found = true;
					break;
				}
			}
			if(!found)
				fs.mkdirSync(walkedPath + "/" + pathArr[i+1]);
		}
					
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