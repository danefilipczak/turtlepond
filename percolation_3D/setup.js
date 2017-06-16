var renderer, scene, camera, ambient, group;

var controls;
var wireframe = false;

var porosity = 0.26;

var oil = [] ; //a 3 dimensional array in the making :' )
var lines = [];


var w = 1 //global width 

var world = {x:10, y:15, z:5}

window.onload = function(){

	
	scene = new THREE.Scene();
	//scene.add(group);
	scene.background = new THREE.Color( 'white' );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.618/window.innerHeight, 0.1, 1000 );
	camera.position.z=10;
	camera.position.y=5;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth*0.618, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.domElement.style = "position:fixed; top:0px; left:0px"


	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	reset();
	


	
	setPorosity(0.26)




	ambient = new THREE.HemisphereLight( 0x404040 ); // soft white light
	ambient.position.y = -10
	ambient.position.z=5
	scene.add( ambient );


	render();
}

function reset(){


	if(oil[0]){
		for(var x = 0; x<world.x/w; x++){
			for(var y = 0; y<world.y/w; y++){
				for(var z = 0; z<world.z/w; z++){
					scene.remove(oil[x][y][z].mesh);
					scene.remove(oil[x][y][z].line);
					//group.remove(oil[x][y][z]);

				}
			}
		}
	}
	
	scene.remove(group)

	group = new THREE.Group();
	scene.add(group);
	
	oil = [];

	for(var x = 0; x<world.x/w; x++){
		oil[x]=[];
		for(var y = 0; y<world.y/w; y++){
			oil[x][y]=[];
			for(var z = 0; z<world.z/w; z++){
				oil[x][y][z] = new Oil(x, y, z);
			}
		}
	}

	for(var x = 0; x<world.x/w; x++){
		for(var y = 0; y<world.y/w; y++){
			for(var z = 0; z<world.z/w; z++){
				oil[x][y][z].setChannels();
			}
		}
	}

	for(var x = 0;x<world.x/w; x++){
		for(var z = 0; z<world.z/w; z++){
			oil[x][0][z].spill(true);
			oil[x][0][z].children++;
		}
	}
	
	front = 0;

}


