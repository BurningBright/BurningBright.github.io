console.log('This would be the main JS file.');

/*Bubble*/
var myName = "lcg51271";
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
var letterColors = [red, orange, green, blue, purple];

drawName(myName, letterColors);
// square
bubbleShape = 'circle';
if(IsPC()) {
	bounceBubbles();
} else {
	draw();
}