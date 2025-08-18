let targetNum
let minRange = +prompt("The Min Number.....")
let maxRange = +prompt("The Max Number.....")
// let minRange = 1
// let maxRange = 5
let gameActive = false

let userScore = 0
let computerScore = 0

const userGuessInput = document.getElementById("user-guess")

const guessBTN = document.getElementById("guess-btn")
const resetBTN = document.getElementById("reset-btn")

const guessRangeMsg = document.getElementById("guess-range")
const displayMsg = document.getElementById("display-msg")
const displayScore = document.getElementById("score")


// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------



// START A NEW GAME/ROUND
function startGame(){
    targetNum = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
    gameActive = true
    userGuessInput.value = ""
    userGuessInput.disabled = false;
    userGuessInput.focus()

    guessBTN.classList.remove("hidden")
    resetBTN.classList.add("hidden")

    displayMsg.classList.remove('green');
    displayMsg.classList.remove('red');

    guessRangeMsg.innerText = `Guess a Number between ${minRange} and ${maxRange}` 
    displayMSG(`Enter Your Guess...`, "msg")

    updateScore()

}

guessBTN.addEventListener("click", handleGame)





// HANDLE THE USER'S & COMPUTER'S GUESSES   
function handleGame(){       
    if(!gameActive) return

    // USER'S TURN
    const userGuess = parseInt(userGuessInput.value)
    if(isNaN(userGuess) || userGuess < minRange || userGuess > maxRange){
        displayMSG(`Please enter a valid number between ${minRange} and ${maxRange}.`, "msg")
        return;
    }


    // DISABLE INPUT AND BTN AFTER USER'S GUESS
    userGuessInput.disabled = true
    guessBTN.classList.add("hidden")

    // CHECK USER'S GUESS 
    if(userGuess === targetNum){
        userScore++
        displayMSG(`Target: ${targetNum}: You guessed ${userGuess}! Correct! You Win!...`, "won")
        endGame()
        return
    }else{
        displayMSG(`Target: ${targetNum}: You guessed ${userGuess}. Too ${userGuess < targetNum ? "low" : "high" }`, "lost")
    }


    // CHECK COMPUTER'S GUESS
    setTimeout(() => {
        const computerGuess = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange

        displayMsg.classList.remove('red');
        displayMsg.classList.remove('green')
        
        if(computerGuess === targetNum){
            computerScore++
            displayMSG(`Target: ${targetNum}: Computer guessed ${computerGuess}! Correct! Computer Wins!...`, "won")
        }else{
            displayMSG(`Target: ${targetNum}: Computer guessed ${computerGuess}. Too ${computerGuess < targetNum ? "low" : "high" }`, "lost")
        }
        
        endGame()
    }, 2000)

}


resetBTN.addEventListener("click", startGame)






// END THE GAME, SHOW "PLAY AGAIN" BTN
function endGame(){
    gameActive = false
    userGuessInput.disabled = true
    guessBTN.classList.add("hidden")
    resetBTN.classList.remove("hidden")

    updateScore()
}


// DISPLAY MSGES
function displayMSG(msg, type){
    displayMsg.textContent = msg


    if (type === 'msg') displayMsg.classList.add('display-msg');
    if (type === 'won') displayMsg.classList.add('green');
    if (type === 'lost') displayMsg.classList.add('red');
}



// UPDATE SCORE
function updateScore(){
    displayScore.innerText = `You: ${userScore} | Computer: ${computerScore}`

}



window.onload = startGame































