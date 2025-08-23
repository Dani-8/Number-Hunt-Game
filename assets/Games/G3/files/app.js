// GAME VARIABLES
let userScore = 0
let compScore = 0
let userAttempts = 0
let compAttempts = 0

let currentRound = 0
let roundOver = false

let targetNumber = 0

let minRange = 1
let maxRange = 5


// DISPLAY ELEMENTS
let userScoreDisplay = document.getElementById("user-score")
let compScoreDisplay = document.getElementById("comp-score")
let userAttemptDisplay = document.getElementById("user-attempt")
let compAttemptDisplay = document.getElementById("comp-attempt")

let roundDisplay = document.getElementById("round")
let rangeMsgDisplay = document.getElementById("range-msg")
let messageBox = document.getElementById("msg")

let userGuessInput = document.getElementById("user-input")
let guessBtn = document.getElementById("guess-btn")
let newGameBtn = document.getElementById("new-game-btn")






/**
 * STARTS A NEW GAME
 * RESETS SCORES, ROUNDS,& BEGINS THE NEW ROUND
*/ 
function startNewGame() {
    userScore = 0
    compScore = 0
    currentRound = 0

}


/**
 * STARTS A NEW ROUND OF THE GAME
 * SETS NEW RANGE, RESETS ATTEMPTS & GENERATES A NEW TARGET NUMBER
 */

function startNewGame(){
    currentRound++
    roundOver = false
    userAttempts = 3
    compAttempts = 3
    userGuessInput.value = ""         //clear Previous Guess
    userGuessInput.focus()           //Focus on Input Field for quick Entry


    //DETERMINE RNAGE FOR EACH ROUND
    if (currentRound === 1){
        minRange = 1
        maxRange = 5
    }else if(currentRound === 2){
        minRange = 5
        maxRange = 10
    }else if(currentRound === 3){
        minRange = 1
        maxRange = 10
    }else{
        console.error("Invalid Round");
        return
    }

}



/**
 * HANDLE THE USER'S & COMPUTER'S GUESSES
 */
function handleGuess() {
    

}




