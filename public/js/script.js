require.config({
	baseUrl: "/king"
});

require(['event'], function (event){
	
	var doc = document,
		ul = doc.querySelector('ul'),
		list = doc.querySelectorAll('li');

	event.addEvent(ul, 'click', function(e){
		var target = event.getTarget(e);
		alert(target.tagName);
	});

	event.addEvent(list[0], 'click', function(e){
		e = event.getEvent(e);
		var target = event.getTarget(e);
		alert(target.tagName);
		event.stopPropagation(e);
		event.preventDefault(e);
	});

});