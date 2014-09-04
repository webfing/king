define(['util'], function(util){

//remake
/*
	很多人可能会想，事件绑定有什么难的，不就是判断下浏览器类型，做下兼容处理，
	最多三二行的代码量。是的！如果只是简单的绑定几个事件是够了，但是如果想把绑
	定写得更稳定，更健壮，就有很多事情要处理了，比如如下问题:
	1. 原生的删除只能删除指定的事件，对于匿名函数，无能为力, 如何解决匿名函数的删除及事件的全删除，
	2. 原生事件绑定，相同函数只能绑一次，但是同一个函数，同一dom，绑多次的可能性很大
	3. 没法实现事件委托，这点很重要
	4. 各浏览器的事件对象e表现不一致，需要封返回一致的对象
	5. 需要更人性化的接口
*/

//todo-学习思考
/*
	1. 如何确定唯一DOM元素,如果把handler挂在dom属性里会不会有内存泄露问题
		(具体问题具体分析)
	2. 正则exec如果没有配置项结果是空数组，还是null (null)
	3. 一个dom被删除，绑定在他身上的对象会被移除吗？
		(得看是什么浏览器，是否有循环绑定)
 */
	
	var eventIdReg = /(\w+)(?:\.(\w+))?/;	//分隔事件类型与事件标识(click.id)

	/*
	保存事件函数
	 */
	function _saveHandler(elem, type, handler, id){
		
		//dom第一次绑定事件
		if (!elem.events){
			elem.events = {};
		}
		var eventHandlerStore = elem.events;

		if (!type || !handler) return;
		if (!id){
			id = handler.id;
		}
		if (!eventHandlerStore[id]){
			eventHandlerStore[id] = [
				{
					type: type,
					handler: handler
				}
			];
		}else{
			eventHandlerStore[id].push({
				type: type,
				handler: handler
			})
		}
	}

	function addEvent (elem, type, handler){
			
		var eventIdMatch = eventIdReg.exec(type);
		type = eventIdMatch[1];
		var id = eventIdMatch[2];
		if (!id){
			if (handler.id){
				id = handler.id;
			}else{
				id = new Date().getTime();
				handler.id = id;
			}
		}

		/*
		包裹一层，使传入相同的函数时可能彼此区别，这样来解决同一处理不能绑定多数的bug
		并处理事件对象e的兼容
		 */
		var newHandler = function(e){
			e = _getEvent(e);
			handler.call(elem, e);
		};
		newHandler.id = id;

		//包存事件函数
		_saveHandler(elem, type, newHandler, id);

		//兼容处理
		if (window.addEventListener){
			elem.addEventListener(type, newHandler, false);
		}else{
			elem.attachEvent('on'+type, newHandler);
		}
	};

	var _deleteEvent = window.removeEventListener?
		function (elem, type, handler){
			elem.removeEventListener(type, handler);
		}:
		function (elem, type, handler){
			elem.detachEvent('on'+type, handler); 
		};

	function _removeHandler(elem, type, id, handler){

		var len = arguments.length,
			handlerMap = elem.events;

		if (handler&& handler.id){
			id = handler.id;
		}

		//没有存任何数据，则无需解绑
		if (!handlerMap) return;

		//没指定事件类型，则全解绑
		if (!type){
			for(var i in handlerMap){
				var events = handlerMap[i];
				if (!events) return;
				for(var m=0; m<events.length; m++){
					var curEvent = events[m];
					_deleteEvent(elem, curEvent.type, curEvent.handler);
				}
			}
			elem.events = null;

		//有事件类型，但没有id
		}else if(!id){
			for(var i in handlerMap){
				var events = handlerMap[i];
				if (!events) return;
				for(var m=0; m<events.length; ){
					var curEvent = events[m];
					if (curEvent.type==type){
						_deleteEvent(elem, curEvent.type, curEvent.handler);
						events.splice(m,1);
					}
				}
			}

		//具体到指定id的事件集合里
		}else{
			var events = handlerMap[id];
			if (!events) return;
			for(var m=0; m<events.length; ){
				var curEvent = events[m];
				if (curEvent.type==type){
					_deleteEvent(elem, curEvent.type, curEvent.handler);
					events.splice(m,1);
				}
			}
		}
	}

	function removeEvent (elem, type, handler){
		var id;
		if (type){
			var eventIdMatch = eventIdReg.exec(type);
			type = eventIdMatch[1];
			id = eventIdMatch[2];
		}
		_removeHandler(elem, type, id, handler);
	}

	function _getEvent (e){
		return e||window.event;
	};

	function _getTarget (e){
		return e.target || e.srcElement;
	};

	function _stopPropagation (e){
		if (e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	};

	function _fixEvent(e){
		e = e || window.event;
		if (!e.target){
			e.target = e.srcElement;
		}
		if (!e.preventDefault){
			e.preventDefault = function(){
				e.returnValue = false;
			}
		}
		if (!e.stopPropagation){
			e.stopPropagation = function(){
				e.cancelBubble = true;
			}
		}
	}

	function _preventDefault (e){
		if (e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}

	function on (elem, type, childNode, handler){
		if(util.isFunction(childNode)){
			handler = childNode;
			addEvent(elem, type, handler);
		}else{
			childNode = childNode.toUpperCase();
			var id;
			if (handler.id){
				id = handler.id;
			}else{
				id = new Date().getTime();
				handler.id = id;
			}

			var newHandler = function(e){
				e = _getEvent(e);
				var target = e.target;
				while(target.tagName.toUpperCase() != childNode){
					if (target==elem) return;
					target = target.parentNode;
				}
				handler.call(target, e);
			};
			newHandler.id = id;
			
			addEvent(elem, type, newHandler);
		}
	}

	return {
		on: on,
		off: removeEvent
	}
})