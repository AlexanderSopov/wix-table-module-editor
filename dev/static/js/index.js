var _updater = require("./lib/updater.js");
$(document).ready(function(){
	$('#description-editor > textarea').bind('input propertychange', function() {
	  _updater.descriptionUpdate(this.value);
	});
	$('#specification-editor > textarea').bind('input propertychange', function() {
	  _updater.specificationUpdate(this.value);
	});
	_updater.start();
});
