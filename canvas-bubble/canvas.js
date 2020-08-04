var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// getting all canvas object on var c
var c = canvas.getContext('2d');

var maxRadious = 40;

var colorArray = [
	'#F25116',
	'#025951',
	'#027368',
	'#048ABF',
	'#A7C8F2'
];

var mouse = {
	x: undefined,
	y: undefined
}

// Calling event when mouse move
window.addEventListener('mousemove', 
	function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse)
});

// Calling event when resize the window
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});


// Object Oriented Function for Multiple Circles
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadious = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill()
	}

	this.update = function(){
		if(this.x + radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}
		if(this.y + radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// For interactivity
		if( mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50
		){
			if (this.radius < maxRadious){
				this.radius += 1;
			}
		}else if (this.radius > this.minRadious){
			this.radius -= 1;
		}

		this.draw();
	}
}

var circleArray = [];

for(var i = 0; i < 1000; i++){

	// Circle size
	var radius = Math.random() * 4 + 1; 

	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;

	// velocity or speed
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);

	circleArray.push(new Circle(x, y, dx, dy, radius));
}


// For animation
function animate(){

	// Builtin Mathod for animation
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight)

	
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();

