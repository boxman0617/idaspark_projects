// On Ready
$(function() {
	var catHeading = document.getElementById('categories-navigation');
	var headroom  = new Headroom(catHeading);
	headroom.init();
});