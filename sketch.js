var dog, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg=loadImage("images/dogImg.png")
  HappyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  dog=createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale=0.3;

  database=firebase.database();
  foodStock=database.ref("Food");
  console.log(foodStock);
  foodStock.on("value",readStock);
}

function draw() {  
background(46, 139, 87);
  drawSprites();
  
  fill(255)
  textSize(15);
  text("Note: Press UP_ARROW key to feed Drago milk!!",100,30)
  text("Food remaining : "+foodS,150,150)
  
  if(keyDown(UP_ARROW)){
    foodS=foodS-1;
    if(foodS<0){
      foodS=0;
      //text("Food is out of stock!!",150,170)
    }
    else{
      database.ref("/").set({
        Food:foodS
      })
      dog.addImage(HappyDogImg);
    }
  }

}

function readStock(data){
  foodS=data.val();
}




