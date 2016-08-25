window.script = (function(){
	var activeClass	= "active",
		activeElt;
	function openPage(evt){
		
	}
	function scrollTo(elt){
		setTimeout(function(){
			$("html, body").animate({scrollTop: elt.offset().top }, 1000);
		}, 100);
	}
	var publicAPI = {
		openPage:openPage,
		scrollTo:scrollTo
	};
	return publicAPI;
})();

$(document).ready(function(){
	var header 	= $('header'),
		content	= document.querySelectorAll(".content");
/*	$(window).scroll(function() {
		var that = $(this);
		for (var i=0;i<content.length;i++){
			var elt 		= $(content[i]),
				whereAt 	= that.scrollBottom(),
				eltAt 		= elt.offset().top;
			if (whereAt > eltAt && whereAt-eltAt < 100){
				elt.hide();
				return elt.fadeIn(30);
			}
		}
	});*/
});

$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height(); 
};