'use strict';
const box = document.querySelectorAll('.box');
const againBtn = document.querySelector('.again');
const title_txt = document.querySelector('.title-txt');

let user1Turn = true;
let continueGame = true;
let gameMap = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];


const makeMove = function (pos) {
    let i, j;
    if (pos < 0 || pos > 8)
        return;
    if (pos < 3)
        i = 0;
    else if (pos < 6)
        i = 1;
    else
        i = 2;
    j = (pos) - (3 * i);
    gameMap[i][j] = user1Turn ? 1 : 0;
}

const continuePlaying = function () {

    let checkRow, checkCol;
    for (let i = 0; i < gameMap.length; i++) {
        checkRow = new Set(gameMap[i]);
        if (checkRow.size == 1 && !checkRow.has(-1))
            return false;
    }
    for (let i = 0; i < gameMap[0].length; i++) {
        checkCol = new Set();
        for (let j = 0; j < gameMap.length; j++) {
            checkCol.add(gameMap[j][i]);
        }
        if (!checkCol.has(-1) && checkCol.size == 1)
            return false;
    }
    let checkDiagonal1 = new Set();
    for (let i = 0; i < gameMap.length; i++) {
        checkDiagonal1.add(gameMap[i][i]);
    }
    if (!checkDiagonal1.has(-1) && checkDiagonal1.size === 1) {
        return false;
    }

    // Check secondary diagonal (top-right to bottom-left)
    let checkDiagonal2 = new Set();
    for (let i = 0; i < gameMap.length; i++) {
        checkDiagonal2.add(gameMap[i][gameMap.length - 1 - i]);
    }
    if (!checkDiagonal2.has(-1) && checkDiagonal2.size === 1)
        return false;
    return true;

}

for (let i = 0; i < box.length; i++) {

    box[i].addEventListener('click', function () {

        if (box[i].innerHTML === '' && continueGame) {
            if (user1Turn == true) {
                box[i].innerHTML = '<i class="fa-solid fa-x"></i>';

            }
            else {
                box[i].innerHTML = `<i class="fa-regular fa-circle"></i>`;
            }
            makeMove(i);
            continueGame = continuePlaying();
            if (!continueGame) {
                console.log(`Game Over! User ${user1Turn ? 1 : 2} wins!`);

                title_txt.textContent = `Player ${user1Turn === true ? 1 : 2} WINS!!!`;
            }
            else {
                user1Turn = !user1Turn;
                title_txt.textContent = `Player ${user1Turn === true ? 1 : 2}'s turn`;
            }
        }
    })
}
againBtn.addEventListener('click', function () {
    user1Turn = true;
    title_txt.textContent = `Tic Tac Toe`;
    for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';
    }
    continueGame = true;
    gameMap = [[-1, -1, -1],
    [-1, -1, -1], [-1, -1, -1]];
});

