function Behaviors(owner){
	this.owner = owner;
	this.currentBehavior
	
	this.timer = -1;
	this.r = 20;
	this.jitter = 1;
	this.scale = 50;
	this.sepFactor = 20;
	this.alignFactor = 15;
	
  var NONE=0, SEEK=2, FLEE=4, ARIVE= 8, PERSUE=16, EVADE=32, WANDER=64, SEPARATE=128, ALIGN=256, COHESION=512, FLOWFIELD=1024;
		
  this.seek = function(target){
	//console.log(target)
  	targetDir = p5.Vector.sub(target, this.owner.pos);
    steeringForce = p5.Vector.sub(targetDir, this.owner.vel).normalize();
    return steeringForce;
  }
  
  this.wind = function(target){
 	windForce = p5.Vector.sub(this.owner.pos, target);
    distSquared = (this.owner.pos.dist(target))^2;
    windMult = min(10/distSquared, 10);
    windForce.mult(windMult);
    return windForce;
  }
   
  this.flee = function(target){
  	targetDir = p5.Vector.sub(this.owner.pos, target);
	//console.log(target);
    steeringForce = targetDir.sub(this.owner.vel).normalize();
    return steeringForce;
  }
  
  this.arrive = function(target){
  	targetDist = p5.Vector.sub(target, this.owner.pos);
  	targetDist.div(10)
    return targetDist;
  }
  
  this.wander = function(){
	  
	  if(this.timer == 0){
	  	this.owner.wanderX += random(-this.jitter, this.jitter);
	  	this.owner.wanderY += random(-this.jitter, this.jitter);
	  }
	  
	  dir = createVector(this.owner.wanderX, this.owner.wanderY);
	  dir.setMag(this.r)
	  
	  offset = this.owner.vel;
	  offset.setMag(this.scale);
	  
	  center = p5.Vector.add(this.owner.pos, offset);
	  
	  target = p5.Vector.add(center, dir);
	  
	  /*noFill();
	  stroke(0,0,0);
	  ellipse(center.x, center.y, this.r*2);
	  
	  fill(255, 0, 0);
	  ellipse(target.x, target.y, 5)*/
	  
	  if(this.timer > 5){
		  this.timer = -1;
	  }
	  this.timer++;
	  return this.seek(target);
	 
  }
  
  this.persue = function(victim){
	  toVictim = p5.Vector.sub(victim.pos, this.owner.pos);
	  dot = p5.Vector.dot(this.owner.vel, toVictim);
	  normalDot = p5.Vector.dot(this.owner.vel.normalize(), victim.vel.normalize())
	  if(dot > 0 && normalDot < -0.95){
		 	return null;
		 }
	  
	  time = toVictim.mag()/(this.owner.maxVel + victim.vel.mag());
	  
	  target = p5.Vector.add(victim.pos, (p5.Vector.mult(victim.vel, time)));
	  
	  ellipse(target.x, target.y, 5);
	  
	  return this.seek(target);
  }
  
  this.evade = function(victim){
	  toVictim = p5.Vector.sub(victim.pos, this.owner.pos);
	  dot = p5.Vector.dot(this.owner.vel, toVictim);
	  normalDot = p5.Vector.dot(this.owner.vel.normalize(), victim.vel.normalize())
	  
	  time = toVictim.mag()/(this.owner.maxVel + victim.vel.mag());
	  
	  target = p5.Vector.add(victim.pos, (p5.Vector.mult(victim.vel, time)));
	  return this.flee(target);
  }
  
  this.separate = function(){
	  totalDist = createVector();
	  for(let i=0; i<world.particles.length; i++){
		  
		  if(world.particles[i].tag == true){
			  dist = p5.Vector.sub(owner.pos, world.particles[i].pos);
			  totalDist.add(dist);
			  
		  }
		  
		  
	  }
	  distMag = totalDist.magSq();
	  
	  if(distMag != 0){
		 return p5.Vector.div(totalDist.mult(this.sepFactor), distMag); 
	  }
	  
  }
  
  this.align = function(){
	  totalHeadings = createVector();
	  vectors = 0
	  for(let i=0; i<world.particles.length; i++){
		  
		  if(world.particles[i].tag == true){
			  particleHeading = world.particles[i].vel.copy();
			  totalHeadings = p5.Vector.add(particleHeading.normalize(), totalHeadings);
			  vectors++;
		  }	
	  }
	  if(vectors != 0){
		 totalHeadings.div(vectors); 
	  }
	  
	  ownerHeading = this.owner.vel.copy();
	  steeringForce = p5.Vector.sub(totalHeadings, ownerHeading.normalize())
	  
	  
	  return steeringForce.mult(this.alignFactor);
	  
	  
	 
  }
  
  this.cohesion = function(){
	  totalPos = createVector();
	  vectors = 0
	  for(let i=0; i<world.particles.length; i++){
		  
		  if(world.particles[i].tag == true){
			  particlePos = world.particles[i].pos.copy();
			  totalPos = p5.Vector.add(particlePos, totalPos);
			  vectors++;
		  }	
	  }
	  if(vectors != 0){
		 totalPos.div(vectors); 
	  }
	  
	  
	  
	  if((totalPos.x && totalPos.y) !=0){
		//console.log(totalPos)
	  	return this.seek(totalPos);
	  }
  }
  
  this.flowField = function(){
	  closestPoint = flow.points[0].pos.copy()
	  var closestVector
	  for(i=0;i<flow.points.length;i++){
		  if(p5.Vector.dist(this.owner.pos, flow.points[i].pos) < p5.Vector.dist(this.owner.pos, closestPoint)){
			  closestPoint = flow.points[i].pos.copy();
			  closestVector = flow.points[i].vector.copy();
		  }
	  }
	  
	  return closestVector;
  }
  
  
  
  
  
  this.calculate = function(){
	totalForce = createVector();
	  
	if((this.currentBehavior & SEEK) > 0){
	  totalForce.add(this.seek(owner.target));
  	} 
	if((this.currentBehavior & FLEE) > 0){
	  totalForce.add(this.flee(owner.target));
  	} 
	if((this.currentBehavior & ARIVE) > 0){
	  totalForce.add(this.arive(owner.target));
  	} 
	if((this.currentBehavior & PERSUE) > 0){
	  totalForce.add(this.persue(owner.victim));
  	} 
	if((this.currentBehavior & EVADE) > 0){
	  totalForce.add(this.evade(owner.victim));
  	} 
	if((this.currentBehavior & WANDER) > 0){
	  totalForce.add(this.wander());
  	} 
	if((this.currentBehavior & SEPARATE) > 0){
	  totalForce.add(this.separate());
  	} 
	if((this.currentBehavior & ALIGN) > 0){
	  totalForce.add(this.align());
  	}   
	if((this.currentBehavior & COHESION) > 0){
	  totalForce.add(this.cohesion());
  	}   
	if((this.currentBehavior & FLOWFIELD) > 0){
	  totalForce.add(this.flowField());
  	}  
	  
	return totalForce;
  }

}

