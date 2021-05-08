var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedFood;
var lastFed;
var hr;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("Feed Food");
  feedFood.position(650,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  
  database.ref('FeedTime').on("value",function(data){
    hr=data.val()
  })
  
  if(hr>12){
    hr=hr-12
    textSize(20)
    fill("yellow")
    text(hr+" pm",100,100);
  }
  else{
    hr=hr
    textSize(20)
    fill("yellow")
    text(hr+" am",100,100);
  }
  //write code to read fedtime value from the database 
 

  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.foodStock=foodS;
}


function feedDog(){
  dog.addImage(happyDog);

  foodS--;
  foodObj.updateFoodStock(foodS);
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS
  })
  lastFed=hour();
  database.ref('/').update({
    FeedTime:lastFed
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
