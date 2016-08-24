window.script = (function(){
	var activeClass	= "active",
		activeElt;
	function openPage(elt){
		if (elt.innerHTML == "Home"){
			activeElt.toggleClass(activeClass);
			activeElt=null;
			return;
		}else if (!activeElt){
			activeElt = $("#"+$(elt).html());
			return activeElt.toggleClass(activeClass);
		}
		activeElt.toggleClass(activeClass);
		activeElt = $("#"+$(elt).html());
		activeElt.toggleClass(activeClass);
	}
	var publicAPI = {
		openPage:openPage
	};
	return publicAPI;
})();

$(document).ready(function(){
	try{
		Typekit.load({ async: true });
	}catch(e){
		console.log(e)
	}
});