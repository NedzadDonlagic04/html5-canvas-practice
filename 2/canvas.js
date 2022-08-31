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
    const storage = [];

    for(let i=0; i<count; i++)
    {
        storage.push({
            index: 0,
            x: 0,
            y: 0
        });

        const index = getRandom(hslColors.length);

        c.fillStyle = hslColors[index];

        const x = getRandom(window.innerWidth);
        const y = getRandom(window.innerHeight);

        drawRect(x, y);

        [storage[i].index, storage[i].x, storage[i].y] = [index, x, y];
    }

    sessionStorage.setItem('rectLocation', JSON.stringify(storage));
}

// Used to restore the rectangles
// When a screen is resized they get reset by saving them in a session I can make sure
// they stay where they are until the site is reloaded
const restoreRect = () => {
    const storage = JSON.parse(sessionStorage.getItem('rectLocation'));

    for(const item of storage)
    {
        const {index, x, y} = item;

        c.fillStyle = hslColors[index];

        drawRect(x, y);
    }
}

createRects(5);

// Used to redraw the elements on the canvas once the window changes size
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    restoreRect();
})