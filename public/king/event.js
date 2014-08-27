define(function(){
	
	var addEvent,
		removeEvent,
		getEvent,
		getTarget,
		stopPropagation,
		preventDefault,
		on;

	addEvent = window.addEventListener? 
		function (elem, type, handler){
			elem.addEventListener(type, handler, false);
		}:
		function(elem, type, handler){
			elem.attachEvent('on'+type, function(){
				handler.call(elem, window.event);
			})
		};

	removeEvent = window.removeEventListener?
		function (elem, type){
			elem.removeEventListener(type);
		}:
		function (elem, type){
			elem.detachEvent('on'+type);
		};

	getEvent = function(e){
		return e||window.event;
	};

	getTarget = function(e){
		return e.target || e.srcElement;
	};

	stopPropagation = function(e){
		if (e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	};

	preventDefault = function(e){
		if (e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}

	on = function(elem, type, childSelctor, handler){
		
	}


	return {
		addEvent: addEvent,
		removeEvent: removeEvent,
		getEvent: getEvent,
		getTarget: getTarget,
		stopPropagation: stopPropagation,
		preventDefault: preventDefault
	}
})