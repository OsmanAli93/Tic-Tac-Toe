
const block = document.querySelectorAll('.board-block');
const board = document.querySelector('.board');
let turns;
let win;
let X_CLASS = 'x';
let C_CLASS = 'circle';      
let player_1 = 0;
let tie = 0;
let player_2 = 0;                          
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function startGame () {

    block.forEach(item => {
        item.classList.remove(X_CLASS);
        item.classList.remove(C_CLASS);
        item.addEventListener('click', handleEventClick, {once: true});
    })

    document.getElementById('restart').textContent = 'restart';
}

function handleEventClick (e) {
    // Get event block
    const cell = e.target;
    // Switch clasess based on true or false
    const currentClass = turns ? C_CLASS : X_CLASS;
    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {

        endGame(false);

    } else if (isDraw()) {

        endGame(true);

    } else {

        swapTurns();

    }   

}

function swapTurns () {

    // Set turns on each clicked to true or false
    return turns = !turns;
}


function isDraw () {
    // Check if all board cell are occupied
    return [...block].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(C_CLASS);
    })
}


function endGame (draw) {
    // Check if draw
    if (draw) {

        tie++;
        document.getElementById('modal').style.display = 'flex';
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('.modal-content').textContent = "It's A Tie!";
        
    } else {
        
        let audio = document.querySelector('audio');
        // Check who win the game
        if (turns) {

            // Update computer score if win
            player_2++;
            audio.src ='music/Sad Trombone.mp3';
            audio.play();
            // Remove eventListener once game is concluded
            block.forEach(item => item.removeEventListener('click', handleEventClick));
            document.getElementById('modal').style.display = 'flex';
            document.querySelector('body').style.overflow = 'hidden';
            // Display the winner
            document.querySelector('.modal-content').textContent = 'Computer Win!';

        } else {

            // Update player score if win
            player_1++;
            audio.src = 'music/win.mp3';
            audio.play();
            // Remove eventListener once game is concluded
            block.forEach(item => item.removeEventListener('click', handleEventClick));
            document.getElementById('modal').style.display = 'flex';
            document.querySelector('body').style.overflow = 'hidden';
            // Display the winner
            document.querySelector('.modal-content').textContent = 'You Win!';
        }
        
    }

    // Change button text when game is won
    document.getElementById('restart').textContent = 'Play Again ?';
    // Display each player winning scores
    document.getElementById('you').textContent = player_1;
    document.getElementById('draw').textContent = tie;
    document.getElementById('computer').textContent = player_2;

}


function checkWin (currentClass) {

    //Takes an array from winning condition and check board block based winning array index,
    //if each index of board block and winning condition matched and has same classes, return true 
    return winningConditions.some(combination => {
        return combination.every(index => {
            return block[index].classList.contains(currentClass)
        })
    })
    
}


block.forEach(function(item){
    item.addEventListener('click', handleEventClick, {once: true});
})
document.getElementById('restart').addEventListener('click', startGame);
document.getElementById('modal').addEventListener('click', function(){

    this.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';

})