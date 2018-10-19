function Particle(pos, vel, decay=0.015, size=10, col='red', mass=1, life=1){
	this.pos = createVector(pos[0], pos[1]);
  this.vel = createVector(vel[0], vel[1]);
  this.size = size;
  this.color = color(col);
  this.color2 = color(245,255,0)
  this.life = life;
	this.dead = false;
  this.gravity = createVector(0, 0.5);
  this.decay = decay;
  this.accel = createVector(0,0);
  this.mass = mass;
 
  this.update = function(){
    this.vel.add(this.accel);
    this.vel.add(this.gravity);
    this.vel.mult(0.9);
  	if(this.vel.mag() > 10){
       this.vel.setMag(10);
    }
  	this.pos.add(this.vel);
    this.accel.set(0,0);
      
    this.dead = this.isDead();
    this.size = lerp(0, this.size, this.life);
    //this.life -= this.decay;
  }
  
  this.render = function(){
  	this.update();
    this.display();
  }
  
  this.isDead = function(){
  	if(this.size < 1){
    	return true;
    }
  }

  this.applyForce = function(force){
    
  	this.accel = force.div(this.mass);
  }
  
  this.seek = function(seekPos){
  	targetDir = seekPos.sub(this.pos);
    steeringForce = targetDir.sub(this.vel).normalize();
    this.vel.add(steeringForce);
  }
  
  this.wind = function(windPos){
  	windForce = this.pos.sub(windPos);
    distSquared = this.pos.dist(windPos)^2;
    this.vel.add(windForce.mult(min((10/distSquared), 10)));
  }
  
  this.display = function(){
    noStroke();
    fill(this.color);
  	ellipse(this.pos.x, this.pos.y, this.size);
    stroke(0, 0, 0);
    line(this.pos.x, this.pos.y, this.pos.x + this.accel.x, this.pos.y + this.accel.y);
    stroke(100, 0, 0)
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);
  }
}