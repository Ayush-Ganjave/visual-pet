var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastfed,fedtime

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

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastfed = data.val();
  })
   
  fill("white")
  textSize(15);
  if(lastfed >= 12){
    text("last feed:"+ lastfed %12 + "PM",300,35 )
  }
  else if(lastfed == 0){
    text("last feed: 12AM",300,35 )
  }
  else{
    text("last feed:"+ lastfed + "AM",350,30 )
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
