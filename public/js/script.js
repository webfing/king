require.config({
	baseUrl: "/king"
});

require(['event'], function (event){
	console.log(event.addEvent);
});