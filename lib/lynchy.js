// lynchy.js


function Lynchy(initialLives){
	this.life = initialLives;
}

Lynchy.prototype.catsluck = function (){
	this.life -= 1;
};

Lynchy.prototype.print = function (){
	if (this.life > 1) {
		console.log("Lynchy has " + this.life + " lives left!");
	} else if (this.life == 1) {
		console.log("Lynchy has one life left!");
	} else {
		console.log("Lynchy is a dead man.");
	}
};

Lynchy.prototype.isDead = function () {
	// body...
	return this.life < 1;
}

module.exports = Lynchy;

