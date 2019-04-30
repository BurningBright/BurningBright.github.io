// old messy code from an abandoned js1k entry, don't judge me!

b = document.body;
a = document.createElement( 'canvas' );
c = a.getContext( '2d' );
a.width = window.innerWidth;
a.height = window.innerHeight;
b.appendChild( a );

var goal,
	followers = [],
	count = 400,
	md = 0,
	mx = a.width / 2,
	my = a.height / 2,
	tick = 0,
	hue = 0;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function Goal() {
	this.x = a.width / 2;
	this.y = a.height + 10;
	this.ax = 0;
	this.ay = 0;
	this.vx = 0;
	this.vy = 0;
	this.r = 1;
}

Goal.prototype.step = function() {
	this.ax += rand( -0.4, 0.4 );
	this.ay += rand( -0.4, 0.4 );
	this.vx += this.ax;
	this.vy += this.ay;
	this.ax *= Math.abs( this.ax ) > 3 ? 0.75 : 1;
	this.ay *= Math.abs( this.ay ) > 3 ? 0.75 : 1;
	this.vx *= Math.abs( this.vx ) > 5 ? 0.75 : 1;
	this.vy *= Math.abs( this.vy ) > 5 ? 0.75 : 1;
	this.x += this.vx;
	this.y += this.vy;
	if( this.x + this.r >= a.width || this.x <= this.r ) { this.vx = 0; this.ax = 0; }
	if( this.y + this.r >= a.height || this.y <= this.r ) { this.vy = 0; this.ay = 0; }
	if( this.x + this.r >= a.width ) { this.x = a.width - this.r; }
	if( this.x <= this.r ) { this.x = this.r; }
	if( this.y + this.r >= a.height ) { this.y = a.height - this.r; }
	if( this.y <= this.r ) { this.y = this.r; }

	if( md ) {
		this.vx += ( mx - this.x ) * 0.02;
		this.vy += ( my - this.y ) * 0.02;
	}
};

function Follower( leader, r, d ) {
	this.x = a.width / 2;
	this.y = a.height / 2;
	this.vx = 0;
	this.vy = 0;
	this.r = r;
	this.leader = leader;
	this.damp = d;
}

Follower.prototype.step = function() {
	this.vx = ( this.leader.x - this.x ) * this.damp;
	this.vy = ( this.leader.y - this.y ) * this.damp;
	this.x += this.vx;
	this.y += this.vy;
};

function loop() {
	requestAnimationFrame( loop );

	// step
	goal.step();
	goal.step();
	goal.step();

	c.globalCompositeOperation = 'lighter';
	c.beginPath();
	c.moveTo( followers[ 0 ].x, followers[ 0 ].y );
	followers.forEach( function( follower, i ) {
		follower.step();
		if( i > 0 ) {
			c.lineTo( follower.x, follower.y );
		}
	});
	c.lineWidth = 1.1;
	c.strokeStyle = 'hsla(0, 0%, 0%, 0.05)';
	c.strokeStyle = 'hsla(' + ( hue + rand( -10, 10 ) ) + ', '+rand(50, 100)+'%, '+rand(30, 60)+'%, '+rand(0.01, 0.1)+')';
	c.stroke();

	tick++;
}

function reset() {
	c.clearRect( 0, 0, a.width, a.height );
	goal.x = a.width / 2;
	goal.y = a.height + 10;
	followers.forEach( function( follower, i ) {
		follower.x = a.width / 2
		follower.y = a.height + 10;
	});
}

goal = new Goal();

for( var i = 0; i < count; i++ ) {
	var leader = ( i == 0 ) ? goal : followers[ i - 1 ],
		r = 1 + ( ( count - i ) / count ) * 10,
		d = ( i == 0 ) ? 0.05 : 0.4;
	followers.push( new Follower( leader, r, d ) );
}

window.addEventListener( 'mousedown', function() {
	hue = rand( 0, 360 );
	reset();
	md = 1;
});

window.addEventListener( 'mouseup', function() {
	md = 0;
});

window.addEventListener( 'mousemove', function( e ) {
	mx = e.clientX;
	my = e.clientY;
});

loop();
reset();
