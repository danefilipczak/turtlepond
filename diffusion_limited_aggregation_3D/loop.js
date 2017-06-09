var tick = 0;
var spawn = 10;
var limits;

function loop(){
	particles.forEach(function(p){
		p.update();
	})

	if(tick == spawn){
		newBaby();
		console.log('hey')
	}
	tick++;
	tick%=spawn+1;


	group.rotation.y+=0.01;
}

function newBaby(){
	limits = getTreeBounds();
	var baby = new Grit(
		rangedRandom(limits.xmin-d, limits.xmax+d),
	  	limits.ymax+d,
	  	rangedRandom(limits.zmin-d, limits.zmax+d));
	particles.push(baby);
}

function getTreeBounds(){
	var xmin = 0;
	var xmax = 0;
	var zmin = 0;
	var zmax = 0;
	var ymax = 0;
	for(var i = 0; i<tree.length; i++){
		if(tree[i].mesh.position.x<xmin){
			xmin=tree[i].mesh.position.x;
		};
		if(tree[i].mesh.position.x>xmax){
			xmax=tree[i].mesh.position.x;
		};
		if(tree[i].mesh.position.z<zmin){
			zmin=tree[i].mesh.position.z;
		};
		if(tree[i].mesh.position.z>zmax){
			zmax=tree[i].mesh.position.z;
		};
		if(tree[i].mesh.position.y>ymax){
			ymax=tree[i].mesh.position.y;
		};
	}
	return {xmin: xmin, xmax: xmax, ymax: ymax, zmin: zmin, zmax: zmax};
}

function rangedRandom(min, max){
	return Math.random() * (max - min) + min;
}