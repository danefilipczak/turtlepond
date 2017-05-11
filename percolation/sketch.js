var slick = [] // the oil slick hahahahahahah okay 
var front = [];
var droplet = 8; //width/height of an oil drop 
var porosity;
var sider, button, text;

function setup(){
	c = createCanvas(window.innerWidth, window.innerHeight);
	c.position(0, 0)
	

	reset();
	frameRate(10)

	button = createButton('reset');
	button.parent("main")
  	button.position(0, 350);
  	button.mousePressed(reset);

  	slider = createSlider(0, 100, 55, 0.0);
  	slider.parent("main")
  	slider.position(0, 400);

  	text = createP(porosity);
  	text.parent("main")
  	text.position(0, 410)


}


function draw(){
	background(255);


	porosity = slider.value()*0.01;
	text.html("porosity " + porosity);



	front=[];
	if(slick[slick.length-1].y>height){
		var top = -(slick[slick.length-1].y-height);
		translate(0, top);
		for(var i=slick.length-1;i>-1;i--){
			if(slick[i].y<-top||slick[i].x<0){
				slick.splice(i, 1);
			}
		}
	};


	slick.forEach(function(drop){
		
		drop.display();
		if(drop.frontmost){drop.percolate()};
		

	});
	console.log(slick.length)
	
}

function reset(){
	slick = [];
	for(var i = 0; i<30; i++){
		var drop = new Oil(100+(i*droplet), 0);
		slick.push(drop);
	}
}




