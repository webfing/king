define(function(){

	/*
	类型判断
	 */
	function _isType (obj, type){
		return Object.prototype.toString.call(obj) == '[object '+type+']';
	};
	function isDom (obj){
		return (!!obj.nodeType && !!obj.appendChild);
	}
	function isFunction (obj){
		return _isType(obj, 'Function');
	}
	function isArray (obj){
		return _isType(obj, 'Array');
	}
	function isString (obj){
		return _isType(obj, 'String');
	}
	/*
	是否为纯粹的object对象，排除dom对象
	 */
	function isPureObject  (obj){
		return _isType(obj, 'Object') && !obj.nodeType;
	}
	function isObject  (obj){
		return _isType(obj, 'Object');
	}
	function isNumber  (obj){
		return _isType(obj, 'Number');
	}

	/*
	对象复制
	 */
	function extend(destination, sources) {

	}

	return {
		isDom: isDom,
		isFunction: isFunction,
		isArray: isArray,
		isString: isString,
		isPureObject: isPureObject,
		isObject: isObject,
		isNumber: isNumber
	}
})