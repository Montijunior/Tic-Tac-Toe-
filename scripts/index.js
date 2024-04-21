//Players factory function
function playerFactory(name, marker){
    return {
        name,
        marker
    };
}

//Game board Module
const GameBoard = (function(){
    let board = ["", "", "", "", "", "", "", "", ""];

    //render the board to ui
    const render = () =>{
        const playingBoard = document.querySelector(".container");
        board.forEach((box, index) =>{
            playingBoard.innerHTML += `<div class="box" id="box-${index}">${box}</div>`;
        });
        //add click events to all boxes
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) =>{
            // box.addEventListener("click", displayController.game);
        });
    }

    //create an instance of the board
    const getBoard = () => board;

    return {
        getBoard,
        render
    };
})();

window.onload = GameBoard.render();


