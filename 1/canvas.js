const canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Used to draw the elements on the canvas
const drawRect = () => {
    const c = canvas.getContext('2d');

    c.fillRect(0, 0, 100, 100);
    c.fillRect(100, 100, 100, 100);
    c.fillRect(200, 200, 100, 100);
    c.fillRect(300, 300, 100, 100);
}

drawRect();

// Used to redraw the elements on the canvas once the window changes size
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    drawRect();
});