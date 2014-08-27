define(function(){
	var addEvent = window.addEventListener? 
		function (elem, type, handler){
			elem.addEventListener(type, handler, false);
		}:
		function(elem, type, handler){
			elem.attachEvent('on'+type, function(){
				handler.call(elem, window.event);
			})
		}

	return {
		addEvent: addEvent
	}
})