
//class.js
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};