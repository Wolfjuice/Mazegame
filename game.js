import { levelArray } from "./getLevel.js"


let x = 13;
let y = 13;
let board = [];

let player = {
    name: 'Philip Kim',
    x: 0,
    y: 0,
    moves: 0,
    time: 0,
    won: false, // If true, stop the game, make something pop up either going to next level or restarting the maze
    level: 1 // starting level
}

let minMove = 3; 

let speed = 10; // speed of animation

let doneMove = true; // important for one move at a time

let firstMove = true; //variable for stopwatch
let stopWatch; // same

let timeScoreBoard = [] //contains player object {player: name, time: 000}
let moveScoreBoard = [] //contains player object {player: name, moves: 000}
//There is a dummy object in each array
//can add in rank element or something, but you must add it to all the dummy objects

$(function () {
    loadGame();
})
let myTime = null;
export async function loadGame() {

    const $root = $('#root')
    //div id = board width 650px, no margin
    $root.append(levelBuild(player.level))
    timeScoreBoard = await getTimeBoard(player.level);
    moveScoreBoard = await getMoveBoard(player.level);
    console.log(timeScoreBoard);
    console.log(moveScoreBoard);
    
    $(document).keydown(async function (e) {
        switch (e.keyCode) { // move to seperate function and make it return something
            case 39:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;


                        myTime = window.setInterval(function(){

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                          }, 100);
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        
                        
                        await move('right');
                    }
                }

                break;
            case 38:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function(){

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                          }, 100);
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        
                        await move('up');
                    }
                }
                break;
            case 37:
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function(){

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                          }, 100);
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        
                        await move('left');
                    }
                }
                break;
            case 40:
                e.preventDefault;
                if (!player.won) {
                    if (firstMove) {
                        stopWatch = Date.now();
                        firstMove = false;

                        myTime = window.setInterval(function(){

                            let gjh = (Date.now() - stopWatch) / 1000
                            const $timeboard = $('#timeboard');
                            $timeboard.empty();
                            $timeboard.append(`<h1>Time: ${gjh}</h1>`);
                          }, 100);
                    }
                    if (doneMove) {
                        doneMove = false;
                        player.moves += 1
                        const $moveboard = $('#moveboard');
                        $moveboard.empty();
                        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
                        
                        await move('down');
                    }
                }
                break;

            case 78: // Press N to go to next level
                nextLevel()

                break;
            // turn these into functions
            case 82: // Press R to reset level
                resetBoard()
                break
        }
    })
    

    $root.append(`<div id = 'buttonPanel'>
        <button id = 'previous'> Previous</button>
        <button id = 'reset'>Reset</button>
        <button id = 'next'>Next</button>
        <button id = 'time'>Save Time</button>
        <button id = 'move'>Save Move</button>
    </div>`)

    $root.append(`<div id = 'moveboard'>
        <h1>Moves: ${player.moves}</h1>
    </div>`)

    $root.append(`<div id = 'timeboard'>
        <h1>Time: ${player.time}</h1>
    </div>`)
    
    

    //   myVar = setInterval(alertFunc, 3000);

    $root.on('click', "#previous", previousBoard);//self explantory
    $root.on('click', "#reset", resetBoard);
    $root.on('click', "#next", nextLevel);
    $root.on('click', "#time", timeUpdateBoard);//add in new player object to the array, it also returns the updated array
    $root.on('click', "#move", moveUpdateBoard);//add in new player object to the array, it also returns the updated array
    // create keyboard functionality all of them
    

}

export const levelBuild = function (number) {
    number -= 1;

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'board')

    let levelTable = document.createElement('table');
    tableDiv.append(levelTable);

    //let level = getLevel();
    let count = 0;

    board = JSON.parse(JSON.stringify(levelArray[number]))
    for (let i = 0; i < y; i++) {

        let row = document.createElement('tr');
        row.setAttribute('class', i)
        for (let j = 0; j < x; j++) {
            let rowFiller = document.createElement('td');
            rowFiller.setAttribute('class', j)

            if (board[i][j] == 0) {
                rowFiller.setAttribute('style', 'background-color: gray');
            } else if (board[i][j] == 1) {
                rowFiller.setAttribute('style', 'background-color: white');
            } else if (board[i][j] == 2) {
                //Player
                rowFiller.setAttribute('class', j + ' filled');
            }

            if (board[i][j] == 2) {
                player.y = i;
                player.x = j;
                rowFiller.setAttribute('id', 'player')
            }

            row.append(rowFiller);

            //count++;
        }
        tableDiv.append(row);
        //count += 2;
    }
    return tableDiv;
}

export async function move(dirction) {
    let findY;
    let findX;

    if (dirction == 'right') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x + 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x += 1;
            }
            $(findY).find(findX).attr('id', 'player')

        }, speed)
    } else if (dirction == 'up') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y - 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'left') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y][player.x - 1] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker()
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.x -= 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    } else if (dirction == 'down') {
        let test = setInterval(function animate() {
            // color what ever space that color
            // Depending on how it is animated and logic; move one space at a time
            $(findY).find(findX).attr('id', '')

            if (board[player.y + 1][player.x] == 0) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                //$(findY).find(findX).attr('class', player.x + ' filled')

                $(findY).find(findX).attr('id', 'player')
                clearInterval(test)
                if (player.moves >= minMove) {
                    player.won = boardChecker();
                    if (player.won) {
                        console.log('Won')
                        
                        stopWatch = Date.now() - stopWatch;
                        clearInterval(myTime);
                        player.time = stopWatch / 1000;
                        const $timeboard = $('#timeboard');
                        $timeboard.empty();
                        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
                        console.log(player.time);
                    }
                }

                return doneMove = true;
            } else if (board[player.y][player.x] >= 1) {
                board[player.y][player.x] = 2;
                findY = '.' + player.y;
                findX = '.' + player.x;
                $(findY).find(findX).attr('class', player.x + ' filled')
                player.y += 1;
            }
            $(findY).find(findX).attr('id', 'player')
        }, speed)
    }
}

export const boardChecker = function () {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (board[i][j] == 1) {
                return player.won = false;

            }
        }
    }
    return player.won = true;
}

export async function getTimeBoard(id) {
    let getURL = "http://localhost:3000/time/" + id;
    const result = await axios({
        method: 'get',
        url: getURL,
    })
    return result.data.body;
}

export async function getMoveBoard(id) {
    let getURL = "http://localhost:3000/move/" + id;
    const result = await axios({
        method: 'get',
        url: getURL,
    })
    return result.data.body;
}

export async function updateBoard(id, type, array) {
    let updateURL = "http://localhost:3000/" + type + "/" + id;
    const result = await axios({
        method: 'put',
        url: updateURL,
        data: {
            body: array
        }
    })
}

export async function previousBoard() {
    if (player.level - 1 != 0) {
        console.log('previousLevel')
        player.level -= 1; // Go to Next Level
        player.won = false;
        player.time = 0;
        player.moves = 0;
        stopWatch = 0;
        firstMove = true;
        console.log(player.level)
        clearInterval(myTime);
        const $timeboard = $('#timeboard');
        $timeboard.empty();
        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
        const $moveboard = $('#moveboard');
        $moveboard.empty();
        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
        timeScoreBoard = await getTimeBoard(player.level);
        moveScoreBoard = await getMoveBoard(player.level);
        $('#board').replaceWith(levelBuild(player.level))
    }
}

export const resetBoard = function () {
    console.log('reset Level')
    //player.level += 1; // Go to Next Level
    player.won = false;
    player.time = 0;
    player.moves = 0;
    stopWatch = 0;
    firstMove = true;
    clearInterval(myTime);
    const $timeboard = $('#timeboard');
    $timeboard.empty();
    $timeboard.append(`<h1>Time: ${player.time}</h1>`);
    const $moveboard = $('#moveboard');
    $moveboard.empty();
    $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
    console.log(player.level)
    $('#board').replaceWith(levelBuild(player.level))
}

export async function nextLevel() {
    if (player.level + 1 != 21) {
        console.log('nextLevel')
        player.level += 1; // Go to Next Level
        player.won = false;
        player.time = 0;
        player.moves = 0;
        stopWatch = 0;
        firstMove = true;
        clearInterval(myTime);
        const $timeboard = $('#timeboard');
        $timeboard.empty();
        $timeboard.append(`<h1>Time: ${player.time}</h1>`);
        const $moveboard = $('#moveboard');
        $moveboard.empty();
        $moveboard.append(`<h1>Moves: ${player.moves}</h1>`);
        console.log(player.level)
        timeScoreBoard = await getTimeBoard(player.level);
        moveScoreBoard = await getMoveBoard(player.level);
        console.log(timeScoreBoard)
        console.log(moveScoreBoard)
        $('#board').replaceWith(levelBuild(player.level))
    }
}

export async function timeUpdateBoard() {
    let test = {
        "player": player.name,
        "time": player.time,
    }
    timeScoreBoard.push(test)
    await updateBoard(player.level, "time", timeScoreBoard)

    timeScoreBoard = await getTimeBoard(player.level);
    console.log(timeScoreBoard);
}

export async function moveUpdateBoard() {
    moveScoreBoard.push({
        "player": player.name,
        "moves": player.moves,
    })

    let blank = await updateBoard(player.level, 'move', moveScoreBoard)
    moveScoreBoard = await getMoveBoard(player.level);
    console.log(moveScoreBoard);
}