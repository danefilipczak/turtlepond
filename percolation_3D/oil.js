var channels = [
	{x: -1, z:-1}, 
	{x: -1, z:+1},
	{x: +1, z:+1},
	{x: +1, z:-1}
]

function Oil(x, y, z){

	this.pos = {x: (x*w)-(world.x/2), 
		y: (y*w)-5, 
		z: (z*w)-(world.z/2)}
	this.sodden = false;
	this.index = {x: x, y: y, z: z}
	this.channels = [];
	this.parent;
	this.mesh;
	this.children = 0;
	this.curve;
	this.line;
	this.parent = null;
	

}


Oil.prototype.setChannels = function(){
	if(this.index.y+1<world.y/w){
		for(var i = 0; i < channels.length; i++){
			var x = this.index.x+channels[i].x;
			var z = this.index.z+channels[i].z;
			//console.log([x, this.index.y+1, z])

			if(x>=0 && x<world.x/w && z >=0 && z<world.z/w){
				this.channels.push(oil[x][this.index.y+1][z]);
			}	
		}
	}
	this.channels = shuffle(this.channels);
}

Oil.prototype.percolate = function(){

	for(var i = 0; i <this.channels.length; i ++){
		if(Math.random()<porosity){
			if(!this.channels[i].sodden){
				this.channels[i].parent = this;
				this.channels[i].spill();
			}
			this.channels[i].makeLine();
		}
		
	}


}

Oil.prototype.spill = function(invisible){
	if(this.parent){this.parent.children++}
	this.sodden = true;
	this.makeCube(invisible);
}

Oil.prototype.makeCube = function(invisible){
	this.geometry = new THREE.BoxGeometry( w, w, w );
	this.material = new THREE.MeshPhongMaterial( { color: 'black', wireframe:true } );
	this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
	scene.add(  this.mesh );
	group.add(this.mesh)
	if(wireframe || invisible){
		this.mesh.visible = false;
	}
}

Oil.prototype.makeLine = function(){
	var geometry = new THREE.Geometry();
	if(this.parent){
		 if(this.parent.children > 1){
			this.curve = new THREE.CatmullRomCurve3( [
			this.mesh.position, this.parent.mesh.position
			] );
			geometry.vertices = this.curve.getPoints( 50 );
			var material = new THREE.LineBasicMaterial({ color: "black", linewidth:1 });
			this.line = new THREE.Line(geometry, material);
			scene.add(this.line);
			group.add(this.line);
			lines.push(this.line);
			if(!wireframe){
				this.line.visible = false;
			}
		} else if(this.parent.curve){

			console.log(this.index)
			this.line = this.parent.line;
			this.curve = this.parent.curve;
			this.curve.points.push(this.mesh.position);
			geometry.vertices = this.curve.getPoints( 50 );
			this.line.geometry = geometry;
		}
	}
}

	
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}