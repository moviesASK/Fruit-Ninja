var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;
var monster, monsterImage, monsterGroup;
var sword, swordImage, knifeSound;
var gameOver, gameOverImage, gameOverSound;
var score, r;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  swordImage=loadImage("sword.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png");
  
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(500, 500);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  sword.setCollider("rectangle",0,0,40,70);
  //sword.debug=true;
  
  score=0;
  
  fruitGroup=createGroup();
  monsterGroup=createGroup();
}

function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
    Fruit();
    Monster();
    
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSound.play();
      score=score+1;
    }
    
    if(monsterGroup.isTouching(sword)){
      gameState=END;
      gameOverSound.play();
      
      fruitGroup.destroyEach();
      monsterGroup.destroyEach();
      
      fruitGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
      
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200
    }
  }
  
  drawSprites();
  
  text("Score : "+ score,400,30);
}

function Fruit(){
  if(World.frameCount%80===0){
    fruit=createSprite(500,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
      if (r == 1) {
        fruit.addImage(fruit1);
      } else if (r == 2) {
        fruit.addImage(fruit2);
      } else if (r == 3) {
        fruit.addImage(fruit3);
      } else {
        fruit.addImage(fruit4);
      }
    
    fruit.y=Math.round(random(50,340));
   
    //fruit.velocityX=-7;
     r = Math.round(random(1,2));
       if (r===1)
       { 
         fruit.x=400;
         fruit.velocityX=-(7+(score/4));
       } 
       
       if (r===2){
           fruit.x=0;
           fruit.velocityX=7+(score/4);
       }
       
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    //monster.velocityX=-8;
    r = Math.round(random(1,2));
       if (r===1)
       { 
         monster.x=400;
         monster.velocityX=-(8+(score/10));
       } 
       
       if (r===2){
           monster.x=0;
           monster.velocityX=8+(score/10);
       }
    monster.setLifetime=50;
    
    //monster.debug=true;
    
    monsterGroup.add(monster);
  }
}