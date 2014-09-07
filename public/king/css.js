define(['util'], function(util){

	
	function getCss(elem, key){
		var computed,
			style;
		computed = _getComputedStyle(elem);
		camekey = _cameCase(key);
		style = computed.getPropertyValue? computed.getPropertyValue(key): computed[camekey];
		return style;
	} 

	function setCss(elem, key, value){

	}

	var support = (function(){

		var bodyComputed = _getComputedStyle(document.body);

		return function(key){
			var camekey = _cameCase(key);
			if (camekey in bodyComputed){
				return true;
			}			
			return false;
		}

	})();


	function _getComputedStyle(elem){
		return computed = window.getComputedStyle? getComputedStyle(elem): elem.currentStyle;
	}

	function _cameCase(key){
		key = key.replace(/^-/,'');
		var reg = /-([a-z])/g;
		return key.replace(reg, function($, $1){
			return $1.toUpperCase();
		});
	}

	return {
		get: getCss,
		set: setCss,
		support: support
	}

});