
var dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage('images/dogImg.png')
  dogHappy = loadImage('images/dogImg1.png')
}

function setup() {
  createCanvas(1000, 1000);


  database = firebase.database();

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg)

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  
}

function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy)
  } else {
    dog.addImage(dogImg)
  }

  drawSprites();

  stroke(20)
  textSize(50)
  fill('black');
  text('food: ' + foodS, 700, 200)

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if (x <= 0){
    x = 0;
    dog.addImage(dogImg)
  } else {
    x -= 1;
  }
  
  database.ref('/').update({
    Food:x
  })

}

