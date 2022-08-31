const canvas = document.querySelector('canvas');

const hslColors = [
    'hsl(1, 100%, 65%, .5)',    // red
    'hsl(45, 100%, 60%, .5)',   // yellow
    'hsl(90, 100%, 40%, .5)',   // green
    'hsl(180, 80%, 40%, .5)',   // blue
    'hsl(270, 80%, 70%, .5)'    // purple
];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// Used to draw the elements on the canvas
const drawRect = (x, y) => {
    c.fillRect(x, y, 100, 100);
}

// Used to generate a random value from 0 to the passed value
const getRandom = value => {
    return Math.floor( Math.random() * value );
}

// Used to create a passed amount of rectangles with random colors
const createRects = count => {
    for(let i=0; i<count; i++)
    {
        const index = getRandom(hslColors.length);

        c.fillStyle = hslColors[index];

        const x = getRandom(window.innerWidth);
        const y = getRandom(window.innerHeight);

        drawRect(x, y);
    }
}

createRects(5);

// Used to redraw the elements on the canvas once the window changes size
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    createRects(5);
})