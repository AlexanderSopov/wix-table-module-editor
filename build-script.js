"use strict";
var pug 	= require('pug'),
	utils	= require('./lib/utils.js');

// compile
/*
var fn = pug.compile('string of pug', options);
var html = fn(locals);
*/

var locals = {
	pageTitle: "My cock is delicious",
	youAreUsingPug: true
};

var options = {
	filename:"index.pug",
	compileDebug:false,
	pretty:true
};
// renderFile
var html = (pug.compileFile("index.pug",options))(locals);

console.log(html);

utils.build(html);

