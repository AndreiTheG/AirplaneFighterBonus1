const canvas = document.querySelector("canvas");
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
const squareXCoordinate = {val: (canvasWidth / 2) - 2};
const squareYCoordinate = {val: 600};
let squareWidth = 50;
let squareHeight = 50;

class Airplane {
    constructor(squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
    }

    movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        if (isDestroyed == false) {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            squareXCoordinate.val = squareXCoordinate.val + 5;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        } else {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        }
    }

    movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        if (isDestroyed == false) {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            squareXCoordinate.val = squareXCoordinate.val - 5;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        } else {
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        }
    }
}

class Asteroid {
    constructor(width, height) {
        function degToRad(degrees) {
            return (degrees * Math.PI) / 180;
        }
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.beginPath();
        ctx.arc(width, height, 20, degToRad(0), degToRad(360), false);
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

startTheGame();

function startTheGame() {
    const airplane = new Airplane(squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    let isDestroyed = false;
    addEventListener("keydown", (event) => {
        if (event.code == 'ArrowRight' && squareXCoordinate.val <= canvasWidth - 55) {
            airplane.movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        } else if (event.code == 'ArrowLeft' && squareXCoordinate.val >= 0) {
            airplane.movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        }
    })
    let initWidth = 25, initHeight = 25;
    let counter = 0;
    let asteroid = [];
    // const asteroids = {val: [0, 0, 0, 0]};
    // for (let i = 0; i < 4; ++i) {
    //     console.log(asteroids.val[i]);
    // }
    for (let i = 0; i * 100 + initWidth < canvasWidth; ++i) {
        asteroid[i] = new Asteroid(i * 100 + initWidth, initHeight);
        ++counter;
    }
    let randomWidth = Math.floor(Math.random() * counter), score = 0;
    const listCoordObj = {val: [randomWidth, 0, 0, 0]};
    const listXAxesObj = {val: [randomWidth * 100 + initWidth, 0, 0, 0]};
    const listYAxesObj = {val: [25, 25, 25, 25]};
    console.log(listXAxesObj.val[0]);
    //const height1 = {val: 25}, height2 = {val: 25}, height3 = {val: 25}, height4 = {val: 25};
    //const currentValue1 = {val: randomWidth}, currentValue2 = {val: 0}, currentValue3 = {val: 0}, currentValue4 = {val: 0};
    idInterval = window.setInterval(function() {
        if (listYAxesObj.val[0] > 25) {
            asteroid[listCoordObj.val[0]].previousHeight(listXAxesObj.val[0], listYAxesObj.val[0] - 5);
        }
        asteroid[listCoordObj.val[0]].fall(listXAxesObj.val[0], listYAxesObj.val[0]);
        asteroidGravity(asteroid, listCoordObj, listXAxesObj, listYAxesObj);
        if ((squareXCoordinate.val - listXAxesObj.val[2] >= 0 && squareXCoordinate.val - listXAxesObj.val[2] < 20 || 
            listXAxesObj.val[2] - squareXCoordinate.val >= 0 && listXAxesObj.val[2] - squareXCoordinate.val < 70) 
            && (squareYCoordinate.val - listYAxesObj.val[2] >= 0 && squareYCoordinate.val - listYAxesObj.val[2] < 20 
                || listYAxesObj.val[2] - squareYCoordinate.val >= 0 && listYAxesObj.val[2] - squareYCoordinate.val < 70)) {
            isDestroyed = true;
            GameOver(isDestroyed, airplane, asteroid, score, listCoordObj, listXAxesObj, listYAxesObj);
            window.clearInterval(idInterval);
        }
        if (listYAxesObj.val[2] == 700) {
            ++score;
           // changeCoordinates(listCoordObj, listXAxesObj, listYAxesObj, 3);
            changeCoordonates(listXAxesObj.val[3], listYAxesObj.val[3], listXAxesObj.val[2], listYAxesObj.val[2], listCoordObj.val[3], listCoordObj.val[2]);
            changeCoordonates(listXAxesObj.val[2], listYAxesObj.val[2], listXAxesObj.val[1], listYAxesObj.val[1], listCoordObj.val[2], listCoordObj.val[1]);
            changeCoordonates(listXAxesObj.val[1], listYAxesObj.val[1], listXAxesObj.val[0], listYAxesObj.val[0], listCoordObj.val[1], listCoordObj.val[0]);
            newRandomAsteroid(listCoordObj, listXAxesObj, listYAxesObj, initWidth, counter);
        } else if (listYAxesObj.val[1] == 575) {
            changeCoordinates(listCoordObj, listXAxesObj, listYAxesObj, 2);
            changeCoordonates(listXAxesObj.val[2], listYAxesObj.val[2], listXAxesObj.val[1], listYAxesObj.val[1], listCoordObj.val[2], listCoordObj.val[1]);
            changeCoordonates(listXAxesObj.val[1], listYAxesObj.val[1], listXAxesObj.val[0], listYAxesObj.val[0], listCoordObj.val[1], listCoordObj.val[0]);
            newRandomAsteroid(listCoordObj, listXAxesObj, listYAxesObj, initWidth, counter);
        } else if (listYAxesObj.val[0] == 300) {
            //changeCoordinates(listCoordObj, listXAxesObj, listYAxesObj, 1);
            changeCoordonates(listXAxesObj.val[1], listYAxesObj.val[1], listXAxesObj.val[0], listYAxesObj.val[0], listCoordObj.val[1], listCoordObj.val[0]);
            newRandomAsteroid(listCoordObj, listXAxesObj, listYAxesObj, initWidth, counter);
        }
        listYAxesObj.val[0] = listYAxesObj.val[0] + 5;
    }, 25);
}

/*function changeCoordinates(listCoordObj, listXAxesObj, listYAxesObj, startIndex) {
    for (let i = startIndex; i >= 0; --i) {
        listCoordObj.val[i] = listCoordObj.val[i - 1];
        listXAxesObj.val[i] = listXAxesObj.val[i - 1];
        listYAxesObj.val[i] = listYAxesObj.val[i - 1];
    }
}*/

function newRandomAsteroid(listCoordObj, listXAxesObj, listYAxesObj, initWidth, counter) {
    listCoordObj.val[0] = Math.floor(Math.random() * counter);
    listXAxesObj.val[0] = 25;
    listYAxesObj.val[0] = listCoordObj.val[0] * 100 + initWidth;
}

function asteroidGravity(asteroid, listCoordObj, listXAxesObj, listYAxesObj) {
    for (let i = 1; i < 4; ++i) {
        if (listXAxesObj.val[i] > 0) {
            if (i < 3) {
                listYAxesObj.val[i] = listYAxesObj.val[i] + 5;
            }
            asteroid[listCoordObj.val[i]].previousHeight(listXAxesObj.val[i], listYAxesObj.val[i] - 5);
            asteroid[listCoordObj.val[i]].fall(listXAxesObj.val[i], listYAxesObj.val[i]);
        }
    }
    /*if (width2.val > 0) {
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
    }*/
}

function changeCoordonates(CurrWidth, CurrHeight, PrevWidth, PrevHeight, CurrVal, PrevVal) {
    CurrWidth.val = PrevWidth.val;
    CurrHeight.val = PrevHeight.val;
    CurrVal.val = PrevVal.val;
}

function GameOver(isDestroyed, airplane, asteroid, score, listCoordObj, listXAxesObj, listYAxesObj) {
    airplane.movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    airplane.movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    for (let i = 0; i < 3; ++i) {
        asteroid[listCoordObj.val[i]].previousHeight(listXAxesObj.val[i], listYAxesObj.val[i]);
    }
    // asteroid[currentValue1.val].previousHeight(width1.val, height1.val);
    // asteroid[currentValue2.val].previousHeight(width2.val, height2.val);
    // asteroid[currentValue3.val].previousHeight(width3.val, height3.val);
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