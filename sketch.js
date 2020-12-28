//global Variables
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

function preload() {

  //Creating moving image for monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  //Creates Banana and Obstacle Images  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);
  //Local Variable
  var survivalTime = 0;

  //creating monkey
  monkey = createSprite(80, 450, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  //Creates Ground Sprite
  ground = createSprite(400, 550, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  //Creates Food and Obstacles Group
  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
 background(255);
  
  //How the ground will move left to right
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  //If space is pressed the monkey will jump
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  //VelocityY is increasing by 0.8
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //So the monkey won't fall through the ground
  monkey.collide(ground);
  
  //Calling functions
  spawnFood();
  spawnObstacles();

  //Draws All sprites
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");

  //If the monkey touches the obstacle
  if (obstaclesGroup.isTouching(monkey)) {
    //Showing that every thing will be paused
    ground.velocityX = 0;
    monkey.velocityY = 0;
    //Obstacles and food wont move
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    //The obstacles and food will freeze on the screen
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
 //Design for the survival time
  stroke("black");
  textSize(20);
  fill("black");
  //Math.ceil rounds decimal nubers to integers or normal numbers
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100, 50);
}
//Function where banannas will be spawned
function spawnFood() {
  //every 80 pixels a bannana should appear
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    //Should appear randomly from 120 to 200
    banana.y = random(300, 450);
    //how fast the bannana will move
    banana.velocityX = -5;
    //lifetime of the bannana
    banana.lifetime = 300;
    //This makes sure that the monkey will go over the bannana
    monkey.depth = banana.depth + 1;
    //adds image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    //Bananna is added to the food group
    FoodGroup.add(banana);
  } }
//Function where Obstacles will be spawned
function spawnObstacles() {
  //every 300 pixels a bannana should appear
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250,520,10,10);
    //Adds image of the rock
    obstacle.addImage(obstacleImage);
    //adds velocity to the obstacle
    obstacle.velocityX = -3;
    //Objects lifetime
    obstacle.lifetime = 200;
    //Size of obstacle
    obstacle.scale = 0.2 ;
    //Obstacle is added to obstaceGroup
    obstaclesGroup.add(obstacle);
}
 }
  