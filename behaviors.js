function Behaviors(){
	
	this.timer = -1;
	
	this.r = 20;
	this.jitter = 1;
	this.scale = 50;
		
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
	//console.log(target);
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
	  	particle.wanderX += random(-this.jitter, this.jitter);
	  	particle.wanderY += random(-this.jitter, this.jitter);
	  }
	  
	  dir = createVector(particle.wanderX, particle.wanderY);
	  dir.setMag(this.r)
	  
	  offset = particle.vel;
	  offset.setMag(this.scale);
	  
	  center = p5.Vector.add(particle.pos, offset);
	  
	  target = p5.Vector.add(center, dir);
	  
	  noFill();
	  stroke(0,0,0);
	  ellipse(center.x, center.y, this.r*2);
	  
	  fill(255, 0, 0);
	  ellipse(target.x, target.y, 5);
	  
	  if(this.timer > 5){
		  this.timer = -1;
	  }
	  this.timer++;
	  return target;
	 
  }
  
  this.persue = function(victim, particle){
	  toVictim = p5.Vector.sub(victim.pos, particle.pos);
	  dot = p5.Vector.dot(particle.vel, toVictim);
	  normalDot = p5.Vector.dot(particle.vel.normalize(), victim.vel.normalize())
	  if(dot > 0 && normalDot < -0.95){
		 	return null;
		 }
	  
	  time = toVictim.mag()/(particle.maxVel + victim.vel.mag());
	  
	  target = p5.Vector.add(victim.pos, (p5.Vector.mult(victim.vel, time)));
	  
	  ellipse(target.x, target.y, 5);
	  
	  return target;
  }
  
  this.evade = function(victim, particle){
	  toVictim = p5.Vector.sub(victim.pos, particle.pos);
	  dot = p5.Vector.dot(particle.vel, toVictim);
	  normalDot = p5.Vector.dot(particle.vel.normalize(), victim.vel.normalize())
	  
	  time = toVictim.mag()/(particle.maxVel + victim.vel.mag());
	  
	  target = p5.Vector.add(victim.pos, (p5.Vector.mult(victim.vel, time)));
	  return target;
  }
}