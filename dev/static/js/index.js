var _parser = require("./lib/parser.js"),
		description,
		specification;

$(document).ready(function(){
	$('#description-editor > textarea').bind('input propertychange', function() {
	  _parser.descriptionUpdate(this.value);
	});
	$('#specification-editor > textarea').bind('input propertychange', function() {
	  _parser.specificationUpdate(this.value);
	});
	_parser.start();
});
