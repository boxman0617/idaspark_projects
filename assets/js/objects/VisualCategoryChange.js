var VisualCategoryChange = {
	'_id': null,
	'_categories': [],
	'_i': 0,
	'_delay': 1000,

	'init': function(id) {
		this._id = id;

		if($('#'+this._id).length > 0) {
			var ref = this;
			this.getCategories(function(categories) {
				ref._categories = categories;
				ref.startTurning();
			});
		}
	},

	'startTurning': function() {
		var $cont = $('#'+this._id);
		$cont.css({
			'display': 'inline-block',
			'overflow': 'hidden',
			'position': 'relative'
		});
		var content = $cont.text();
		$cont.empty();
		var $div = $('<div>'+content+'</div>');
		$div.css({
			'position': 'absolute'
		});
		var size = $cont.css('font-size').replace('px', '');
		$cont.css({
			'text-align': 'center',
			'height': parseInt(size) + 10,
			'width': '100%'
		});
		$cont.append($div);

		this.turn();
	},

	'turn': function() {
		var $cont = $('#'+this._id);
		var $div = $cont.find('div');
		var width = $cont.width();
		if(!(this._i in this._categories)) {
			this._i = 0;
		}
		var $next = $('<div class="turn-next">'+this._categories[this._i].name+'</div>');
		$next.css({
			'position': 'absolute',
			'top': 50
		});
		$cont.append($next);
		$next.css({
			'left': (width / 2) - ($next.width() / 2)
		});
		$div.animate({
			'top': '-=50'
		}, {
			'complete': function() {
				$(this).remove();
			}
		});
		$next.animate({
			'top': '-=50'
		});

		this._i++;
		var ref = this;
		setTimeout(function() {
			ref.turn();
		}, this._delay);
	},

	'getCategories': function(next) {
		$.ajax({
	    'type': 'GET',
	    'url': '/get/categories',
	    'dataType': 'JSON',
	    'success': function(data){
	    	next(data);
	    }
		});
	}
};