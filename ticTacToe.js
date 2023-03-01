let isEnded = false;
let player = 'X';
let winner;
let history = [];
let track = -1;

function getCell(i) {
    return document.querySelector(`#cell-${i}`);
}
function getTitle() {
    return document.querySelector('#title');
}
function getRestartButton() {
    return document.querySelector('#restart');
}
function getBackButton() {
    return document.querySelector('#back');
}
function getForwardButton() {
    return document.querySelector('#forward');
}

function checkEquals(arr) {
    const cells = document.querySelectorAll(`#cell-${arr[0]},#cell-${arr[1]},#cell-${arr[2]}`);
    if ([...cells].every(cell => cell.innerText === player)) {
        winner = player;
        cells.forEach(cell => { cell.style.color = 'red' });
        return true;
    }
    return false;
}

const winningRelations = {
    1: [[1, 2, 3], [1, 4, 7], [1, 5, 9]],
    2: [[1, 2, 3], [2, 5, 8]],
    3: [[1, 2, 3], [3, 6, 9], [3, 5, 7]],
    4: [[4, 5, 6], [1, 4, 7]],
    5: [[4, 5, 6], [2, 5, 8], [1, 5, 9], [3, 5, 7]],
    6: [[4, 5, 6], [3, 6, 9]],
    7: [[7, 8, 9], [1, 4, 7], [3, 5, 7]],
    8: [[7, 8, 9], [2, 5, 8]],
    9: [[7, 8, 9], [3, 6, 9], [1, 5, 9]]
}

function checkIsEnded(i) {
    return winningRelations[i].some(arr => checkEquals(arr));
}

function endGame() {
    isEnded = true;
    if (winner != null) {
        getTitle().innerText = `${winner} WIN!`;
    } else {
        getTitle().innerText = `Draw`;
    }

    toggleBackForwardButton();
}

function editCell(i, value) {
    getCell(i).innerText = value;
}
function editCellColor(i, value) {
    getCell(i).style.color = value;
}

function resetCell(i) {
    editCell(i, '');
    editCellColor(i, null);
}

function restart() {
    isEnded = false;
    player = 'X';
    winner = null;
    for (let i = 1; i <= 9; i++) {
        resetCell(i);
    }
    getTitle().innerText = player;
    history.length = 0;
    toggleBackForwardButton();
    track = -1;
}

function switchPlayer() {
    player = player === 'X' ? 'O' : 'X';
    getTitle().innerText = player;
}

function removeAllHightlight() {
    for (let i = 1; i <= 9; i++) {
        editCellColor(i, null);
    }
}

function onClickCell(i) {
    if (isEnded || getCell(i).innerText != '') {
        return;
    }
    track += 1;
    editCell(i, player);
    history.push([player, i]);
    if (checkIsEnded(i) || history.length === 9) {
        endGame();
        return;
    }
    switchPlayer();
}

function onClickRestart() {
    restart();
}

function toggleBackForwardButton() {
    if (isEnded) {
        getBackButton().disabled = (track === -1);
        getForwardButton().disabled = (track === history.length - 1);
    } else {
        getBackButton().disabled = true;
        getForwardButton().disabled = true;
    }
}

function onClickForward() {
    track += 1;
    editCell(history[track][1], history[track][0]);

    if (track === history.length - 1) {
        checkIsEnded(history[track][1]);
    }
    toggleBackForwardButton();
}

function onClickBack() {
    editCell(history[track][1], '');
    track -= 1;

    if (track === history.length - 2) {
        removeAllHightlight();
    }
    toggleBackForwardButton();
}