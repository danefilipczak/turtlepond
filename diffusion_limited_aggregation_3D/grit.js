var d = 0.8

function Grit(x, y, z){
	this.active = true;
	//this.r = d/2; //diameter
	this.geometry = new THREE.SphereGeometry( d/2, 20, 8 );
	this.material = new THREE.MeshPhongMaterial( { color: 'blue' } );
	this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.mesh.position.set(x, y, z);
	this.mesh.material.opacity = 0.35;
	this.mesh.material.transparent=true;
	scene.add(  this.mesh );
	group.add(this.mesh)
	//this.mesh.visible = false;
	this.parent;
	this.line;

}

Grit.prototype.update = function(){
	if(this.active){
		this.mesh.position.y-=rate;
		if(this.mesh.position.y<0){
			this.mesh.position.y = limits.maxy;
		}
		this.collide();
	}
	
}


Grit.prototype.collide = function(){


	for (var i = tree.length-1;i>-1;i--){
		if(this.mesh.position.distanceTo(tree[i].mesh.position)<=d){
			this.parent = tree[i];
			this.glom();
		}
	}
}

Grit.prototype.glom = function(){
	tree.push(this);
	this.active = false;

	this.mesh.material.color.r = this.parent.mesh.material.color.r + 0.04;
	this.mesh.material.color.g = this.parent.mesh.material.color.g + 0.04;
	//this.mesh.material.color.b = 0;

	var geometry = new THREE.Geometry();
	geometry.vertices.push(this.mesh.position);
	geometry.vertices.push(this.parent.mesh.position);
	var material = new THREE.LineBasicMaterial({ color: "black", linewidth:1 });
	//if(!wireframe){material.transparent = true};
	this.line = new THREE.Line(geometry, material);
	scene.add(this.line);
	group.add(this.line);
	lines.push(this.line);
	this.mesh.material.opacity = 0;
	this.mesh.material.transparent=false;

	if(wireframe){
		this.mesh.visible = false;
	}
}