const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

let painting = false;

// Set initial stroke color
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = 2;
ctx.lineCap = 'round';

colorPicker.addEventListener('input', () => {
  ctx.strokeStyle = colorPicker.value;
});

// Mouse events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseout', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch events for mobile
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchcancel', endPosition);
canvas.addEventListener('touchmove', draw);

clearBtn.addEventListener('click', clearCanvas);

function startPosition(e) {
  e.preventDefault();
  painting = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));
}

function endPosition(e) {
  e.preventDefault();
  painting = false;
  ctx.closePath();
}

function draw(e) {
  e.preventDefault();
  if (!painting) return;
  ctx.lineTo(getX(e), getY(e));
  ctx.stroke();
}

function getX(e) {
  return e.clientX || (e.touches && e.touches[0].clientX) - canvas.getBoundingClientRect().left;
}

function getY(e) {
  return e.clientY || (e.touches && e.touches[0].clientY) - canvas.getBoundingClientRect().top;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
