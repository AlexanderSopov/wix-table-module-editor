"use strict";
var	fs		= require('fs');

module.exports = (function(){
	function build(html){
		//mkdir("build/");
		fs.writeFileSync("./build/index.html", html)
	}

	//TODO: FIX THIS FUNCTION - ITS VERY BUGGY!!! OR! USE A LIB!
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
	}
	var publicApi = {
		build:build
	};
	return publicApi;
})();