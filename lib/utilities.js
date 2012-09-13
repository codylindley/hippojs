
//utiliteis.js
hippo.each = function(object, callback){
	var name, i = 0, length = object.length;

	for (; i < length;){
		if (callback.call(object[i], i, object[i++]) === false){
			break;
		}
	}

	return object;
};