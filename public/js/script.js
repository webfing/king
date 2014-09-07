require.config({
	baseUrl: "/king"
});

require(['event', 'css'], function (event, css){
	
	var doc = document,
		ul = $('ul')[0],
		title = $("#id")[0],
		bin = $('button.bin')[0],
		debin = $('button.debin')[0],
		delbin = $('button.delbin')[0],
		list = $('li');

	var	dom = doc.getElementById('id');

	
	event.on(bin, 'click', function(e){
		event.on(ul, 'click.myclick', 'li', function(e){
			alert(e.target.tagName);
			alert(this.tagName);
			e.preventDefault();
		});
	});

	event.on(debin, 'click', function(e){
		event.off(ul);
	});

	event.on(delbin, 'click', function(e){
		doc.body.removeChild(ul);
	});


	//alert(css.support('box-sizing'));

});