(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Cellular automaton class
function CA(rule, canvas) {
	this.rule = rule;
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	this.canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

	// Store the current lines for quick access.
	this.currentCells = {};
	this.previousCells = {};

	var middle = Math.floor(this.canvas.width / 2);

	this.putCell(middle, 0);

	for (var y = 0; y < this.canvas.height; y++) {
		this.processLine(y);
	}

	this.ctx.putImageData(this.canvasData, 0, 0);
}
CA.prototype.putCell = function (x, y) {
	// Set the cell on the current row to true.
	this.currentCells[x] = true;

	// Also put it on the canvas.
	var index = (x + y * this.canvas.width) * 4;
	this.canvasData.data[index] = 255;
	this.canvasData.data[index + 1] = 255;
	this.canvasData.data[index + 2] = 255;
	this.canvasData.data[index + 3] = 255;
};
CA.prototype.processLine = function (y) {
	this.previousCells = this.currentCells;
	this.currentCells = {};
	for (var x = 0; x < this.canvas.width; x++) {
		var ruleBit = 0;
		if (this.previousCells[x - 1]) {
			ruleBit += 4;
		}
		if (this.previousCells[x]) {
			ruleBit += 2;
		}
		if (this.previousCells[x + 1]) {
			ruleBit += 1;
		}
		if (this.rule & (1 << ruleBit)) {
			this.putCell(x, y);
		}
	}
};

var container = document.getElementById('container');

function clear() {
	container.innerHTML = '';
	// Remove any event listener.
	//window.removeEventListener('resize');
}

function showAllRules() {
	clear();

	// Create a canvas and CA for each possible rule.
	for (var rule = 0; rule < 256; rule++) {
		var wrapper = document.createElement('div');
		wrapper.className = 'canvas-wrapper';

		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 50;
		canvas.className = 'ca-small';

		var overlay = document.createElement('div');
		overlay.className = 'canvas-overlay noselect';
		overlay.innerHTML = 'Rule ' + rule;
		overlay.setAttribute('data-rule', rule);
		overlay.onclick = function (event) {
			var rule = event.target.getAttribute('data-rule');
			showSingleRule(rule);
		};

		var ca = new CA(rule, canvas);

		wrapper.appendChild(canvas);
		wrapper.appendChild(overlay);
		container.appendChild(wrapper);
	}
}

function showSingleRule(rule) {
	clear();

	var canvas = document.createElement('canvas');
	canvas.title = 'Rule ' + rule + ' - click to return';
	canvas.className = 'ca-full'
	canvas.onclick = function () {
		showAllRules();
	};
	container.appendChild(canvas);

	window.addEventListener('resize', draw);

	function draw() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var ca = new CA(rule, canvas);
	}

	draw();
}

showAllRules();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9tYWluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENlbGx1bGFyIGF1dG9tYXRvbiBjbGFzc1xuZnVuY3Rpb24gQ0EocnVsZSwgY2FudmFzKSB7XG5cdHRoaXMucnVsZSA9IHJ1bGU7XG5cdHRoaXMuY2FudmFzID0gY2FudmFzO1xuXHR0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdHRoaXMuY2FudmFzRGF0YSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuXHQvLyBTdG9yZSB0aGUgY3VycmVudCBsaW5lcyBmb3IgcXVpY2sgYWNjZXNzLlxuXHR0aGlzLmN1cnJlbnRDZWxscyA9IHt9O1xuXHR0aGlzLnByZXZpb3VzQ2VsbHMgPSB7fTtcblxuXHR2YXIgbWlkZGxlID0gTWF0aC5mbG9vcih0aGlzLmNhbnZhcy53aWR0aCAvIDIpO1xuXG5cdHRoaXMucHV0Q2VsbChtaWRkbGUsIDApO1xuXG5cdGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5jYW52YXMuaGVpZ2h0OyB5KyspIHtcblx0XHR0aGlzLnByb2Nlc3NMaW5lKHkpO1xuXHR9XG5cblx0dGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMuY2FudmFzRGF0YSwgMCwgMCk7XG59XG5DQS5wcm90b3R5cGUucHV0Q2VsbCA9IGZ1bmN0aW9uICh4LCB5KSB7XG5cdC8vIFNldCB0aGUgY2VsbCBvbiB0aGUgY3VycmVudCByb3cgdG8gdHJ1ZS5cblx0dGhpcy5jdXJyZW50Q2VsbHNbeF0gPSB0cnVlO1xuXG5cdC8vIEFsc28gcHV0IGl0IG9uIHRoZSBjYW52YXMuXG5cdHZhciBpbmRleCA9ICh4ICsgeSAqIHRoaXMuY2FudmFzLndpZHRoKSAqIDQ7XG5cdHRoaXMuY2FudmFzRGF0YS5kYXRhW2luZGV4XSA9IDI1NTtcblx0dGhpcy5jYW52YXNEYXRhLmRhdGFbaW5kZXggKyAxXSA9IDI1NTtcblx0dGhpcy5jYW52YXNEYXRhLmRhdGFbaW5kZXggKyAyXSA9IDI1NTtcblx0dGhpcy5jYW52YXNEYXRhLmRhdGFbaW5kZXggKyAzXSA9IDI1NTtcbn07XG5DQS5wcm90b3R5cGUucHJvY2Vzc0xpbmUgPSBmdW5jdGlvbiAoeSkge1xuXHR0aGlzLnByZXZpb3VzQ2VsbHMgPSB0aGlzLmN1cnJlbnRDZWxscztcblx0dGhpcy5jdXJyZW50Q2VsbHMgPSB7fTtcblx0Zm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmNhbnZhcy53aWR0aDsgeCsrKSB7XG5cdFx0dmFyIHJ1bGVCaXQgPSAwO1xuXHRcdGlmICh0aGlzLnByZXZpb3VzQ2VsbHNbeCAtIDFdKSB7XG5cdFx0XHRydWxlQml0ICs9IDQ7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByZXZpb3VzQ2VsbHNbeF0pIHtcblx0XHRcdHJ1bGVCaXQgKz0gMjtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJldmlvdXNDZWxsc1t4ICsgMV0pIHtcblx0XHRcdHJ1bGVCaXQgKz0gMTtcblx0XHR9XG5cdFx0aWYgKHRoaXMucnVsZSAmICgxIDw8IHJ1bGVCaXQpKSB7XG5cdFx0XHR0aGlzLnB1dENlbGwoeCwgeSk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBjbGVhcigpIHtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHQvLyBSZW1vdmUgYW55IGV2ZW50IGxpc3RlbmVyLlxuXHQvL3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnKTtcbn1cblxuZnVuY3Rpb24gc2hvd0FsbFJ1bGVzKCkge1xuXHRjbGVhcigpO1xuXG5cdC8vIENyZWF0ZSBhIGNhbnZhcyBhbmQgQ0EgZm9yIGVhY2ggcG9zc2libGUgcnVsZS5cblx0Zm9yICh2YXIgcnVsZSA9IDA7IHJ1bGUgPCAyNTY7IHJ1bGUrKykge1xuXHRcdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0d3JhcHBlci5jbGFzc05hbWUgPSAnY2FudmFzLXdyYXBwZXInO1xuXG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHRcdGNhbnZhcy53aWR0aCA9IDEwMDtcblx0XHRjYW52YXMuaGVpZ2h0ID0gNTA7XG5cdFx0Y2FudmFzLmNsYXNzTmFtZSA9ICdjYS1zbWFsbCc7XG5cblx0XHR2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG92ZXJsYXkuY2xhc3NOYW1lID0gJ2NhbnZhcy1vdmVybGF5IG5vc2VsZWN0Jztcblx0XHRvdmVybGF5LmlubmVySFRNTCA9ICdSdWxlICcgKyBydWxlO1xuXHRcdG92ZXJsYXkuc2V0QXR0cmlidXRlKCdkYXRhLXJ1bGUnLCBydWxlKTtcblx0XHRvdmVybGF5Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdHZhciBydWxlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1ydWxlJyk7XG5cdFx0XHRzaG93U2luZ2xlUnVsZShydWxlKTtcblx0XHR9O1xuXG5cdFx0dmFyIGNhID0gbmV3IENBKHJ1bGUsIGNhbnZhcyk7XG5cblx0XHR3cmFwcGVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cdFx0d3JhcHBlci5hcHBlbmRDaGlsZChvdmVybGF5KTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2hvd1NpbmdsZVJ1bGUocnVsZSkge1xuXHRjbGVhcigpO1xuXG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0Y2FudmFzLnRpdGxlID0gJ1J1bGUgJyArIHJ1bGUgKyAnIC0gY2xpY2sgdG8gcmV0dXJuJztcblx0Y2FudmFzLmNsYXNzTmFtZSA9ICdjYS1mdWxsJ1xuXHRjYW52YXMub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaG93QWxsUnVsZXMoKTtcblx0fTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRyYXcpO1xuXG5cdGZ1bmN0aW9uIGRyYXcoKSB7XG5cdFx0Y2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0Y2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR2YXIgY2EgPSBuZXcgQ0EocnVsZSwgY2FudmFzKTtcblx0fVxuXG5cdGRyYXcoKTtcbn1cblxuc2hvd0FsbFJ1bGVzKCk7XG4iXX0=
