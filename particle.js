function Particle(pos, vel, decay=0.015, size=10, col='red', mass=1, life=1, maxVel=1){
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
  this.maxVel = maxVel;
  this.wanderX = 0;
  this.wanderY = 0;
	
  this.target = createVector();
  this.victim;
  
  this.behavior = new Behaviors(this);
	
  this.tag = true;
 
  this.update = function(){
	
    this.vel.add(this.accel);
    //this.vel.add(this.gravity);
    //this.vel.mult(0.9);
	  
  	if(this.vel.mag() > this.maxVel){
       this.vel.setMag(this.maxVel);
    }
	  
  	this.pos.add(this.vel);
    this.accel.set(0,0);
      
    this.dead = this.isDead();
    //this.size = lerp(0, this.size, this.life);
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
//	if(this.pos.x < 0 || this.pos.x > 400 || this.pos.y < 0 || this.pos.y > 400){
//		return true;
//	}
  }
  

  this.applyForce = function(force){
  	this.accel = force.div(this.mass);
	
  }
  
  this.display = function(){
    noStroke();
    fill(this.color);
	/*if(this.tag == true){
		fill(0,0,0);
	}*/
  	ellipse(this.pos.x, this.pos.y, this.size);
	  
    stroke(0, 0, 0);
    line(this.pos.x, this.pos.y, this.pos.x + this.accel.x, this.pos.y + this.accel.y);
	  
    stroke(100, 0, 0)
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);
  }
  
  
  this.setTarget = function(target){
	  this.target =target;
  }
  
  this.setVictim = function(victim){
	  this.victim = victim;
  }
  
  
  this.seekOn = function(){
	  this.behavior.currentBehavior |= 2;
	  
	  
  }
  
  this.seekOff = function(){
	  this.behavior.currentBehavior ^= 2;
  }
  
  this.fleeOn = function(){
	  this.behavior.currentBehavior |= 4;
  }
  
  this.fleeOff = function(){
	  this.behavior.currentBehavior ^= 4;
  }
  
  this.arriveOn = function(){
	  this.behavior.currentBehavior |= 8;
  }
  
  this.arriveOff = function(){
	  this.behavior.currentBehavior ^= 8;
  }
  
  this.persueOn = function(){
	  this.behavior.currentBehavior |= 16;
  }
  
  this.persueOff = function(){
	  this.behavior.currentBehavior ^= 16;
  }
  
  this.evadeOn = function(){
	  this.behavior.currentBehavior |= 32;
  }
  
  this.evadeOff = function(){
	  this.behavior.currentBehavior ^= 32;
  }
  
  this.wanderOn = function(){
	  this.behavior.currentBehavior |= 64;
  }
  
  this.wanderOff = function(){
	  this.behavior.currentBehavior ^= 64;
  }
  
  this.separateOn = function(){
	  this.behavior.currentBehavior |= 128;
  }
  
  this.separateOff = function(){
	  this.behavior.currentBehavior ^= 128;
  }
  
  this.alignOn = function(){
	  this.behavior.currentBehavior |= 256;
  }
  
  this.alignOff = function(){
	  this.behavior.currentBehavior ^= 256;
  }
  
  this.cohesionOn = function(){
	  this.behavior.currentBehavior |= 512;
  }
  
  this.cohesionOff = function(){
	  this.behavior.currentBehavior ^= 512;
  }
  
  this.flowFieldOn = function(){
	  this.behavior.currentBehavior |= 1024;
  }
  
  this.flowFieldOff = function(){
	  this.behavior.currentBehavior ^= 1024;
  }
  
  
  
  this.tagOn = function(){
	  this.tag = true;
  }
  
  this.tagOff = function(){
	  this.tag = false;
  }
}