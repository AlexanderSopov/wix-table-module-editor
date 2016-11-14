window._func = (function(){
	var activeTab 		= document.getElementById("description"),
			activeContent = document.getElementById("description-content");

	var openTab = function(el){
		if (el == activeTab)
			return;
		if(activeTab)
			toggleClass(activeTab, "active");
		if(activeContent)
			toggleClass(activeContent, "active-content");
		activeTab = el;
		activeContent = document.getElementById(el.id + "-content");
		toggleClass(activeTab, "active");
		toggleClass(activeContent, "active-content");
	}

	var toggleClass = function(el, className){
		if (el.classList) {
		  el.classList.toggle(className);
		} else {
		  var classes = el.className.split(' ');
		  var existingIndex = classes.indexOf(className);
		  if (existingIndex >= 0)
		    classes.splice(existingIndex, 1);
		  else
		    classes.push(className);
		  el.className = classes.join(' ');
		}
	}
	return {openTab:openTab};
})();
