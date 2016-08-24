window.script = (function(){
	var activeClass	= "active",
		activeElt;
	function openPage(elt){
		if (elt.innerHTML == "Home"){
			scrollTo($("header"));
			setTimeout(function(){
				activeElt.toggleClass(activeClass);
				activeElt=null;
			}, 1110)
			return;
		}else if (!activeElt){
			activeElt = $("#"+$(elt).html());
			scrollTo(activeElt);
			return activeElt.toggleClass(activeClass);
		}
		activeElt.toggleClass(activeClass);
		activeElt = $("#"+$(elt).html());
		activeElt.toggleClass(activeClass);
		scrollTo(activeElt);
	}
	function scrollTo(elt){
		setTimeout(function(){
			$("html, body").animate({scrollTop: elt.offset().top }, 1000);
		}, 100);
	}
	var publicAPI = {
		openPage:openPage
	};
	return publicAPI;
})();

$(document).ready(function(){
	var header 		= $('header'),
		stickyTitle = $("#stickyTitle"),
		headlines	= $(".headlines"),
		headerImg		= $(".header-img");
	try{
		Typekit.load({ async: true });
	}catch(e){
		console.log(e)
	}

	$(window).scroll(function() {
		if ($(this).scrollTop() > 150){
			headlines.hide();
			headerImg.hide();
			stickyTitle.show();
			header.addClass("sticky");
		}
		else{
			headlines.show();
			headerImg.show();
			stickyTitle.hide();
			header.removeClass("sticky");
		}
	
	});
});