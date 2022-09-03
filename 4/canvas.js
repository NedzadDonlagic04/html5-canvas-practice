const canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// Used to generate random numbers later
const getRandomNum = num => {
    return Math.floor(Math.random() * num);
}

// Used to track the mouse's position
const mouse = {
    x: undefined,
    y: undefined
}

// Used to update the mouse's position
window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Used to represent a single circle
// Has methods to draw the circle and update it's position
class Circle{
    constructor(x, y, radius, offSetX, offSetY)
    {
        this.x = x;
        this.y = y;

        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = 50;

        this.offSetX = Math.abs(offSetX);
        this.offSetY = Math.abs(offSetY);
        this.addX = offSetX;
        this.addY = offSetY;

        this.hslColors = [
            'hsl(214, 33%, 26%)',     // dark blue
            'hsl(360, 78%, 62%)',     // light red
            'hsl(20, 86%, 59%)',      // light orange
            'hsl(44, 100%, 69%)'      // yellow
        ];

        let index = getRandomNum(this.hslColors.length);
        this.color = this.hslColors[index];
    }

    drawCircle()
    {
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.stroke();
    }

    update()
    {
        if(this.x + this.radius > window.innerWidth)
        {
            this.addX = -this.offSetX;
        }
        else if(this.x - this.radius < 0)
        {
            this.addX = this.offSetX;
        }

        if(this.y + this.radius > window.innerHeight)
        {
            this.addY = -this.offSetY;
        }
        else if(this.y - this.radius < 0)
        {
            this.addY = this.offSetY;
        }

        this.x += this.addX;
        this.y += this.addY;

        const conditionX = this.x - mouse.x < 50 && this.x - mouse.x > -50; 
        const conditionY = this.y - mouse.y < 50 && this.y - mouse.y > -50;
        
        if(conditionX && conditionY)
        {
            if(this.radius < this.maxRadius)
            {
                this.radius += 2;
            }
        }
        else if(this.radius > this.minRadius)
        {
            this.radius -= 2;
        }

        this.drawCircle();
    }
}

const circleCount = 400;
let circles;

// Initializes the balls on screen
// Used in event listener later on to make screen resize not break anything
const init = () => {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    circles = [];

    // Used to instantiate a given amount of circles on the screen
    for(let i=0; i<circleCount; i++)
    {
        const x = getRandomNum(window.innerWidth);
        const y = getRandomNum(window.innerHeight);
        const radius = getRandomNum(15) + 2;
        let offSetX = getRandomNum(3) + 1;
        let offSetY = getRandomNum(3) + 1;

        if(Math.random() > 0.5)
        {
            offSetX = -offSetX;
        }
        if(Math.random() > 0.5)
        {
            offSetY = -offSetY;
        }

        circles.push( new Circle(x, y, radius, offSetX, offSetY) );
    }
}

// Used to resize the canvas' coordinate system 
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
});

// Used to animate all the circles on screen
const animate = () => {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i=0; i<circleCount; i++)
    {
        circles[i].update();
    }
}

init();
animate();