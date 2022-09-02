const canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const c = canvas.getContext('2d');

// Used to generate random numbers later
const getRandomNum = num => {
    return Math.floor(Math.random() * num);
}

// Used to represent a single circle
// Has methods to draw the circle and update it's position
class Circle{
    constructor(x, y, radius, offSetX, offSetY)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.offSetX = offSetX;
        this.offSetY = offSetY;
        
        this.addX = offSetX;
        this.addY = offSetY;

        this.hslColors = [
            'hsl(1, 100%, 65%, .5)',    // red
            'hsl(45, 100%, 60%, .5)',   // yellow
            'hsl(90, 100%, 40%, .5)',   // green
            'hsl(180, 80%, 40%, .5)',   // blue
            'hsl(270, 80%, 70%, .5)'    // purple
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
            this.addX = - this.offSetX;
        }
        else if(this.x - this.radius < 0)
        {
            this.addX = this.offSetX;
        }

        if(this.y + this.radius > window.innerHeight)
        {
            this.addY = - this.offSetY;
        }
        else if(this.y - this.radius < 0)
        {
            this.addY = this.offSetY;
        }

        this.x += this.addX;
        this.y += this.addY;

        this.drawCircle();
    }
}

// Used to resize the canvas' coordinate system 
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const circleCount = 200;
const circles = [];

// Used to instantiate a given amount of circles on the screen
for(let i=0; i<circleCount; i++)
{
    const x = getRandomNum(window.innerWidth);
    const y = getRandomNum(window.innerHeight);
    const offSetX = getRandomNum(8) + 1;
    const offSetY = getRandomNum(8) + 1;

    circles.push( new Circle(x, y, 20, offSetX, offSetY) );
}

// Used to animate all the circles on screen
const animate = () => {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i=0; i<circleCount; i++)
    {
        circles[i].update();
    }
}

animate();