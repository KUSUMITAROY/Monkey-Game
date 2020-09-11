  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score;
  var survivaltime=0;
  var invisibleGround;

function preload()
{
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  obstacleGroup = new Group();
  FoodGroup = new Group();
  score = 0;
}

function setup()
{
  createCanvas(800,400);
  ground = createSprite(400,360,800,10); 
  ground.x = ground.width /2;
  
  monkey = createSprite(300,310,20,20);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale=0.2
  
  invisibleGround = createSprite(400,365,800,5);
  invisibleGround.visible = false;
  
  monkey.setCollider("circle",0,0,300);
  monkey.debug = false;
}


function draw() 
{
  background(220);
  textSize(20);
  fill("black");
  text("Score: "+ score, 700,50);
  text("SurvivalTime: "+ survivaltime, 100,50);  
   
  if (gameState === PLAY)
  {
   food();
   stone();
   ground.velocityX = -4 
  if (monkey.isTouching(FoodGroup))
  {
    score = score+1;
    FoodGroup.destroyEach();
  }
  
  if (ground.x > 0)
  {
     ground.x = ground.width/2;          
  }
  monkey.collide(invisibleGround);
 
   if(keyDown("space")  && monkey.y>=300)
   {
      monkey.velocityY = -14 ;
  }
    
   monkey.velocityY = monkey.velocityY + 0.86;
    
   if(obstacleGroup.isTouching(monkey))
   {
      gameState=END;
   }
    
  survivaltime=Math.ceil(frameCount/frameRate())
}
  
 else if (gameState === END)  
 {
     
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     FoodGroup.destroyEach();
     textSize(80);
     text("GAME OVER",200,200);
  }
  
  
  drawSprites();
}

function food()
{
if (frameCount%80===0)
{
  banana = createSprite(800,random(120,200),20,20)
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-18;
  banana.lifetime=100;
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  FoodGroup.add(banana);  
}
}
function stone()
{
  if (frameCount%300===0)
  { 
    obstacle = createSprite(800,320,20,20);
    obstacle.addImage("obstacle",obstaceImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-10;
    obstacle.lifetime=100;
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    obstacle.setCollider("circle",0,0,200);
    obstacle.debug = false;
    obstacleGroup.add(obstacle);
  }
}




