function Patch(x, y, index) {
	this.a = false; //active or not
	this.innerNeighbors = [];
	this.outerNeighbors = [];
	this.pos = new p5.Vector(x, y);
	this.index = index;
	this.innerNdebug = false;
	this.outerNdebug = false;
	this.proximate = [];
	

}

Patch.prototype.update = function(){
	var inhibitor = 0;
	var activator = 0;
	this.innerNeighbors.forEach(function(n){
		if(n.a){
			activator++;
		};
	});
	this.outerNeighbors.forEach(function(n){
		if(n.a){
			inhibitor++;
		};
	})
	var difference = activator - ratio * inhibitor;
	if(difference>0){
		this.a = true;
	} else if(difference<0){
		this.a = false;
	}; 
	
}

Patch.prototype.setup = function(){

	this.a = false;

	if(random(100)<initialDensity){
		this.a = true;
	};


	this.setProximate(outerXRadius, outerYRadius);
	this.setInnerNeighbors(innerXRadius, innerYRadius);
	this.setOuterNeighbors(innerXRadius, innerYRadius, outerXRadius, outerYRadius);
	//console.log('setup')


}

Patch.prototype.setInnerNeighbors = function(xRadius, yRadius){
	this.innerNeighbors = [];
  	for(var i = 0; i<this.proximate.length;i++){
  		var p = this.proximate[i];
		var xDist = abs(p.pos.x-this.pos.x);
		var yDist = abs(p.pos.y-this.pos.y);
		var elps = pow(xDist, 2) / pow(xRadius, 2) + pow(yDist, 2) / pow(yRadius, 2);
		if(1>=elps){
			this.innerNeighbors.push(p);	
		}
  	}
}


Patch.prototype.setOuterNeighbors = function(innerXRadius, innerYRadius, outerXRadius, outerYRadius){
	this.outerNeighbors = [];
  	for(var i = 0; i<this.proximate.length;i++){
  		var p = this.proximate[i];
		var xDist = abs(p.pos.x-this.pos.x);
		var yDist = abs(p.pos.y-this.pos.y);
		var elps1 = pow(xDist, 2) / pow(innerXRadius, 2) + pow(yDist, 2) / pow(innerYRadius, 2);
		var elps2 = pow(xDist, 2) / pow(outerXRadius, 2) + pow(yDist, 2) / pow(outerYRadius, 2);
		if(1<elps1 && 1>=elps2){
			this.outerNeighbors.push(p);	
		}
  	}
}


Patch.prototype.setProximate = function(xRadius, yRadius){
	this.proximate = [];

	var xRange = Math.ceil(xRadius/w);
	var yRange = Math.ceil(yRadius/w);
	//console.log([xRange, yRange])

	for(var i = this.index.x-xRange; i <= this.index.x+xRange; i++){
		for(var j = this.index.y-yRange; j <= this.index.y+yRange; j++){
			if(i!==this.index.x || j!==this.index.y){
				if(i>=0 && i<patches.length && j<patches[0].length && j >=0){
					this.proximate.push(patches[i][j]);
				}
			}
		}
	}
}


Patch.prototype.debugNeighbors = function(){
	this.innerNeighbors.forEach(function(n){
		n.innerNdebug = true;
	});

	this.outerNeighbors.forEach(function(n){
		n.outerNdebug = true;
	});

}



Patch.prototype.display = function(){
	if(this.a){
		fill(50, 100);
		
	} else {
		fill(70, 170, 200, 100); 
		
	};
	if(this.outerNdebug){
		fill(255, 0, 0);
	}

	if(this.innerNdebug){
		fill(255, 255, 0);
	} 
	
	///stroke(50);
	//strokeWeight(1);
	noStroke();
	rect(this.pos.x, this.pos.y, w, w);
	//ellipse(this.pos.x, this.pos.y, w*1.4);
	
}
