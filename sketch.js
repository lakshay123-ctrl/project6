var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var fedTime;
var lastFed;
var gameState = "hungry";
var sadDog;
var gardenImg;
var Images;
var Images2;

function preload(){
dogimg = loadImage("dogImg.png");
dogHappy = loadImage("dogImg1.png");
sadDog = loadImage("Lazy.png");
gardenImg = loadImage("Garden.png");
Images = loadImage("Bed Room.png");
Images2 = loadImage("Living Room.png");


}

function setup() {
  createCanvas(800, 700);
  
  
  dog = createSprite(400,500,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  if (gameState != "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();

  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  
}


function draw() {
  background(46,139,87); 
  
  

  drawSprites();

  textSize(30);
  text("food remaining: "+foods,300,250);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM" ,350,30);
  }
  else if(lastFed==0){
    text("Last  Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+lastFed + "AM",350,30);
  }
    var currentTime = hour();
  if (currentTime === lastFed+1){
    background(gardenImg);

  }
   else if (currentTime === lastFed+2){
       background(Images);
  }
   else if (currentTime === lastFed+3){
    background(Images2);
  }

  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}

function feedDog(){
  gameState != "hungry";
  dog.addImage(dogHappy);
  foods = foods-1;
  database.ref('/').update({
    Food:foods
  });
 

}

function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  });
}




