const canvas = document.querySelector("canvas");
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

startTheGame();
// let dx = (canvasWidth / 2) - 2;
// let dy = 600;
// let x = 5;
// let squareWidth = 50;
// let squareHeight = 50;

class Airplane {
    constructor() {
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(dx, dy, squareWidth, squareHeight);
    }

    moveToRight(isDestroyed) {
        if (isDestroyed == false) {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(dx, dy, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
            dx = dx + x;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
        } else {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(dx, dy, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
        }
    }

    moveToLeft(isDestroyed) {
        if (isDestroyed == false) {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(dx, dy, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
            dx = dx - x;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
        } else {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(dx, dy, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(dx, dy, squareWidth, squareHeight);
        }
    }
}

// const airplane = new Airplane();
// let isDestroyed = false;

// addEventListener("keydown", (event) => {
//     if (event.code == 'ArrowRight' && dx <= canvasWidth - 55) {
//         airplane.moveToRight(isDestroyed);
//     } else if (event.code == 'ArrowLeft' && dx >= 0) {
//         airplane.moveToLeft(isDestroyed);
//     }
// })

class Asteroid {
    constructor(width, height) {
        function degToRad(degrees) {
            return (degrees * Math.PI) / 180;
        }
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.beginPath();
        ctx.arc(width,  height, 20, degToRad(0), degToRad(360), false);
        ctx.fill();
    }

    previousHeight(width, height) {
        function degToRad(degrees) {
            return (degrees * Math.PI) / 180;
        }
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.beginPath();
        ctx.arc(width, height, 20, degToRad(0), degToRad(360), false);
        ctx.stroke();
        ctx.fill();
    }
    
    fall(width, height) {
        function degToRad(degrees) {
            return (degrees * Math.PI) / 180;
        }
        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.beginPath();
        ctx.arc(width, height, 20, degToRad(0), degToRad(360), false);
        ctx.fill();
    }
}

function startTheGame() {
    let dx = (canvasWidth / 2) - 2;
    let dy = 600;
    let x = 5;
    let squareWidth = 50;
    let squareHeight = 50;

    const airplane = new Airplane();
    let isDestroyed = false;

    addEventListener("keydown", (event) => {
        if (event.code == 'ArrowRight' && dx <= canvasWidth - 55) {
            airplane.moveToRight(isDestroyed);
        } else if (event.code == 'ArrowLeft' && dx >= 0) {
            airplane.moveToLeft(isDestroyed);
        }
    })

    let initWidth = 25, initHeight = 25;
    let counter = 0;
    let asteroid = [];
    for (let i = 0; i * 100 + initWidth < canvasWidth; ++i) {
        asteroid[i] = new Asteroid(i * 100 + initWidth, initHeight);
        ++counter;
    }
    let randomWidth = Math.floor(Math.random() * counter), score = 0;
    const width1 = {val: randomWidth * 100 + initWidth}, width2 = {val: 0}, width3 = {val: 0}, width4 = {val: 0};
    const height1 = {val: 25}, height2 = {val: 25}, height3 = {val: 25}, height4 = {val: 25};
    const currentValue1 = {val: randomWidth}, currentValue2 = {val: 0}, currentValue3 = {val: 0}, currentValue4 = {val: 0};

    idInterval = window.setInterval(function() {
        if (height1.val > 25) {
            asteroid[currentValue1.val].previousHeight(width1.val, height1.val - 5);
        }
        asteroid[currentValue1.val].fall(width1.val, height1.val);
        asteroidGravity(width2, height2, currentValue2, width3, height3, currentValue3, width4, height4, currentValue4);
        if ((dx - width3.val >= 0 && dx - width3.val < 20 || width3.val - dx >= 0 && width3.val - dx < 70) 
            && (dy - height3.val >= 0 && dy - height3.val < 20 || height3.val - dy >= 0 && height3.val - dy < 70)) {
            isDestroyed = true;
            GameOver(isDestroyed);
            window.clearInterval(idInterval);
        }
        if (height3.val == 700) {
            ++score;
            changeCoordonates(width4, height4, width3, height3, currentValue4, currentValue3);
            changeCoordonates(width3, height3, width2, height2, currentValue3, currentValue2);
            changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
            newRandomAsteroid(currentValue1, height1, width1);
        } else if (height2.val == 575) {
            changeCoordonates(width3, height3, width2, height2, currentValue3, currentValue2);
            changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
            newRandomAsteroid(currentValue1, height1, width1);
        } else if (height1.val == 300) {
            changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
            newRandomAsteroid(currentValue1, height1, width1);
        }
        height1.val = height1.val + 5;
    }, 25);
}

// let initWidth = 25, initHeight = 25;
// let counter = 0;
// let asteroid = [];
// for (let i = 0; i * 100 + initWidth < canvasWidth; ++i) {
//     asteroid[i] = new Asteroid(i * 100 + initWidth, initHeight);
//     ++counter;
// }
// let randomWidth = Math.floor(Math.random() * counter), score = 0;
// const width1 = {val: randomWidth * 100 + initWidth}, width2 = {val: 0}, width3 = {val: 0}, width4 = {val: 0};
// const height1 = {val: 25}, height2 = {val: 25}, height3 = {val: 25}, height4 = {val: 25};
// const currentValue1 = {val: randomWidth}, currentValue2 = {val: 0}, currentValue3 = {val: 0}, currentValue4 = {val: 0};

// idInterval = window.setInterval(function() {
//     if (height1.val > 25) {
//         asteroid[currentValue1.val].previousHeight(width1.val, height1.val - 5);
//     }
//     asteroid[currentValue1.val].fall(width1.val, height1.val);
//     asteroidGravity(width2, height2, currentValue2, width3, height3, currentValue3, width4, height4, currentValue4);
//     if ((dx - width3.val >= 0 && dx - width3.val < 20 || width3.val - dx >= 0 && width3.val - dx < 70) 
//         && (dy - height3.val >= 0 && dy - height3.val < 20 || height3.val - dy >= 0 && height3.val - dy < 70)) {
//         isDestroyed = true;
//         GameOver(isDestroyed);
//         window.clearInterval(idInterval);
//     }
//     if (height3.val == 700) {
//         ++score;
//         changeCoordonates(width4, height4, width3, height3, currentValue4, currentValue3);
//         changeCoordonates(width3, height3, width2, height2, currentValue3, currentValue2);
//         changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
//         newRandomAsteroid(currentValue1, height1, width1);
//     } else if (height2.val == 575) {
//         changeCoordonates(width3, height3, width2, height2, currentValue3, currentValue2);
//         changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
//         newRandomAsteroid(currentValue1, height1, width1);
//     } else if (height1.val == 300) {
//         changeCoordonates(width2, height2, width1, height1, currentValue2, currentValue1);
//         newRandomAsteroid(currentValue1, height1, width1);
//     }
//     height1.val = height1.val + 5;
// }, 25);

function newRandomAsteroid(initialValue, initialHeight, initialWidth) {
    initialValue.val = Math.floor(Math.random() * counter);
    initialHeight.val = 25;
    initialWidth.val = initialValue.val * 100 + initWidth;
}

function asteroidGravity(width2, height2, currentValue2, width3, height3, currentValue3, width4, height4, currentValue4) {
    if (width2.val > 0) {
        height2.val = height2.val + 5;
        asteroid[currentValue2.val].previousHeight(width2.val, height2.val - 5);
        asteroid[currentValue2.val].fall(width2.val, height2.val);
    }
    if (width3.val > 0) {
        height3.val = height3.val + 5;
        asteroid[currentValue3.val].previousHeight(width3.val, height3.val - 5);
        asteroid[currentValue3.val].fall(width3.val, height3.val);
    }
    if (width4.val > 0) {
        asteroid[currentValue4.val].previousHeight(width4.val, height4.val - 5);
        asteroid[currentValue4.val].previousHeight(width4.val, height4.val);
    }
}

function changeCoordonates(CurrWidth, CurrHeight, PrevWidth, PrevHeight, CurrVal, PrevVal) {
    CurrWidth.val = PrevWidth.val;
    CurrHeight.val = PrevHeight.val;
    CurrVal.val = PrevVal.val;
}

function GameOver() {
    airplane.moveToLeft(isDestroyed);
    airplane.moveToRight(isDestroyed);
    asteroid[currentValue1.val].previousHeight(width1.val, height1.val);
    asteroid[currentValue2.val].previousHeight(width2.val, height2.val);
    asteroid[currentValue3.val].previousHeight(width3.val, height3.val);
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("Your score is " + score + "!", canvasWidth / 2, canvasHeight / 2);
    let container = document.createElement('div');
    container.className = "text-center";
    let button = document.createElement('button');
    button.id = "refreshButton";
    button.className = "btn btn-success";
    button.innerHTML = "Restart";
    button.addEventListener('click', ()=> {
        Restart();
    });
    container.appendChild(button);  
    document.body.appendChild(container);  
}

function Restart() {
    window.location.reload();
}