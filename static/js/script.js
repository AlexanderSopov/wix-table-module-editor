$(document).ready(function(){
	setTimeout(function() {script.init();},150);
	testOp();
});
function testOp(){
}

/*
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!	 MAIN-M	 !!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 */

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









/*
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!	 NAVBAR	 !!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 */



	var nav = (function(){
		var isExpanded,
			activeLink,
			navbar,
			pages,
			ruler,
			offset,
			winHeight;
		function init(){
			isExpanded 	= false;
			navbar		= $("#navbar");
			ruler 		= navbar.find("hr");
			activeLink 	= navbar.find("ul .active");
			pages		= [];
			tresholds	= [];
			offset		= 0,
			winHeight	= $(window).height();
			var startAt = hdHeight+hdImgHeight;
			$("#navbar ul li").each(function(i,e){
				$(e).hover(help.hoverActive, help.hoverInactive);
			});
			$(".page").each(function(i,e){
				pages.push($(e));
				tresholds.push({
					startAt: startAt,
					height: pages[i].height()
				});
				startAt += tresholds[i].height;
			});
			headerImg.on("click", help.shrink);
			body.on("click", help.shrink);
			$(window).scroll(scrollHandler);
			animateNavbar(0,0);
		}
		function toggle(){
			if(isExpanded)
				return help.shrink();
			help.expand();
		}
		function goTo(elt){
			if (elt.id == "logo"){
				utils.scrollTo($("body"))
				if(isExpanded)
					help.shrink();
			}else if(isExpanded){
				var je = $(elt);
				var id ="#" + je.attr("data-value");
				if(je.hasClass("active")){
					je.toggleClass("active");
					activeLink.toggleClass("active");
				}
				utils.scrollTo($(id));
				setTimeout(function(){help.shrink();},100);
			}
		}
		//Private Methods
		function scrollHandler(){
			var weAreAt = $(document).scrollTop(),
				lastTsh	= tresholds.length-1;
			for (var i = lastTsh; i>= 0; i--)
				if (passedTreshold(tresholds[i], weAreAt))
					return animate(weAreAt, i);
		}
		function passedTreshold(tsh, pos){
			if (pos > tsh.startAt)
				return true;
			return false;
			//var link = $("#"+$elt.attr("id")+"-nav");
		}
		function animate(pos, i){
			animateRuler(pos, i);
			animateNavbar(pos, i)

		}
		function animateRuler(pos, i){
			var tsh 		= tresholds[i],
				offset		= 5,
				relPos		= pos - tsh.startAt,
				progress	= relPos / tsh.height;
				pxl			= (hdHeight * i) + (hdHeight * progress),
				pxl			= pxl - offset;
			ruler.css("top", pxl + "px");
		}
		function animateNavbar(pos, i){
			var tsh 	= tresholds[i],
				offset	= 0.45 * tsh.height,
				relPos 	= pos - tsh.startAt;
			if ((tsh.height-offset) < relPos)
				moveNavbar(relPos-tsh.height+offset, offset, i);
			else
				help.roundNav(i)
		}

		function moveNavbar(pos, offset, i){
			var progress 	= pos / offset,
				height 		= hdHeight*i + hdHeight*progress,
				height 		= height * -1;
			console.log(
				"pos", pos,
				"\noffset", offset,
				"\ni",i,
				"\nheight", height);
			navbar.css("top", height +"px");
		}

		var help = (function(){
			var tmpNavOffset = 0;
			function roundNav(i){
				navbar.css("top", (hdHeight*i*-1) + "px")
			}
			function hoverActive(){
				$(this).toggleClass("hover");
			}
			function hoverInactive(){
				$(this).toggleClass("hover");
			}

			function expand(){
				if(!isExpanded){
					header.css("height", hdHeight*pages.length + "px");
					tmpNavOffset = navbar.css("top");
					navbar.css("top", "0px");
					isExpanded = true;
				}
			}
			function shrink(){
				if(isExpanded){
					header.css("height", hdHeight + "px");
					offset = navbar.css("top");
					navbar.css("top",tmpNavOffset);
					isExpanded = false;			
				}
			}
			return {
				shrink:shrink,
				expand:expand,
				hoverActive:hoverActive,
				hoverInactive:hoverInactive,
				roundNav:roundNav
			};
		})();
		return {
			toggle:toggle,
			goTo:goTo,
			init:init
		};
	})();









/*
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!	  UTILS	 !!!!!!!
 *			!!!!!!!			 !!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!
 */






	var utils = (function(){
		function init(){
			$(document).scrollStop(snapToHeader);
		}
		function scrollTo(elt){
			setTimeout(function(){
				$("html, body").animate({scrollTop: (elt.offset().top - 100) }, 3000);
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
		return {
			init:init,
			scrollTo:scrollTo
		}
	})();
/*
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!	 		  !!!!!!!
 *			!!!!!!! jQPlugins !!!!!!!
 *			!!!!!!!			  !!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 *			!!!!!!!!!!!!!!!!!!!!!!!!!
 */
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