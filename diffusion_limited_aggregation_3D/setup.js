var renderer, scene, camera, ambient, torus, plane, group;
var tree = [];
var rate = 0.05;
var particles = [];
var ceiling = 10;
var wireframe = false;
var lines = [];
var controls;

//add different cool directions, 

window.onload = function(){

	group = new THREE.Group();
	scene = new THREE.Scene();
	scene.add(group);
	scene.background = new THREE.Color( 'lightgrey' );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.618/window.innerHeight, 0.1, 1000 );
	camera.position.z=10;
	camera.position.y=5;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth*0.618, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.domElement.style = "position:fixed; top:0px; left:0px"


	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // remove when using animation loop
				// enable animation loop when using damping or autorotation
				//controls.enableDamping = true;
				//controls.dampingFactor = 0.25;



	// var geometry = new THREE.PlaneGeometry( 5, 5, 6, 12 );
	// var material = new THREE.MeshPhongMaterial( { color: 'blue' } );
	// plane = new THREE.Mesh( geometry, material );
	// scene.add(  plane );
	reset();
	




	// ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
	// scene.add( ambient );

	ambient = new THREE.HemisphereLight( 0x404040 ); // soft white light
	scene.add( ambient );


	render();
}

function reset(){
	for(var i = particles.length-1;i>-1;i--){
		group.remove(particles[i].line);
		scene.remove(particles[i].line);
		group.remove(particles[i].mesh);
		scene.remove(particles[i].mesh);
		
		delete particles[i];
		delete tree[i];
	}
	particles=[];
	tree = [];
	for(var i = lines.length-1;i>-1;i--){
		group.remove(lines[i]);
		scene.remove(lines[i]);
		delete lines[i];
	}
	lines = [];

	var seed = new Grit(0, 0, 0);
	seed.active=false;
	if(wireframe){
		seed.mesh.visible=false;
	}
	seed.mesh.material.transparent = false;
	tree.push(seed);
	particles.push(seed);

}


