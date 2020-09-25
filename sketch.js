var monkey , monkey_running;
var ground;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var gameState = 1;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,300);
  
  score = 0;
  
  monkey = createSprite(80,205,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,240,600,20);
  
  monkey.debug = true;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  background(51);
  
  if(gameState === 1){
    spawnObstacles();
    spawnFood();
    
    if(keyDown("space") && monkey.y>=190){
      monkey.velocityY = -12;
    }
    monkey.velocityY+=0.5;
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState = 0;
    }
    score = Math.round(score+(frameRate()/60));
  }
    else if(gameState === 0){
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      ground.velocityX = 0;
      monkey.velocityY = 0;
    }
  
  monkey.collide(ground);
  
  drawSprites();
  text("Score: "+score,100,50);
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    obstacle = createSprite(580,200,20,5);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.velocityX = -7;
    obstacleGroup.add(obstacle);
    
    obstacle.setCollider("rectangle",0,0,450,450);
    obstacle.debug = true;
  }
}

function spawnFood(){
  if(frameCount%340 === 0){
    var rand = Math.round(random(120,200));
    
    banana = createSprite(540,rand,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
    banana.velocityX = -7;
    foodGroup.add(banana);
  }
}