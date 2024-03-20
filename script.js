const statusdisplay = document.querySelector('.gamestatus');
let gameActive = true;
let currentPlayer = "X";
let gameState=["", "", "", "", "", "", "", "", ""];
const winningmessage = ()=> `Player${currentPlayer} has Won!`;
const drawmessage = () =>`Game ended in a Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s Turn`;

statusdisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.gamerestart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent){
        const clickedCell = clickedCellEvent.target;
        const clickedCellindex = parseInt(
            clickedCell.getAttribute("data-cell-index")
        ); 

        if(gameState[clickedCellindex] !== "" || !gameActive){
            return;
        }


        handleCellPlayed(clickedCell, clickedCellindex);
        handleResultValidation();

}

function handleCellPlayed(clickedCell, clickedCellindex){
    gameState[clickedCellindex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}
    const winningconditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
       
        let roundwon= false;
        for(let i=0;i<=7;i++){
            const winningcondition = winningconditions[i];
            let a = gameState[winningcondition[0]];
            let b = gameState[winningcondition[1]];
            let c = gameState[winningcondition[2]];
            if (a=== '' || b === '' || c === ''){
                continue;
            }
            if (a === b && b === c){
                roundwon = true;
                break;
            }
        }
    if (roundwon){
    statusdisplay.innerHTML = winningmessage();
    gameActive = false;
    return;

    }
    
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusdisplay.innerHTML=drawmessage();
        gameActive = false;
        return;

    }
    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X"?"O":"X";
    statusdisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame(){
    gameActive= true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusdisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML ="");
}


