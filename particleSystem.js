function particleSystem(pos, size=1){
  this.size = size;
  this.particles = [];
  this.pos = createVector(pos[1], pos[0]);
  this.click = createVector();
  this.timer = -1;
  this.target = createVector();
	
  this.run = function(){
  	for(i=0; i<this.particles.length; i++){
			this.particles[i].render();
  	}
  }
  
  this.update = function(){
  	for(i=this.particles.length - 1; i>=0; i--){
		//this.particles[i].vel = (b.arive(createVector(mouseX, mouseY), this.particles[i]))
		
        this.target = b.wander(this.particles[i]);	
		this.particles[i].applyForce(b.seek(this.target, this.particles[i]));
    	if(this.particles[i].dead == true){
      		this.particles.splice(i, 1);
        }
      }
	  
	 
  }

  
  this.add = function(posX, posY, velX, velY){
    if(this.particles.length < this.size){
  		p = new Particle([posX, posY], [velX, velY], this.decay, 10, this.col);
        this.particles.push(p);
    	}
    }
  
  this.setPosition = function(x,y){
  	this.pos.x = x;
    this.pos.y = y;
  }
  
  this.emit = function(x,y){
    this.col = [random(0,255), random(0,255), random(0,255)];
    this.decay= random(0.0015, 0.00009);
    for(i=0; i<this.size; i++){
  		this.add(x, y, random(-13, 13), random(-15,9));
    }
  }
  
  this.wind = function(){
    for(i=0; i<this.size; i++){    
        this.particles[i].applyForce(b.wind(createVector(mouseX, mouseY), this.particles[i]));
    }
  }
}