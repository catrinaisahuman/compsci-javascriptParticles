function particleSystem(pos, size=0){
  this.size = myModel.particleCount;
  this.particles = [];
  this.pos = createVector(pos[1], pos[0]);
  this.click = createVector();
  this.timer = -1;
  this.target = createVector(0,0);
  this.start = true;
  run = true;
  toggle = false;
	
  testForce = createVector(1,1);
	
  this.run = function(){
  	for(i=0; i<this.particles.length; i++){
			this.particles[i].render();
  	}
  }
  
  this.update = function(){
  	for(let i=this.particles.length-1; i>=0; i--){   
		
		for(let i=this.particles.length-1; i>=0; i--){
			this.particles[i].tagOff();
		}
		
		for(x=this.particles.length - 1; x>=0; x--){
		 	
			if(p5.Vector.dist(this.particles[x].pos, this.particles[i].pos) < 50 && this.particles[x] != this.particles[i]){
				//console.log(p5.Vector.dist(this.particles[x].pos, this.particles[0].pos))
				this.particles[x].tagOn();
				
			}
			
			
		}
		this.particles[i].applyForce(this.particles[i].behavior.calculate()); 
		
		if(this.particles.length == this.size){
			this.runWhenFull(i);
			run = false
		}
		
		
		
		
		
    	if(this.particles[i].dead == true){
      		this.particles.splice(i, 1);
        }
		this.screenLoop(i);
		this.wanderToggle();
		this.particles[i].behavior.sepFactor = myModel.separation;
		this.particles[i].behavior.alignFactor = myModel.align;
		this.particles[i].maxVel = myModel.maxVel;
		
      }
	  this.size = myModel.particleCount;

	 
	 
  }

  
  this.add = function(posX, posY, velX, velY){
    if(this.particles.length < this.size){
  		p = new Particle([posX, posY], [velX, velY], this.decay, 10, this.col);
        this.particles.push(p);
		world.particles = this.particles;
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
  		this.add(random(1, 399), random(1, 399), 0,0)//random(-13, 13), random(-13,13));
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
  
  this.screenDeath = function(i){
	  
	  if(this.particles[i].pos.x < 0){
			this.particles[i].dead = true;
		}
		
		if(this.particles[i].pos.x > 400){
			this.particles[i].dead = true;
		}
	  
	  if(this.particles[i].pos.y < 0){
			this.particles[i].dead = true;
		}
		
		if(this.particles[i].pos.y > 400){
			this.particles[i].dead = true;
		}
  }
  
  this.runWhenFull = function(i){
	this.particles[i].alignOn();
	this.particles[i].separateOn();
  	this.particles[i].cohesionOn();
	
  	}
  
  this.wanderToggle = function(){
	if(myModel.wander == true){
		for(let i=this.particles.length-1; i>=0; i--){
			this.particles[i].wanderOn();
			
  		}
	}
	  
	if(myModel.wander == false){
		for(let i=this.particles.length-1; i>=0; i--){
			this.particles[i].wanderOff();
  		}
	}

  }

 

}

