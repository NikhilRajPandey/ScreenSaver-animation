let balls = [];
let noOfballs = 40;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < noOfballs; i++) {
    balls.push(new Mover());
  }

}

function Mover(){
  this.x = width/2;
  this.y = height/2;
  this.radi_range = [5,40]; // this.radi > 5 && this.radi < 40
  this.radi = round(random(5,40));


  this.initialize = function(){
    this.radi_change = round(random(-50,51))/100;
    this.angle = round(random(0,361));
    this.dist = round(random(10,400));
    // After covering this dist this mover will move somewhere else
    this.vel = [1,1];
    this.vel_constant = 10;
    this.final_location = [0,0];
  }
  this.initialize();

  this.setVel = function(){ // Sets velocity and Final location

      // Setting Velocity
      unit_angle = this.angle; // So that angles like 120 appear 30
      
      // Refer Something.jpg
      if(this.angle <= 90){
        this.vel[1] *= -1;
      }
      else if(this.angle <= 180){
        unit_angle = 180-unit_angle;
        this.vel[0] *= -1;
        this.vel[1] *= -1;

      }
      else if(this.angle <= 270){
        unit_angle = unit_angle-180;
        this.vel[0] *= -1;
      }
      else{unit_angle = 360-unit_angle;}
      // else{Other wise both positive}

      this.vel[0] *= this.vel_constant * cos(radians(unit_angle));
      this.vel[1] *= this.vel_constant * sin(radians(unit_angle));

      // Setting Final Location
      this.final_location[0] = this.x + this.vel[0]*this.dist/this.vel_constant;
      /* this.x + cos(unit_angle)*this.dist [But in angle between 90 to 270 
      it is this.x - cos(unit_angle)*this.dist] */
      this.final_location[1] = this.y + this.vel[1]*this.dist/this.vel_constant;
      /* this.y + sin(unit_angle)*this.dist [But in angle between 0 to 180 
      it is this.y - sin(unit_angle)*this.dist] */

      // Refer Something.js
  }
  this.setVel();
  this.changePos = function(){ // Change position and radius of ball

    // This line means that our ball has reached the desired location
    if( Math.abs(this.final_location[0]-this.x) < 20 && Math.abs(this.final_location[1]-this.y) < 20){
      this.initialize();
      this.setVel();
    }
    
    let xcheckOut = this.x < 0 || this.x > width; // Checking is ball out of screen from x axis
    let yCheckOut = this.y < 0 || this.y > height; // This is for y
    let isObjOutOfscr = xcheckOut||yCheckOut; // is object out of screen

    if(isObjOutOfscr){
      this.x = width/2;
      this.y = height/2;
      this.radi = round(random(5,40));
      this.initialize();
      this.setVel();
    }
    else{
      this.x += this.vel[0];
      this.y += this.vel[1];
      this.radi += this.radi_change; // Changing radi here
      this.limit_radi();
    }
  }
  
  this.disp = function(){ // Display object
    fill("white");
    noStroke();
    ellipse(this.x,this.y,this.radi*2);
  }

  this.limit_radi = function(){
    if(this.radi < this.radi_range[0]){this.radi = this.radi_range[0];}
    else if(this.radi > this.radi_range[1]){this.radi = this.radi_range[1];}
  }


}

function draw() {
  background("black");
  for (let i = 0; i < noOfballs; i++) {
    balls[i].changePos();
    balls[i].disp();

  }
  
  
}
