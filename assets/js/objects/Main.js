var Main = {
	'init': function() {
		this.initHeadroom();
	},

	'initHeadroom': function() {
		var catHeading = document.getElementById('categories-navigation');
		var headroom  = new Headroom(catHeading);
		headroom.init();
	}
};