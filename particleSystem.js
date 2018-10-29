function particleSystem(pos, size=2){
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
        
		this.particles[1].target = b.persue(this.particles[0], this.particles[1]);
		this.particles[0].target = b.wander(this.particles[0]);
		
		if(this.particles[1].target != null){
			this.particles[1].applyForce(b.seek(this.particles[1].target, this.particles[1]));
		}
		
		if(this.particles[0].target != null){
			this.particles[0].applyForce(b.seek(this.particles[0].target, this.particles[0]));
		}
		
    	if(this.particles[i].dead == true){
      		this.particles.splice(i, 1);
        }
		this.screenLoop(i);
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
  		this.add(random(0, 400), random(0, 400), random(-13, 13), random(-15,9));
    }
  }
  
  this.wind = function(){
    for(i=0; i<this.size; i++){    
        this.particles[i].applyForce(b.wind(createVector(mouseX, mouseY), this.particles[i]));
    }
  }
  
  this.screenLoop = function(i){
	  
	  if(this.particles[i].pos.x < 0){
			this.particles[i].pos.x = 400;
		}
		
		if(this.particles[i].pos.x > 400){
			this.particles[i].pos.x = 0;
		}
	  
	  if(this.particles[i].pos.y < 0){
			this.particles[i].pos.y = 400;
		}
		
		if(this.particles[i].pos.y > 400){
			this.particles[i].pos.y = 0;
		}
  }
}