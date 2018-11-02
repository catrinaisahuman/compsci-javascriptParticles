function particleSystem(pos, size=1){
  this.size = size;
  this.particles = [];
  this.pos = createVector(pos[1], pos[0]);
  this.click = createVector();
  this.timer = -1;
  this.target = createVector(0,0);
	
  this.run = function(){
  	for(i=0; i<this.particles.length; i++){
			this.particles[i].render();
  	}
  }
  
  this.update = function(){
  	for(i=this.particles.length - 1; i>=0; i--){   
		
		this.particles[i].applyForce(this.particles[i].behavior.calculate()); 
		this.particles[i].setTarget(this.target);
		
		
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
		this.particles[i].wanderOn();
		this.particles[i].fleeOn();
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