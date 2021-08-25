var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg,climber,climberGroup;
var ghost, ghostImg;

var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
}

function setup() {
createCanvas(600,600);
tower=createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY=1;

doorsGroup=new Group();
climbersGroup=new Group();

ghost=createSprite(200,200,50,50);
ghost.scale=0.3;
ghost.addImage("ghost",ghostImg);
}

function draw(){
  background(0);
  if(tower.y > 400){
   tower.y=300
  }

  if(gameState==="end"){
      stroke("yellow");
      fill("yellow");
      textsize(30);
      text("Game Over",230,250);
  }

  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }

  if(keyDown("right_arrow")){
    ghost.x=ghost.x-3;
  }

  if(keyDown("space")){
    ghost.velocityY=-5;
  }

  ghost.velocityY=ghost.velocityY+0.8

  if(climbersGroup.isTouching(ghost)){
      ghost.velocity=0;
  }

  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
  }

  spawnDoors();
  drawSprites();
}

function spawnDoors() {
 //write code here to spawn the doors in the doors in the tower
 if(frameCount%240===0){
   var door=createSprite(200,-50);
   door.addImage(doorImg);

   var climber=createSprite(200,10);
   climber.addImage(climberImg);

   door.x=Math.round(random(120,400));
   door.velocityY=1;

   climber.x=door.x;
   climber.velocityY=1;
   invisibleBlock.velocityY=1;

   ghost.depth=door.depth;
   ghost.depth+=1;

   //assign lifetime to the variable
   door.lifetime=800;
   climber.lifetime=800;
   invisibleBlock.lifetime=800;



   //add each door to the group
   doorsGroup.add(door);
   climberGroup.add(climber);

  }
}