const Player = (name, turn, mark) => {
    return {name, turn, mark};
};

const player1 = Player("Player1", true, "X")
const player2 = Player("Player2", false, "O")

const modal = document.querySelector("#modal")
const winner = document.querySelector(".winner")
const playBtn = document.querySelector("#playBtn")
const restartBtn = document.querySelector("#restart")
const playerOneDisplay = document.querySelector("#player-one")
const playerTwoDisplay = document.querySelector("#player-two")
const gameContainer = document.querySelector("#game-container")


let count = 0;
const Board = [];
const winCombinations = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [0,4,8]
];


const gameBoard = (() => { //array and grid display

const grid = document.querySelectorAll(".grid")

const assignGrid = () => {
    grid.forEach(el => { 
        el.addEventListener("click", (e) => {
            if (player1.turn === true && Board[e.target.id] != player1.mark 
                && Board[e.target.id] != player2.mark) {
            Board[e.target.id] = player1.mark;  //puts in array
            el.textContent = player1.mark;  //puts in display
            player1.turn = false;
            player2.turn = true;
            count++;
            gameController.activePlayer()}

            if (player2.turn === true && Board[e.target.id] != player1.mark 
                    && Board[e.target.id] != player2.mark) {
            Board[e.target.id] = player2.mark;  //puts in array
            el.textContent = player2.mark;  //puts in display
            player2.turn = false;
            player1.turn = true;
            count++;
            gameController.activePlayer()}

            });
    });
};

return {assignGrid}
})();


const gameController = (() => { //rules of the game and buttons

const checkRules = () => {
    for (let i = 0; i < winCombinations.length; i++) {
        if (Board[winCombinations[i][0]] === player1.mark &&
            Board[winCombinations[i][1]] === player1.mark &&
            Board[winCombinations[i][2]] === player1.mark) {
                winner.textContent = "PLAYER 1 WINS!"
               modal.showModal()
            } if 
            (Board[winCombinations[i][0]] === player2.mark &&
            Board[winCombinations[i][1]] === player2.mark &&
            Board[winCombinations[i][2]] === player2.mark) {
                winner.textContent = "PLAYER 2 WINS!"
                modal.showModal()
            } else if (count === 9 && winner.textContent === "") {
                winner.textContent = "IT'S A DRAW!"
                modal.showModal()
            }


    }
}


const activePlayer = () => {
    checkRules();
    if (player1.turn === true) {
        playerOneDisplay.classList.add("active")
        playerTwoDisplay.classList.remove("active")
    }
    
    if (player2.turn === true) {
        playerOneDisplay.classList.remove("active")
        playerTwoDisplay.classList.add("active")
    }
}


playBtn.addEventListener("click", () => {
    playerOneDisplay.classList.remove("hide")
    playerTwoDisplay.classList.remove("hide")
    playBtn.classList.add("hide")
    player1.turn = true;
    player2.turn = false;
    playerOneDisplay.classList.add("active")
    playerTwoDisplay.classList.remove("active")
    gameContainer.classList.remove("hide")
    count = 0;
})


restartBtn.addEventListener("click", () => {
    const grid = document.querySelectorAll(".grid")
    for (let i=0; i<grid.length; i++) {
        grid[i].textContent = ""
    }
    modal.close();
    Board.splice(0, Board.length);
    count = 0;
    player1.turn = true;
    player2.turn = false;
    playerOneDisplay.classList.add("active")
    playerTwoDisplay.classList.remove("active")
    winner.textContent = "";
})

return {checkRules, activePlayer}
})();
gameBoard.assignGrid()