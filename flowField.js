function flowField(rows= 39, cols= 39){
	this.rows = rows
	this.rowSpace = 10;
	this.cols = cols;
	this.colSpace = 10;
	this.points = [];
	
	
	this.update = function(){
		for(i=0;i<this.points.length;i++){
			//this.points[i].display();
			noiseVal = noise(this.points[i].row, this.points[i].col);
			radian = lerp(noiseVal, 0, 2*PI);
			this.points[i].vector.set(cos(radian)*2, sin(radian)*2);
			
		}
	}
	
	this.display = function(){
		for(i=1;i<=this.rows;i++){
			for(x=1;x<=this.cols;x++){
				p = new flowPoint(x*this.colSpace, i*this.rowSpace, 0, 0, i, x);
				this.points.push(p);
			}
		}
	}
}

function flowPoint(x, y, vx, vy, row, col){
	this.x = x;
	this.y = y;
	this.pos = createVector(x, y);
	this.vector = createVector(vx, vy);
	this.row = row;
	this.col = col;
	
	
	this.display = function(){
		fill(0,0,0);
		ellipse(this.x, this.y, 2);
		line(this.x, this.y, this.x + this.vector.x*4, this.y + this.vector.y*4);
	}
}