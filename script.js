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
let direction = 0;

function prevPlaneTrajectory() {
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

    movePlane(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate) {
        if (isDestroyed.val == false) {
            prevPlaneTrajectory() ;
            if (direction == 1) {
                squareXCoordinate.val = squareXCoordinate.val + 5;
            } else {
                squareXCoordinate.val = squareXCoordinate.val - 5;
            }
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val, squareWidth, squareHeight);
        } else {
            prevPlaneTrajectory();
        }
    }

    shoot(isDestroyed, squareXCoordinate, squareYCoordinate, shouted) {
        if (isDestroyed.val == false) {
            shouted.val = true;
            ctx.fillStyle = "rgb(255, 255, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val - 40, 10, 20);
            console.log("Shooting......");
        } else {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val - 40, 10, 20);
            console.log("False");
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

class Object {
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

function gameController(airplane, isDestroyed) {
    addEventListener("keydown", (event) => {
        if ((event.code == 'ArrowRight' && squareWidth <= canvasWidth - 55) || (event.code == 'ArrowLeft' && squareWidth >= 0)) {
            if (event.code == 'ArrowRight' && squareWidth <= canvasWidth - 55) {
                direction = 1;
            } else {
                direction = -1;
            }
            airplane.movePlane(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        }
        // } else if (event.code == 'Enter') {
        //     airplane.shooting(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
        // }
    })
}

function shooting(airplane, isDestroyed, shouted) {
    addEventListener("keydown", (event) => {
        if (event.code == 'Enter') {
            airplane.shoot(isDestroyed, squareXCoordinate, squareYCoordinate, shouted);
        }
    })
}

function startTheGame() {
    const airplane = new Airplane(squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    const isDestroyed = {val: false};
    gameController(airplane, isDestroyed);
    const shouted = {val: false};
    shooting(airplane, isDestroyed, shouted);
    //if (shouted.val == true) {
    //    console.log("Adevarat");
    //}
    let initialWidth = 25, initialHeight = 25;
    let counter = 0;
    let object = [];
    for (let i = 0; i * 100 + initialWidth < canvasWidth; ++i) {
        object[i] = new Object(i * 100 + initialWidth, initialHeight);
        ++counter;
    }
    let randomWidth = Math.floor(Math.random() * counter);
    const score = {val: 0};
    const listCoordObj = {val: [randomWidth, 0, 0, 0]};
    const listAxesXObj = {val: [randomWidth * 100 + initialWidth, 0, 0, 0]}; 
    const listAxesYObj = {val: [25, 25, 25, 25]};
    idInterval = window.setInterval(function() {
        if (listAxesYObj.val[0] > 25) {
            object[listCoordObj.val[0]].previousHeight(listAxesXObj.val[0], listAxesYObj.val[0] - 5);
        }
        if (shouted.val == true) {
            const fireXCoord = {val: squareXCoordinate.val}, fireYCoord = {val: squareYCoordinate.val - 40};
            shooter = window.setInterval(function() {
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                ctx.strokeStyle = "rgb(0, 0, 0)";
                ctx.strokeRect(fireXCoord.val, fireYCoord.val, 10, 20);
                fireYCoord.val = fireYCoord.val - 5;
                ctx.fillStyle = "rgb(255, 255, 0)";
                ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                console.log(fireXCoord.val + ' ' + fireYCoord.val);
                if (fireXCoord.val >= listAxesXObj.val[2] && fireXCoord.val <= listAxesXObj.val[2] + 20) {
                    console.log("true");
                }
                if (isDestroyed.val == true) {
                    airplane.shoot(isDestroyed, squareXCoordinate, squareYCoordinate, shouted);
                    window.clearInterval(shooter);
                }
            }, 40);
            shouted.val = false;
        }
        object[listCoordObj.val[0]].fall(listAxesXObj.val[0], listAxesYObj.val[0]);
        objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj);
        collision(idInterval, isDestroyed, airplane, object, score, listCoordObj, listAxesXObj, listAxesYObj);
        objectsHeights(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter, score);
        listAxesYObj.val[0] = listAxesYObj.val[0] + 5;
    }, 25);
}

// Verifies the current height of each object that appear on the screen and fall, change the coordinates of each object and creates 
// new object on top of the screen and the value of score increases if the palne avoids an object.  
function objectsHeights(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter, score) {
    if (listAxesYObj.val[2] == 700) {
        ++score.val;
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 3);
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    } else if (listAxesYObj.val[1] == 575) {
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 2);
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    } else if (listAxesYObj.val[0] == 300) {
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, 1);
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter);
    }
}

function collision(idInterval, isDestroyed, airplane, Object, score, listCoordObj, listAxesXObj, listAxesYObj) {
    if ((squareXCoordinate.val - listAxesXObj.val[2] >= 0 && squareXCoordinate.val - listAxesXObj.val[2] < 20 || 
            listAxesXObj.val[2] - squareXCoordinate.val >= 0 && listAxesXObj.val[2] - squareXCoordinate.val < 70) 
            && (squareYCoordinate.val - listAxesYObj.val[2] >= 0 && squareYCoordinate.val - listAxesYObj.val[2] < 20 || 
            listAxesYObj.val[2] - squareYCoordinate.val >= 0 && listAxesYObj.val[2] - squareYCoordinate.val < 70)) {
        isDestroyed.val = true;
        gameOver(isDestroyed, airplane, Object, score, listCoordObj, listAxesXObj, listAxesYObj);
        window.clearInterval(idInterval);
    }
}

function changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, nrIterations) {
    for (let i = nrIterations; i >= 1; --i) {
        listAxesXObj.val[i] = listAxesXObj.val[i - 1];
        listAxesYObj.val[i] = listAxesYObj.val[i - 1];
        listCoordObj.val[i] = listCoordObj.val[i - 1];
    }
}

function createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, counter) {
    listCoordObj.val[0] = Math.floor(Math.random() * counter);
    listAxesXObj.val[0] = listCoordObj.val[0] * 100 + initialWidth;
    listAxesYObj.val[0] = 25;
}

function objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj) {
    for (let i = 1; i < 4; ++i) {
        if (listAxesXObj.val[i] > 0) {
            if (i < 3) {
                listAxesYObj.val[i] = listAxesYObj.val[i] + 5;
                object[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                object[listCoordObj.val[i]].fall(listAxesXObj.val[i], listAxesYObj.val[i]);
            } else {
                object[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                object[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
            }
        }
    }
}

function gameOver(isDestroyed, airplane, object, score, listCoordObj, listAxesXObj, listAxesYObj) {
    airplane.movePlane(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    //shooting(airplane, isDestroyed, shouted);
    //airplane.shoot(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate, shouted);
    for (let i = 0; i < 3; ++i) {
        object[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
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
        restart();
    });
    container.appendChild(button);  
    document.body.appendChild(container);  
}

function restart() {
    window.location.reload();
}