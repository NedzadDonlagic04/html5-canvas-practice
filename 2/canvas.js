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

const getRandObj = () => {
    const obj = {
        x: getRandom(window.innerWidth),
        y: getRandom(window.innerHeight)
    }

    return obj;
}

// Used to create a passed amount of rectangles with random colors
const createRects = count => {
    const storage = [];

    for(let i=0; i<count; i++)
    {
        storage.push({
            color: 0,
            x: 0,
            y: 0
        });

        const index = getRandom(hslColors.length);

        c.fillStyle = hslColors[index];

        const {x, y} = getRandObj();

        drawRect(x, y);

        [storage[i].color, storage[i].x, storage[i].y] = [hslColors[index], x, y];
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
        const {color, x, y} = item;

        c.fillStyle = color;

        drawRect(x, y);
    }
}

// Used to create a single line
const createLine = (startX, startY, x, y, lineWidth=2) => {
    c.beginPath();
    c.moveTo(startX, startY);
    c.lineTo(x, y);
    c.lineWidth = lineWidth;
    c.stroke();
}

// Used to create a passed amount of lines with random colors
const createLines = count => {
    const storage = [];

    let start, lastSpot;

    for(let i=0; i<count; i++)
    {
        storage.push({
            color: 0,
            startX: 0,
            startY: 0,
            lastX: 0,
            lastY: 0
        });

        const index = getRandom(hslColors.length);

        c.strokeStyle = hslColors[index];

        if(i === 0)
        {
            start = getRandObj();

            lastSpot = getRandObj();
            
            createLine(start.x, start.y, lastSpot.x, lastSpot.y);
        }
        else
        {
            start = lastSpot;

            lastSpot = getRandObj();
            
            createLine(start.x, start.y, lastSpot.x, lastSpot.y);
        }

        storage[i].color = hslColors[index];
        [storage[i].startX, storage[i].startY] = [start.x, start.y];
        [storage[i].lastX, storage[i].lastY] = [lastSpot.x, lastSpot.y];
    }

    sessionStorage.setItem('linesLocation', JSON.stringify(storage));
}

// Used to restore the lines
// When a screen is resized they get reset by saving them in a session I can make sure
// they stay where they are until the site is reloaded
const restoreLines = () => {
    const storage = JSON.parse(sessionStorage.getItem('linesLocation'));

    for(const item of storage)
    {
        const { color, startX, startY, lastX, lastY } = item;

        c.strokeStyle = color;
        createLine(startX, startY, lastX, lastY);
    }
}

// Used to draw a single circle
const drawCircle = (x, y) => {
    c.beginPath();
    c.arc(x, y, 50, 0, Math.PI * 2);
    c.fill();
    c.stroke();
}

// Used to create a passed amount of circles with random colors
const drawCircles = count => {
    const storage = [];

    for(let i=0; i<count; i++)
    {
        storage.push({
            color: 0,
            x: 0,
            y: 0
        });

        const index = getRandom(hslColors.length);

        c.strokeStyle = hslColors[index];
        c.fillStyle = hslColors[index];

        const {x, y} = getRandObj();

        drawCircle(x, y);

        [storage[i].color, storage[i].x, storage[i].y] = [hslColors[index], x, y];
    }

    sessionStorage.setItem('circlesLocation', JSON.stringify(storage));
}

// Used to restore the circles
// When a screen is resized they get reset by saving them in a session I can make sure
// they stay where they are until the site is reloaded
const restoreCircles = () => {
    const storage = JSON.parse(sessionStorage.getItem('circlesLocation'));

    for(const item of storage)
    {
        const {color, x, y} = item;

        c.strokeStyle = color;
        c.fillStyle = color;

        drawCircle(x, y);
    }
}

createRects(10);
createLines(10);
drawCircles(10);

// Used to redraw the elements on the canvas once the window changes size
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    restoreRect();
    restoreLines();
    restoreCircles();
})