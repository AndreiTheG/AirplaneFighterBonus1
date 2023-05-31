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

function prevPlaneTrajectory(squareXCoordinate, squareYCoordinate, squareWidth, squareHeight) {
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.strokeRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
}

class Airplane {
    constructor(squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
    }

    movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        if (isDestroyed == false) {
            prevPlaneTrajectory(squareXCoordinate, squareYCoordinate, squareWidth, squareHeight)
            squareXCoordinate.val = squareXCoordinate.val + 5;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        } else {
            prevPlaneTrajectory(squareXCoordinate, squareYCoordinate, squareWidth, squareHeight);
        }
    }

    movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        if (isDestroyed == false) {
            prevPlaneTrajectory(squareXCoordinate, squareYCoordinate, squareWidth, squareHeight);
            squareXCoordinate.val = squareXCoordinate.val - 5;
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        } else {
            prevPlaneTrajectory(squareXCoordinate, squareYCoordinate, squareWidth, squareHeight);
        }
    }
}

function createObjects(width, height, valueCondition) {
    function degToRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
    if (valueCondition == 1) {
        ctx.fillStyle = "rgb(0, 0, 0)";
    } else if (valueCondition == 2) {
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.stroke();
    } else {
        ctx.fillStyle = "rgb(0, 0, 255)";
    }
    ctx.beginPath();
    ctx.arc(width, height, 20, degToRad(0), degToRad(360), false);
    ctx.fill();
}

class Asteroid {
    constructor(width, height) {
        createObjects(width, height, 1);
    }

    previousHeight(width, height) {
        createObjects(width, height, 2);
    }
    
    fall(width, height) {
        createObjects(width, height, 3);
    }
}

startTheGame();

function gameControl(airplane, isDestroyed) {
    addEventListener("keydown", (event) => {
        if (event.code == 'ArrowRight' && squareXCoordinate.val <= canvasWidth - 55) {
            airplane.movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        } else if (event.code == 'ArrowLeft' && squareXCoordinate.val >= 0) {
            airplane.movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        }
    })
}

function startTheGame() {
    const airplane = new Airplane(squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    let isDestroyed = false;
    gameControl(airplane, isDestroyed); 
    // addEventListener("keydown", (event) => {
    //     if (event.code == 'ArrowRight' && squareXCoordinate.val <= canvasWidth - 55) {
    //         airplane.movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    //     } else if (event.code == 'ArrowLeft' && squareXCoordinate.val >= 0) {
    //         airplane.movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    //     }
    // })
    let initialWidth = 25, initialHeight = 25;
    let counter = 0;
    let asteroid = [];
    for (let i = 0; i * 100 + initialWidth < canvasWidth; ++i) {
        asteroid[i] = new Asteroid(i * 100 + initialWidth, initialHeight);
        ++counter;
    }
    let randomWidth = Math.floor(Math.random() * counter);
    const score = {val: 0};
    const listCoordObj = {val: [randomWidth, 0, 0, 0]};
    const listAxesXObj = {val: [randomWidth * 100 + initialWidth, 0, 0, 0]}; 
    const listAxesYObj = {val: [25, 25, 25, 25]};
    idInterval = window.setInterval(function() {
        if (listAxesYObj.val[0] > 25) {
            asteroid[listCoordObj.val[0]].previousHeight(listAxesXObj.val[0], listAxesYObj.val[0] - 5);
        }
        asteroid[listCoordObj.val[0]].fall(listAxesXObj.val[0], listAxesYObj.val[0]);
        asteroidGravity(asteroid, listCoordObj, listAxesXObj, listAxesYObj);
        collision(idInterval, isDestroyed, airplane, asteroid, score, listCoordObj, listAxesXObj, listAxesYObj);
        objectsTrajectory(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter, score);
        listAxesYObj.val[0] = listAxesYObj.val[0] + 5;
    }, 25);
}

function objectsTrajectory(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter, score) {
    if (listAxesYObj.val[2] == 700) {
        ++score.val;
        changeCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 3);
        newRandomAsteroid(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    } else if (listAxesYObj.val[1] == 575) {
        changeCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 2);
        newRandomAsteroid(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    } else if (listAxesYObj.val[0] == 300) {
        changeCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 1);
        newRandomAsteroid(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    }
}

function collision(idInterval, isDestroyed, airplane, asteroid, score, listCoordObj, listAxesXObj, listAxesYObj) {
    if ((squareXCoordinate.val - listAxesXObj.val[2] >= 0 && squareXCoordinate.val - listAxesXObj.val[2] < 20 || 
            listAxesXObj.val[2] - squareXCoordinate.val >= 0 && listAxesXObj.val[2] - squareXCoordinate.val < 70) 
            && (squareYCoordinate.val - listAxesYObj.val[2] >= 0 && squareYCoordinate.val - listAxesYObj.val[2] < 20 || 
            listAxesYObj.val[2] - squareYCoordinate.val >= 0 && listAxesYObj.val[2] - squareYCoordinate.val < 70)) {
        isDestroyed = true;
        GameOver(isDestroyed, airplane, asteroid, score, listCoordObj, listAxesXObj, listAxesYObj);
        window.clearInterval(idInterval);
    }
}

function changeCoordinates(listCoordObj, listAxesXObj, listAxesYObj, nrIterations) {
    for (let i = nrIterations; i >= 1; --i) {
        listAxesXObj.val[i] = listAxesXObj.val[i - 1];
        listAxesYObj.val[i] = listAxesYObj.val[i - 1];
        listCoordObj.val[i] = listCoordObj.val[i - 1];
    }
}

function newRandomAsteroid(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter) {
    listCoordObj.val[0] = Math.floor(Math.random() * counter);
    listAxesXObj.val[0] = listCoordObj.val[0] * 100 + initialWidth;
    listAxesYObj.val[0] = 25;
}

function asteroidGravity(asteroid, listCoordObj, listAxesXObj, listAxesYObj) {
    for (let i = 1; i < 4; ++i) {
        if (listAxesXObj.val[i] > 0) {
            if (i < 3) {
                listAxesYObj.val[i] = listAxesYObj.val[i] + 5;
                asteroid[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                asteroid[listCoordObj.val[i]].fall(listAxesXObj.val[i], listAxesYObj.val[i]);
            } else {
                asteroid[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                asteroid[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
            }
        }
    }
}

function GameOver(isDestroyed, airplane, asteroid, score, listCoordObj, listAxesXObj, listAxesYObj) {
    airplane.movePlaneToLeft(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    airplane.movePlaneToRight(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    for (let i = 0; i < 3; ++i) {
        asteroid[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
    }
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("Your score is " + score.val + "!", canvasWidth / 2, canvasHeight / 2);
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