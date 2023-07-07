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
        } /*else {
            prevPlaneTrajectory();
        }*/
    }

    shoot(isDestroyed, squareXCoordinate, squareYCoordinate, shouted) {
        if (isDestroyed.val == false) {
            shouted.val = true;
            ctx.fillStyle = "rgb(255, 255, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val - 40, 10, 20);
            console.log("Shooting......");
        } /*else {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(squareXCoordinate.val, squareYCoordinate.val - 40, 10, 20);
            console.log("False");
        }*/
    }

    /*fireDisappears(isDestroyed, squareXCoordinate, squareYCoordinate, shouted) {
        
    }*/
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

class FireBalls {
    constructor(fireXCoord, fireYCoord) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(fireXCoord, fireYCoord, 10, 20);
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.strokeRect(fireXCoord, fireYCoord, 10, 20);
    }

    shooter(fireXCoord, fireYCoord) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
        fireYCoord.val = fireYCoord.val - 5;
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
    }

    disappear(fireXCoord, fireYCoord) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
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
    //console.log(squareYCoordinate.val);
    gameController(airplane, isDestroyed);
    const shouted = {val: false};
    shooting(airplane, isDestroyed, shouted);
    //if (shouted.val == true) {
    //    console.log("Adevarat");
    //}
    let initialWidth = 25, initialHeight = 25;
    let counter = 0;
    const object = {val: []};
    for (let i = 0; i * 100 + initialWidth < canvasWidth; ++i) {
        object.val[i] = new Object(i * 100 + initialWidth, initialHeight);
        ++counter;
    }
    let randomWidth = Math.floor(Math.random() * counter);
    const score = {val: 0};
    const listCoordObj = {val: [randomWidth, 0, 0, 0]};
    const listAxesXObj = {val: [randomWidth * 100 + initialWidth, 0, 0, 0]}; 
    const listAxesYObj = {val: [25, 25, 25, 25]};
    const collided = {val: [false, false, false, false]};
    //let nrBalls = 0;
    const fireBalls = {val: []};
    for (let i = 0; i < canvasWidth; ++i) {
        fireBalls.val[i] = new FireBalls(i, squareYCoordinate.val - 40);
    }
    idInterval = window.setInterval(function() {
        //collided.val[0] = false, collided.val[1] = false, collided.val[2] = false;
        if (listAxesYObj.val[0] > 25) {
            object.val[listCoordObj.val[0]].previousHeight(listAxesXObj.val[0], listAxesYObj.val[0] - 5);
        }
        if (shouted.val == true) {
            console.log("Am tras!");
            const fireXCoord = {val: squareXCoordinate.val}, fireYCoord = {val: squareYCoordinate.val - 40};  
            //console.log(fireXCoord.val + " " + fireYCoord.val);    
            //console.log(nrBalls); 
            /*for (let i = 0; i < nrBalls; ++i) {
                console.log(fireBalls[i]);
            } */ 
            const shooter = setInterval(function() {
            //     console.log('Rand nou!');
                 if (isDestroyed.val == false) {
                //for (let i = squareYCoordinate.val - 40; i >= 0; --i) {    
                    //fireBalls[++nrBalls] = fireXCoord.val + " " + fireYCoord.val;
                    // console.log(fireXCoord.val + " " + fireYCoord.val);
                    // ctx.fillStyle = "rgb(0, 0, 0)";
                    // ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    // ctx.strokeStyle = "rgb(0, 0, 0)";
                    // ctx.strokeRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //if (collided.val[0] == false && collided.val[1] == false && collided.val[2] == false) {
                        ctx.fillStyle = "rgb(0, 0, 0)";
                        ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                        ctx.strokeStyle = "rgb(0, 0, 0)";
                        ctx.strokeRect(fireXCoord.val, fireYCoord.val, 10, 20);
                        fireYCoord.val = fireYCoord.val - 5;
                        ctx.fillStyle = "rgb(255, 255, 0)";
                        ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //}
                    // } else if (collided.val[2] == true) {
                    //     ctx.fillStyle = "rgb(0, 0, 0)";
                    //     ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //     collided.val[2] = false;
                    // } else if (collided.val[1] == true) {
                    //     ctx.fillStyle = "rgb(0, 0, 0)";
                    //     ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //     collided.val[1] = false;
                    // } else if (collided.val[0] == true) {
                    //     ctx.fillStyle = "rgb(0, 0, 0)";
                    //     ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //     collided.val[0] = false;
                    // }
                    //for (let i = 3; i > 0; --i) {
                    //    fireBalls.val[i] = fireBalls.val[i - 1];
                    //    console.log(fireBalls.val[i]);
                    //}
                    //fireBalls.val[0] = squareYCoordinate.val;
                    // if (collided.val[0] == true || collided.val[1] == true || collided.val[2] == true) {
                    //    ctx.fillStyle = "rgb(0, 0, 0)";
                    //     ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                    //     //clearInterval(shooter);
                    // }
                    //for (let i = 0; i < 400; ++i) {
                        console.log("Start");
                        // if (collided.val[0] == true && collided.val[1] == true && collided.val[2] == true) {
                        //     fireBalls.val[fireXCoord.val].shooter(fireXCoord, fireYCoord);
                        // }
                        console.log("Coordonata X: " + fireXCoord.val + " Coordonata Y: " + fireYCoord.val)
                      
                    //}
                    //    ctx.fillStyle = "rgb(0, 0, 0)";
                    //    ctx.fillRect(fireBalls[fireXCoord.val], fireYCoord.val, 10, 20);
                    //} //else if (collided.val[0] == false && collided.val[1] == false && collided.val[2] == false) {
                    
                       
                    //}
                    if (fireXCoord.val >= listAxesXObj.val[0] && fireXCoord.val <= listAxesXObj.val[0] + 20
                        && fireYCoord.val >= listAxesYObj.val[0] && fireYCoord.val <= listAxesYObj.val[0] + 20
                        && collided.val[0] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //ctx.fillStyle = "rgb(0, 0, 0)";
                            //ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //console.log(listAxesXObj.val[0] + " " + listAxesYObj.val[0]);
                            //object.val[listCoordObj.val[0]].previousHeight(listAxesXObj.val[0], listAxesYObj.val[0]);

                            collided.val[0] = true;
                            // if (collided.val[0] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 0");
                    } else if (fireXCoord.val >= listAxesXObj.val[1] && fireXCoord.val <= listAxesXObj.val[1] + 20
                        && fireYCoord.val >= listAxesYObj.val[1] && fireYCoord.val <= listAxesYObj.val[1] + 20
                        && collided.val[1] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //console.log(listAxesXObj.val[1] + " " + listAxesYObj.val[1]);
                            //object[listCoordObj.val[1]].previousHeight(listAxesXObj.val[1], listAxesYObj.val[1] - 5);
                            //object.val[listCoordObj.val[1]].previousHeight(listAxesXObj.val[1], listAxesYObj.val[1]);
                            collided.val[1] = true;
                            // if (collided.val[1] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 1");
                    } else if (fireXCoord.val >= listAxesXObj.val[2] && fireXCoord.val <= listAxesXObj.val[2] + 20
                        && fireYCoord.val >= listAxesYObj.val[2] && fireYCoord.val <= listAxesYObj.val[2] + 20
                        && collided.val[2] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //console.log(listAxesXObj.val[2] + " " + listAxesYObj.val[2]);
                            //object.val[listCoordObj.val[2]].previousHeight(listAxesXObj.val[2], listAxesYObj.val[2]);
                            collided.val[2] = true;
                            // if (collided.val[2] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 2");
                    } else if (fireXCoord.val >= listAxesXObj.val[0] - 20 && fireXCoord.val <= listAxesXObj.val[0]
                        && fireYCoord.val >= listAxesYObj.val[0] && fireYCoord.val <= listAxesYObj.val[0] + 20
                        && collided.val[0] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //console.log(listAxesXObj.val[0] + " " + listAxesYObj.val[0]);
                            //object.val[listCoordObj.val[0]].previousHeight(listAxesXObj.val[0], listAxesYObj.val[0]);
                            collided.val[0] = true;
                            // if (collided.val[0] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 3");
                    } else if (fireXCoord.val >= listAxesXObj.val[1] - 20 && fireXCoord.val <= listAxesXObj.val[1]
                        && fireYCoord.val >= listAxesYObj.val[1] && fireYCoord.val <= listAxesYObj.val[1] + 20
                        && collided.val[1] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //console.log(listAxesXObj.val[1] + " " + listAxesYObj.val[1]);
                            //object.val[listCoordObj.val[1]].previousHeight(listAxesXObj.val[1], listAxesYObj.val[1]);
                            collided.val[1] = true;
                            // if (collided.val[1] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 4");
                    } else if (fireXCoord.val >= listAxesXObj.val[2] - 20 && fireXCoord.val <= listAxesXObj.val[2]
                        && fireYCoord.val >= listAxesYObj.val[2] && fireYCoord.val <= listAxesYObj.val[2] + 20
                        && collided.val[2] == false) {
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
                            //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            //console.log(listAxesXObj.val[2] + " " + listAxesYObj.val[2]);
                            //object.val[listCoordObj.val[2]].previousHeight(listAxesXObj.val[2], listAxesYObj.val[2]);
                            collided.val[2] = true;
                            // if (collided.val[2] == true) {
                            //     fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                            // }
                            //objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
                        //console.log("Se incadreaza 5");
                    }
                    //if (collided.val[2] == true) {
                      //  console.log("COLIZIUNEEEEEE.....");
                        //fireBalls.val[fireXCoord.val].disappear(fireXCoord, fireYCoord);
                        //collided.val[0] = false, collided.val[1] = false, collided.val[2] = false;
                    //}
                    console.log("Stop");
                //}
                    //  else {
                    //     fireBalls.val[fireXCoord.val].shooter(fireXCoord, fireYCoord);
                    // }
                } else {
                 clearInterval(shooter);
                 }
            }, 40);
            // if (collided.val[0] == true || collided.val[1] == true || collided.val[2] == true) {
            //     ctx.fillStyle = "rgb(0, 0, 0)";
            //     ctx.fillRect(fireXCoord.val, fireYCoord.val, 10, 20);
            //     ctx.strokeStyle = "rgb(0, 0, 0)";
            //     ctx.strokeRect(fireXCoord.val, fireYCoord.val, 10, 20);
            shouted.val = false;
        }
        object.val[listCoordObj.val[0]].fall(listAxesXObj.val[0], listAxesYObj.val[0]);
        objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided);
        objectsHeights(listCoordObj, listAxesXObj, listAxesYObj, collided, initialWidth, counter, score, object);
        collision(idInterval, isDestroyed, airplane, score, listAxesXObj, listAxesYObj, collided);
        listAxesYObj.val[0] = listAxesYObj.val[0] + 5;
    }, 25);
}

// Verifies the current height of each object that appear on the screen and fall, change the coordinates of each object and creates 
// new object on top of the screen and the value of score increases if the palne avoids an object.  
function objectsHeights(listCoordObj, listAxesXObj, listAxesYObj, collided, initialWidth, counter, score, object) {
    if (listAxesYObj.val[2] == 700) {
        ++score.val;
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, collided, 3);
        console.log("Partea 3 " + collided.val[0] + "0 " + collided.val[1] + "1 " + collided.val[2] + "2 ");
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, collided, counter);
    }  else if (listAxesYObj.val[1] == 575) {
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, collided, 2);
        console.log("Partea 2 " + collided.val[0] + "0 " + collided.val[1] + "1 " + collided.val[2] + "2 ");
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, collided, counter);
    }  else if (listAxesYObj.val[0] == 300) {
        for (let i = 3; i >= 2; --i) {
            listAxesXObj.val[i] = listAxesXObj.val[i - 1];
            listAxesYObj.val[i] = listAxesYObj.val[i - 1];
            listCoordObj.val[i] = listCoordObj.val[i - 1];
            collided.val[i] = collided.val[i - 1];
        }
        changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, collided, 1);
        console.log("Partea 1 " + collided.val[0] + "0 " + collided.val[1] + "1 " + collided.val[2] + "2 ");
        createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, collided, counter);
    }
}

function collision(idInterval, isDestroyed, airplane, score, listAxesXObj, listAxesYObj, collided) {
    if ((squareXCoordinate.val - listAxesXObj.val[2] >= 0 && squareXCoordinate.val - listAxesXObj.val[2] < 20 || 
            listAxesXObj.val[2] - squareXCoordinate.val >= 0 && listAxesXObj.val[2] - squareXCoordinate.val < 70) 
            && (squareYCoordinate.val - listAxesYObj.val[2] >= 0 && squareYCoordinate.val - listAxesYObj.val[2] < 20 || 
            listAxesYObj.val[2] - squareYCoordinate.val >= 0 && listAxesYObj.val[2] - squareYCoordinate.val < 70)) {
        isDestroyed.val = true;
        gameOver(isDestroyed, airplane, score);
        window.clearInterval(idInterval);
    }
}

function changeObjectCoordinates(listCoordObj, listAxesXObj, listAxesYObj, collided, nrIterations) {
    for (let i = nrIterations; i >= 1; --i) {
        listAxesXObj.val[i] = listAxesXObj.val[i - 1];
        listAxesYObj.val[i] = listAxesYObj.val[i - 1];
        listCoordObj.val[i] = listCoordObj.val[i - 1];
        collided.val[i] = collided.val[i - 1];
    }
}

function createNewRandomObject(listCoordObj, listAxesXObj, listAxesYObj, initialWidth, collided, counter) {
    listCoordObj.val[0] = Math.floor(Math.random() * counter);
    listAxesXObj.val[0] = listCoordObj.val[0] * 100 + initialWidth;
    listAxesYObj.val[0] = 25;
    collided.val[0] = false;
}

function objectGravity(object, listCoordObj, listAxesXObj, listAxesYObj, collided) {
    //console.log("False " + collided.val[0] + "0 " + collided.val[1] + "1 " + collided.val[2] + "2 ");
    for (let i = 1; i < 4; ++i) {
        if (listAxesXObj.val[i] > 0) {
            if (i < 3) {
                if (collided.val[i] == false) {
                    listAxesYObj.val[i] = listAxesYObj.val[i] + 5;
                    object.val[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                    object.val[listCoordObj.val[i]].fall(listAxesXObj.val[i], listAxesYObj.val[i]);
                }
                else {
                    object.val[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                    object.val[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
                }
            } else {
                object.val[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i] - 5);
                object.val[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
            }
        }
    }
}

function gameOver(isDestroyed, airplane, score) {
    airplane.movePlane(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate);
    //shooting(airplane, isDestroyed, shouted);
    //airplane.shoot(isDestroyed, squareWidth, squareHeight, squareXCoordinate, squareYCoordinate, shouted);
    /*for (let i = 0; i < 3; ++i) {
        object[listCoordObj.val[i]].previousHeight(listAxesXObj.val[i], listAxesYObj.val[i]);
    }*/
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
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