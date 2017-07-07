//TODO use window.location.hash for navigation.
function load(url){
	document.getElementById("content").innerHTML = response.html;
	document.title = response.pageTitle;
	window.history.pushState({src : response.html,title : response.pageTitle}, "", url);
}

window.onpopstate = function(e){
	if(e.state){
		document.getElementById("content").innerHTML = e.state.src;
		document.title = e.state.title;
	}
};


