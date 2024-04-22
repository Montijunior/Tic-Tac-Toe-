//Game board module
const GameBoard = (() =>{
    //board array
    const board = ["", "", "", "", "", "", "", "", ""];

    //render the board to the ui
    const render = () =>{
        let boardHTML = "";
        board.forEach((box, index) =>{
            boardHTML += `<div class="box" id="box-${index}">${box}</div>`;

        });

        //query the board container in the ui
        const playingBoard = document.querySelector(".container");
        playingBoard.innerHTML = boardHTML;

        //add click event to all boxes in the board
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) =>{
            box.addEventListener("click", displayController.handleClick);
        });
    };

    //update the board once click
    function update(index, value){
        board[index] = value;
        render();
    }

    //create an instance of the board array
    const getBoard = () => board;

    return {
        render,
        getBoard,
        update
    };
})();

//create players
function createPlayer(marker){
    return {marker, };
}

//display controller module
const displayController = (function(){
    let players = [];
    let currentPlayerIndex;
    let isGameOver;

    //start game
    const startGame = () =>{
        players = [
            createPlayer("X"),
            createPlayer("O")
        ];
        currentPlayerIndex = 0;
        isGameOver = false;
        GameBoard.render();

        //click event to all boxes
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) =>{
            box.addEventListener("click", handleClick);
        });
    };

    //handle click function
    function handleClick(event){
        const messageDisplay = document.querySelector(".message p");
        let index = parseInt(event.target.id.split("-")[1]);
        console.log(`You click box ${index}`);

        if (GameBoard.getBoard()[index] !== "") return;
        //else
        GameBoard.update(index, players[currentPlayerIndex].marker);

        // //check for tie
        // if (checkForTie(GameBoard.update())){
        //     messageDisplay.textContent `It's a tie!!`;
        // }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    //restart game
    function restartGame(){
        for (let a = 0; a < 9; a++){
            GameBoard.update(a, "");
        }
        GameBoard.render();
    }

    return {
        startGame,
        handleClick,
        restartGame
    };

})();



//ui
const dialog = document.querySelector("dialog");
const startButton = document.querySelector("dialog button");
// const messageDisplay = document.querySelector(".message p");
const restartButton = document.querySelector(".restart");

//when the page is loaded show modal
window.onload = dialog.showModal();

//close modal and start game when start button is click
function startPlaying(){
    dialog.close();
    displayController.startGame();
}
startButton.addEventListener("click", startPlaying);

//restart game
restartButton.addEventListener("click", displayController.restartGame);