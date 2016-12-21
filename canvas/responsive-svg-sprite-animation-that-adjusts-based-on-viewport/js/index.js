var shape = document.getElementById("svg");

// media query event handler
if (matchMedia) {
	var mq = window.matchMedia("(min-width: 500px)");
	mq.addListener(WidthChange);
	WidthChange(mq);
}
// media query change
function WidthChange(mq) {
	if (mq.matches) {
    shape.setAttribute("viewBox", "0 0 490 474");
    shape.setAttribute("enable-background", "0 0 490 474");
	}
	else {
    shape.setAttribute("viewBox", "0 490 500 500");
    shape.setAttribute("enable-background", "0 490 500 500");
	}
};