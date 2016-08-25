window.script = (function(){
	var activeClass	= "active",
		activeElt;
	function openPage(elt){
		if (elt.id == "logo")
			return scrollTo($("body"))
		scrollTo($("#"+elt.innerHTML));
	}
	function scrollTo(elt){
		setTimeout(function(){
			$("html, body").animate({scrollTop: (elt.offset().top - 100) }, 1000);
		}, 100);
	}
	var publicAPI = {
		openPage:openPage,
		scrollTo:scrollTo
	};
	return publicAPI;
})();

$(document).ready(function(){
	var header 		= $('header'),
		page		= document.querySelectorAll(".page"),
		body		= $("#body"),
		headerImg	= $("#header-img"),
		hdHeight 	= header.height(),
		hdImgHeight	= headerImg.height(),
		snapable	= true,
		bodyTop		= body.offset().top,
		scroller	= $("html, body");


	//Set the content-body underneath headerImg
	body.css("top", (hdHeight + hdImgHeight) );
	$(document).scrollStop(function() {
		var that = $(this);
		var whereWeAt 		= that.scrollTop(),
			snapTreshold	= 60;

		if (whereWeAt < hdImgHeight-snapTreshold){
			snapable = true;
		}else if (whereWeAt > hdImgHeight+snapTreshold){
			snapable = true;
		}else{
			if (snapable){
				scroller.animate({scrollTop: (hdImgHeight+5) }, 10);
				snapable = false;
			}
		}
	});

});


$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height(); 
};
$.fn.scrollStop = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  });
};
//,{
//		"title":"Cases",
//		"template":"",
//		"content":  [{
//			"h1":"Front-End",
//			"h2": "Building User Interfaces",
//			"p": [
//				"There's a special pleasure in building interfaces.",
//				"It's visual, it's wonderful to see people react to it and building it is wonderful."
//			]
//		},{
//			"h1":"Back-End",
//			"h2": "Orchestrating the Opera",
//			"p": [
//				"Building back-end services is very much like being the Producer of a movie.","You're not in the front, being the face of the product. In fact, if you're doing your job well, people aren't even noticing you at all.", "Seeing things flow in a orchestrated way, so smooth that people aren't even noticing the work being done, gives me a rare feeling of pleasure."]
//		}]
//	}*/