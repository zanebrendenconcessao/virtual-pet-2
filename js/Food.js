class Food{
    constructor(){
    this.foodstock=15;
    this.lastfed;
    this.Image=loadImage("image/Milk.png")
    }

updateFoodStock(foodstock){
    this.foodstock=foodstock;
}

getFedTime(lastfed){
    lastfed=lastfed;
}

deductfood(){
    if(this.foodstock>0)(
     this.foodstock=this.foodstock-1   
    )
    return this.foodstock   
}

getFoodStock(){
    return this.foodstock;
}

display(){
    var x=80,y=100

    imageMode(CENTER);
    image(this.Image,720,220,70,70)

    if(this.foodstock != 0){
        for(var i=0; i<this.foodstock; i++){
          if(i % 10 == 0) {
              x = 80;
              y = y + 50;
          } 
          image(this.Image,x,y,50,50);
          x = x + 30;
        }
    }
}

}