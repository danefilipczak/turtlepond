function Oil(x, y){
	this.x = x;
	this.y = y;
	this.frontmost = true;
}


Oil.prototype.display = function(){

	if(this.frontmost){

		fill(0, 0, 255)

	} else {
		
		fill(255, 255, 0);

	};
	stroke(200);
	rect(this.x, this.y, droplet, droplet);
}


Oil.prototype.percolate = function(){

	//percolate left
	if(random()<porosity){
		var drop = new Oil(this.x-droplet, this.y+droplet);
		var uniq = true; //you are unique until proven otherwise!
		front.forEach(function(prior){
			if(drop.x==prior.x&&drop!==prior){
				uniq=false;//ohh but maybe you're not so special
			}
		})
		if(uniq){
			slick.push(drop);
			front.push(drop);
		}
	}
	//and the same thing to the right
	if(random()<porosity){
		var drop = new Oil(this.x+droplet, this.y+droplet);
		var uniq = true;
		front.forEach(function(prior){
			if(drop.x==prior.x&&drop!==prior){
				uniq=false;
			}
		})
		if(uniq){
			slick.push(drop);
			front.push(drop);
		}
	}
	this.frontmost = false;
}

