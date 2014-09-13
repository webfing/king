
function sku(){
	var skuList = {
		'a-b-d-e': {stock: 1},
		//'a-b-D-e': {stock: 1},
		'A-B-D-E': {stock: 2}
	};

	var skuMap = {};

	for (var key in skuList){
		var keyArr = key.split('-');
		var keyVal = skuList[key];
		iterate(keyArr, keyVal, '', 0);
	}


	function iterate(keyList, keyVal, prefix, index){
		if (index>=keyList.length) return;
		for (var i=index; i<keyList.length; i++){
			var newPrefix = prefix+keyList[i];
			skuMapMeta(newPrefix, keyVal);
			var newIndex = i+1;
			iterate(keyList, keyVal, newPrefix, newIndex);
		}
	}

	function skuMapMeta(key, val){
		if (skuMap[key]){
			skuMap[key].stock+=val.stock;
		}else{
			skuMap[key] = {
				stock: val.stock
			}
		}
	}
}

var searchArr = [1, 3, 5, 7, 9, 11, 14, 17, 19, 20];
var searchNum = 20;

function binarySearch(target, arr, start, end){
	var offset = end-start;
	if (offset<=1){
		if (target == arr[start]){
			return start;
		}
		if (target == arr[end]){
			return end;
		}
	}else{
		var middlePot = start+parseInt(offset/2); 1
		var middle = arr[middlePot];
		if (start>end){
			return -1;
		}
		if (target == middle){
			return middlePot;
		}else if (target>middle){
			return binarySearch(target, arr, middlePot+1, end);
		}else{
			return binarySearch(target, arr, start, middlePot-1);
		}
	}
}

console.log(binarySearch(searchNum, searchArr, 0, searchArr.length-1));



var maxX = 3;
var maxY = 3;

var totalPath = [];

var flag = [
    [1, 1], [2, 1], [1, 2], [2, 2]
]

var flagObj = {};
ignorePot();

var start = [0, 0];
var end = [2, 3];

path.push(start);

potRecursion(null, start, '');

function ignorePot(pot){
    if (!pot){
        for(var i=0,j=flag.length;i<j;i++){
            flagObj[flag[i].toString()] = true;
        }
    }else{
         flagObj[pot.toString()] = true;       
    }
}

function potRecursion(fromPot, toPot, path){
    
    if(fromPot){
        ignorePot(fromPot);
    }
    if (checkPot(toPot) && fixPot(toPot)){
        path += '-'+toPot;
        if (toPot.toString() == end.toString()){
            return totalPath.push(path);
        }
        var left = [toPot[0]-1, toPot[1]];
        var top = [toPot[0], toPot[1]-1];
        var right = [toPot[0]+1, toPot[1]];
        var bottom = [toPot[0], toPot[1]+1];
        potRecursion(toPot, left, path);
        potRecursion(toPot, top, path);
        potRecursion(toPot, right, path);
        potRecursion(toPot, bottom, path);
    }
}

function fixPot(pot){
    if(pot[0]<0||pot[1]<0||pot[0]>maxX||pot[1]>maxY){
        return false;
    }
    return true;
}

function checkPot(pot){
    var potStr = pot.toString();
    if(potStr in flagObj){
        return false;
    }
    return true;
}