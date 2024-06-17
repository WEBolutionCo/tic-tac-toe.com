const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-board');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restartButton');
const gameOverElement = document.querySelector('.game-over');
let currentPlayer = 'X';
let isGameOver = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', startGame);

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, player) {
    cell.textContent = player;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw) {
    isGameOver = true;
    if (draw) {
        messageElement.textContent = 'Draw!';
    } else {
        messageElement.textContent = `${currentPlayer} Wins!`;
    }
    gameOverElement.classList.add('show');
}

function startGame() {
    currentPlayer = 'X';
    isGameOver = false;
    messageElement.textContent = '';
    gameOverElement.classList.remove('show');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

startGame();

