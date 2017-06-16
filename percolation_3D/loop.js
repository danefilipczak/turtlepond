var front = 0;
speed = 10;
tick = 0;

function loop(){


	group.rotation.y+=0.005;

	
	if(tick>speed){
		percolate();
		tick = 0;
		//console.log('step')
	}
	tick++;
}

function percolate(){

	if(front<world.y/w){
		for(var x = 0;x<world.x/w; x++){
			for(var z = 0; z<world.z/w; z++){
				if(oil[x][front][z].sodden){
					oil[x][front][z].percolate();
				}
			}
		}
		front++;

	}
	
}