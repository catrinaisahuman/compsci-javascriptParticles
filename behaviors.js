function Behaviors(){
		
	this.wanderX = 1;
	this.wanderY = 0;
	this.r = 5;
	this.jitter = 1;
	this.scale = 50;
	this.timer = -1;
	
  this.seek = function(target, particle){
	//console.log(target)
  	targetDir = p5.Vector.sub(target, particle.pos);
    steeringForce = p5.Vector.sub(targetDir, particle.vel).normalize();
    return steeringForce;
  }
  
  this.wind = function(target, particle){
 		windForce = p5.Vector.sub(particle.pos, target);
    distSquared = (particle.pos.dist(target))^2;
    windMult = min(10/distSquared, 10);
    windForce.mult(windMult);
    return windForce;
  }
   
  this.flee = function(target, particle){
  	targetDir = p5.Vector.sub(particle.pos, target);
    steeringForce = targetDir.sub(particle.vel).normalize();
    return steeringForce;
  }
  
  this.arive = function(target, particle){
  	targetDist = p5.Vector.sub(target, particle.pos);
  	targetDist.div(10)
    return targetDist;
  }
  
  this.wander = function(particle){
	  if(this.timer == 0){
	  	this.wanderX += random(-this.jitter, this.jitter);
	  	this.wanderY += random(-this.jitter, this.jitter);
	  }
	  
	  dir = createVector(this.wanderX, this.wanderY);
	  dir.normalize();
	  
	  offset = particle.accel;
	  offset.setMag(this.scale);
	  
	  center = p5.Vector.add(particle.pos, offset);
	  
	  target = p5.Vector.add(center, dir);
	  
	  if(this.timer > 10){
		  this.timer = -1;
	  }
	  this.timer++;
	  return target;
	 
  }
}