var dog,dogImg,dogImg1;
var database;
var feed, addfood;
var fedtime, lastfed;
var foodobj;
var foodS;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(600,600);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodobj= new Food ();
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feeddog);

  addfood=createButton("Add food ")
  addfood.position(800,95)
  addfood.mousePressed(addfoods)
}

// function to display UI
function draw() {
  background(46,139,87);
 
  fedtime=database.ref('feed time');
  fedtime.on("value",function(data){
    lastfed=data.val();
  });

fill(225,225,254);
textSize(15);
if(lastfed>=12){
  text("last fed :"+ lastfed%12 + "PM", 350,30)
}else if(lastfed==0){
  text("last fed:12 AM",350,30)
}else {
  text("last fed:"+lastfed+ "AM",350,30);
}
 
foodobj.display();
drawSprites();
}



function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function feeddog(){
  dog.addImage(dogImg1);
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    fedtime:hour()
  })
}

function addfoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}