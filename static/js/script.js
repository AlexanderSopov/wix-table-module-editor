$(document).ready(function(){
	script.init();
});
window.script = (function(){
	var activeClass,
		header,
		page,
		body,
		headerImg,
		hdHeight,
		hdImgHeight,
		snapable,
		bodyTop,
		scroller,
		activeElt;
	function init(){
		(function setVariables(){
			activeClass	= "active",
			header 		= $('header.stickyHD'),
			page		= document.querySelectorAll(".page"),
			body		= $("#body"),
			headerImg	= $("#header-img"),
			hdHeight 	= header.height(),
			hdImgHeight	= headerImg.height(),
			snapable	= true,
			bodyTop		= body.offset().top,
			scroller	= $("html, body");
		})();
		(function initSubModules(){
			nav.init();
			jQPlugins.init();
			utils.init();
		})();

		body.css("top", (hdHeight + hdImgHeight) );
	}
	var nav = (function(){
		var isOpen,
			active,
			navbar,
			pages;
		function init(){
			isOpen 		= false;
			active 		= $("#navbar ul .active"),
			navbar		= $("#navbar"),
			pages		= [];
			$("#navbar ul li").each(function(i,e){
				$(e).hover(hoverActive, hoverInactive);
			});
			$(".pages").each(function(i,e){
				pages.push($(e));
			});
			headerImg.on("click", shut);
			body.on("click", shut);
			$(window).scroll(setActive);
		}
		function toggle(){
			if(isOpen)
				return shut();
			open();
		}
		function goTo(elt){
			if (elt.id == "logo"){
				utils.scrollTo($("body"))
				if(isOpen)
					return shut();
			}else if(isOpen){
				utils.scrollTo($("#"+elt.innerHTML));
				return shut();
			}
		}
		//Private Methods
		function open(){
			if(!isOpen){
				header.css("height", hdHeight*pages.length + "px");
				isOpen = true;
			}
		}
		function shut(){
			if(isOpen){
				header.css("height", hdHeight + "px");
				isOpen = false;			
			}
		}
		function hoverActive(){
			$(this).toggleClass("active");
			active.toggleClass("active");
		}
		function hoverInactive(){
			$(this).toggleClass("active");
			active.toggleClass("active");
		}
		function setActive(){
			for (var i = pages.length-1; i>= 0; i--){
				if (utils.isPassed(pages[i]))
					return activate(pages[i]);
			}
		}
		function activate($elt){
			$elt.toggleClass(".active");
			active.toggleClass(".active");
			active = $elt;
		}
		return {
			toggle:toggle,
			goTo:goTo,
			init:init
		};
	})();
	var utils = (function(){
		function init(){
			$(document).scrollStop(snapToHeader);
		}
		function scrollTo(elt){
			setTimeout(function(){
				$("html, body").animate({scrollTop: (elt.offset().top - 100) }, 1000);
			}, 100);
		}
		function snapToHeader() {
			var that	 		= $(this),
				whereWeAt 		= that.scrollTop(),
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
		}
		function isPassed($elt){
			if ($(document).scrollTop() > $elt.offset().top)
				return true;
			return false;
		}
		return {
			init:init,
			scrollTo:scrollTo,
			isPassed:isPassed
		}
	})();
	var jQPlugins = (function(){
		function init(){
			$.fn.scrollToBottom = scrollToBottom;
			$.fn.scrollStop = scrollStop;
		}
		function scrollToBottom() { 
			return $(document).height() - this.scrollTop() - this.height(); 
		}
		function scrollStop(callback) {
			var that = this, $this = $(that);
			$this.scroll(function(ev) {
				clearTimeout($this.data('scrollTimeout'));
				$this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
			});
		};
		return {
			init:init
		};
	})();

	
	var publicAPI = {
		scrollTo:scrollTo,
		init:init,
		nav:nav
	};
	return publicAPI;
})();



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