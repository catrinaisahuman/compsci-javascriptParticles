function Behaviors(){
		
  this.seek = function(target, particle){
  	targetDir = p5.Vector.sub(target, particle.pos);
    steeringForce = targetDir.sub(particle.vel).normalize();
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
  
}