var ground,groundImage;
var ghost1,ghostImage;
var door,doorImage;
var climber,climberImage;
var doorGroup,climberGroup;
var gameState="play";
var spookySound;

function preload () {
  groundImage =loadImage("tower.png");
  ghostImage =loadImage("ghost-standing.png");
  doorImage= loadImage("door.png");
  climberImage= loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  ground= createSprite(300,300);
  ground.addImage(groundImage);
  ground.velocityY=4;
  
  ghost = createSprite(200,200,20,10);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
  
  doorGroup= new Group();
  climberGroup= new Group();
  
  spookySound.loop();
}

function draw(){
 background(0)
  
if(gameState==="play"){
  //reset of ground
 if(ground.y>400){
    ground.y=200;
  } 
//to move the ghost
  if(keyDown("space"))  {
  ghost.velocityY=-4;
}
  //gravity
  ghost.velocityY=ghost.velocityY+0.8;
 // to move the ghost left
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-2;
  }
   // to move the ghost right
 if(keyDown("right_arrow")){
    ghost.x=ghost.x+2;
  } 
  // to create door & climber
  spawnDoor();
  //if ghost is touching climber 
 if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }  
  //gameover
  if(ghost.y>600){
    gameState="end";
  }
}
 else if(gameState==="end")        {
   strokeWeight(5);
   stroke("red");
   textSize(50);
   fill("yellow");
   text("GAME OVER!",150,300);
   ghost.destroy();
   ground.destroy();
 }
  
  drawSprites();
 
}

function spawnDoor(){
   if(frameCount%240===0){
   door= createSprite(Math.round(random(120,400)),50);
  door.addImage(doorImage);
  door.velocityY=1;
     door.lifetime=600;
     doorGroup.add(door);
     climber= createSprite(door.x,100);
     climber.addImage(climberImage);
     climber.velocityY=1;
     climber.lifetime=600;
     climberGroup.add(climber);
     
       ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
   }

}

