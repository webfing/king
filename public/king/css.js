define(['util'], function(util){

	
	function getCss(elem, key){
		var computed,
			unitReg = /(em|%)/gi,
			style;
		computed = _getComputedStyle(elem);
		camekey = _cameCase(key);
		style = computed.getPropertyValue? computed.getPropertyValue(key): computed[camekey];
		if (unitReg.test(style)){
			if (camekey == 'fontSize'){
				return _transunit(elem, 1);
			}
			return _transunit(elem, parseFloat(style));
		}
		return parseFloat(style);
	} 

	function setCss(elem, key, value){

		var inlineStyle = elem.style;
		if (typeof key == 'object'){
			for (var i in key){
				_set(i, key[i]);
			}
		}else{
			_set(key, value);
		}

		function _set(k, v){
			k = _cameCase(k);
			inlineStyle[k] = v;
		}
	}

	function _transunit(elem, relVal){
		var computedLeft = elem.currentStyle.left;
		var styleLeft = elem.style.left;
		elem.runtimeStyle.left = computedLeft;
		elem.style.left = relVal+'em';
		var absVal = elem.style.pixelLeft;
		elem.style.left = styleLeft;
		elem.runtimeStyle.left = '';
		return absVal;
	}

	function _fixunit(){
		
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