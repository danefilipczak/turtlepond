
var rbutton;
var fish;
var initialDensity = 50;
var w=10; //global width variable. 

var innerXRadius = w*1;
var innerYRadius = w*1;
var outerXRadius = w*2;
var outerYRadius = w*3;
var ratio = 0.30;
var gadflys = 500;

patches = []; //a two dimensional array, in the making :' )  

function setup(){
	c = createCanvas((window.innerWidth*0.618), window.innerHeight);
	c.position(0, 0);


 	document.getElementById("innerX").innerHTML = "inner X radius: " + innerXRadius/w;
 	document.getElementById("innerY").innerHTML = "inner Y radius: " + innerYRadius/w;
 	document.getElementById("outerX").innerHTML = "outer X radius: " + outerXRadius/w;
 	document.getElementById("outerY").innerHTML = "outer Y radius: " + outerYRadius/w;

  	frameRate(7);
  	for(var i = 0;i<width/w;i++){
  		patches[i]=[];
  		for(var j = 0;j<height/w;j++){

  			patches[i][j] = new Patch(w*i, w*j, {x:i, y:j});

  		}
  	};
  	setFish();
}


function draw(){
	for(var i = 0;i<patches.length;i++){
  		for(var j = 0;j<height/w;j++){
  			patches[i][j].update();
  			patches[i][j].display();
  		}
  	}
}

function reset(){
  document.getElementsByTagName("body")[0].style.cursor = "wait";
  document.getElementById("working").innerHTML = "working . . . ";

	for(var i = 0;i<width/w;i++){
  		for(var j = 0;j<height/w;j++){
  			patches[i][j].innerNdebug = false;
  			patches[i][j].outerNdebug = false;
  			patches[i][j].setup();
  		}
  	}
	document.getElementById("working").innerHTML = "";
  document.getElementsByTagName("body")[0].style.cursor = "default";
}








