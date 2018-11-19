let myModel = {
	wander: false,
	particleCount : 0,
	separation : 20,
	align : 15,
	maxVel : 1
}


function wanderToggleModel(){
	if(myModel.wander == false){
		myModel.wander = true
	} else {
		myModel.wander = false
	}

  }

function setParticleCount(){
	myModel.particleCount = document.getElementById('particleCount').value;
}


function setSeparation(){
	myModel.separation = document.getElementById('separation').value * 1.0;
	document.getElementById('separationValue').value = myModel.separation;
}
function setSeparationValue(){
	myModel.separation = document.getElementById('separationValue').value * 1.0;
	document.getElementById('separation').value = myModel.separation;
}

function setAlign(){
	myModel.align = document.getElementById('align').value * 1.0;
	document.getElementById('alignValue').value = myModel.align;
}
function setAlignValue(){
	myModel.align = document.getElementById('alignValue').value * 1.0;
	document.getElementById('align').value = myModel.align;
}

function setMaxVel(){
	myModel.maxVel = document.getElementById('maxVel').value * 1.0;
	document.getElementById('maxVelValue').value = myModel.maxVel;
}
function setMaxVelValue(){
	myModel.maxVel = document.getElementById('maxVelValue').value * 1.0;
	document.getElementById('maxVel').value = myModel.maxVel;
}