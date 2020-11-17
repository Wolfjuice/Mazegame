//import * as fs from 'fs'

let levelArray = [];

let x = 13;
let y = 13;

let count = 0
export const getLevel = function () {
    for (let s = 0; s < 20; s++) {
        let i = s+1;
        let level = fs.readFileSync("./levels/Level "+ i +".map").toString()//.split("/n")
        //console.log(i)
        count = 0;
        let board = [];
        for (let i = 0; i < y; i++) {
            board[i] = [];
            for (let j = 0; j < x; j++) {
                board[i][j] = level.charAt(count);
                count++;
            }
            count += 2;
        }
        levelArray[s] = board;
    }

    console.log(levelArray)
}

getLevel()