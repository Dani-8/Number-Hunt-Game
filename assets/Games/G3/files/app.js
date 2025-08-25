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
// let minRange = +prompt("Enter minimum range:")
// let maxRange = +prompt("Enter maximum range:")


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


let modal = document.getElementById("modal")
let modalTitle = document.getElementById("modal-title")
let modalMessage = document.getElementById("modal-message")
let modalCloseBtn = document.getElementById("modal-btn")

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/**
 * STARTS A NEW GAME
 * RESETS SCORES, ROUNDS,& BEGINS THE NEW ROUND
*/ 
function startGame() {
    userScore = 0
    compScore = 0
    currentRound = 0    
    startNewRound()
    updateScoreDisplays()
    showMessage("Let's Start the Game!", "info")
    userGuessInput.disabled = false
    guessBtn.disabled = false

}


/**
    *GENERATE A RANDOM NUMBER WITHIN A SPECIFIC RANGE
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





/** MOST IMPORTANT FUNCTION (SHOW MESSAGE)
    
    *DISPLAY THE MESSAGE TO THE USER
    * -msg -- DISPLAY MESSAGE
    * -type --- MESSAGE TYPE WITH THEIR OWN COLOR (INFO, SUCCESS, ERROR) 
 */

function showMessage(msg, type){
    messageBox.innerHTML = msg
    messageBox.className = type
}




// CONTROL BUTTONS 
guessBtn.addEventListener("click", handleGuess);
newGameBtn.addEventListener("click", startGame);

modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    startGame();
});

userGuessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleGuess();
    }
});


/**
 * STARTS A NEW ROUND OF THE GAME
 * SETS NEW RANGE, RESETS ATTEMPTS & GENERATES A NEW TARGET NUMBER
 */

function startNewRound(){
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

    targetNumber = generateRandomNumber(minRange, maxRange)
    updateDisplays()
    showMessage(`Guess a Number between ${minRange} and ${maxRange}.`, "info")
}



/**
 * HANDLE THE USER'S & COMPUTER'S GUESSES
 */
function handleGuess() {
    if(roundOver){
        showMessage("The round is over. Start a new round.", "info")
        return
    }


    // --- USER'S TURN ---
    const userGuess = parseInt(userGuessInput.value)
    
    if(isNaN(userGuess) || userGuess < minRange || userGuess > maxRange){
        showMessage(`Please enter a valid number between ${minRange} and ${maxRange}`, "error")
        return
    }

    if(userAttempts > 0){
        userAttempts--
        userAttemptDisplay.textContent = userAttempts
        targetNumber = generateRandomNumber(minRange, maxRange)
        userGuessInput.value = ""
        userGuessInput.focus() 
        

        if(userGuess === targetNumber){
            userScore++
            showMessage(`Congratulations! <br> <span class="highlight"> Target Number: ${targetNumber} | You Guessed: ${userGuess} </span> <br> You guessed the correct number.</span>`, "success")
            roundOver = true
        }else if (userGuess < targetNumber){
            showMessage(`<span class="highlight"> Target Number: ${targetNumber} | You Guessed: ${userGuess} </span> <br> Your guess is too low. Try again!`, "info")
            
        }else{
            showMessage(`<span class="highlight"> Target Number: ${targetNumber} | You Guessed: ${userGuess} </span> <br> Your guess is too high. Try again!`, "info")
        }
    }else{
        showMessage("You have no Attempts left for this round!", "error")
    }


    // --- COMPUTER'S TURN ---
    // COMPUTER ONLY MAKES A GUESS IF USER HASNT WON THE ROUND:
    if(!roundOver && compAttempts > 0){
        // CompGuess
        const compGuess = generateRandomNumber(minRange, maxRange)
        compAttempts--
        compAttemptDisplay.textContent = compAttempts


        setTimeout(() => {      //Delay before Computer guess
            if(compGuess === targetNumber){
                compScore++
                showMessage(`Congratulations! <br> <span class="highlight"> Target Number: ${targetNumber} | Computer Guessed: ${compGuess} </span> <br> Computer guessed the correct number.`, "success")
                roundOver = true
            }else if(compGuess < targetNumber){
                showMessage(`<span class="highlight"> Target Number: ${targetNumber} | Computer Guessed: ${compGuess} </span> <br> Computer's guess is too low.`, "info")
            }else{
                showMessage(`<span class="highlight"> Target Number: ${targetNumber} | Computer Guessed: ${compGuess} </span> <br> Computer's guess is too high.`, "info")
            }
            checkRoundOver()
        }, 1000);      //1 Second Delay!!!
    }else{
        checkRoundOver()        // CHECK IF ROUND OVER IF COMPUTER DIDNT GUESS
    }


// FUNCTION OVER HERE
}





/**
 * UPDATE THE SCORE DISPLAYS
 */
function updateScoreDisplays() {
    userScoreDisplay.textContent = userScore;
    compScoreDisplay.textContent = compScore;
}





/**
 * CHECK IF CURRENT ROUND IS OVER
 */

function checkRoundOver(){
    if(roundOver){          //IF SOMEONE WON 
        updateScoreDisplays();

        setTimeout(() => {
            if(currentRound < 3){
                startNewRound();
            }else{
                endGmame();
            }
        }, 2000);          //2 SECOND DELAY 
    }else if (userAttempts === 0 && compAttempts === 0){
        showMessage(`No One Guessed the Number ${targetNumber}! <br> The game is over.`, "info")
        roundOver = true
        updateScoreDisplays();
        
        setTimeout(() => {
            if(currentRound < 3){
                startNewRound();
            }else{
                endGmame();
            }
        }, 2000); 
    }
}



// UPDATE THE ALL THE DISPLAY! LIKE SCORES, ATTEMPTS, ROUNDS...
function updateDisplays() {
    roundDisplay.textContent = `${currentRound}/3`
    userAttemptDisplay.textContent = userAttempts
    compAttemptDisplay.textContent = compAttempts
    rangeMsgDisplay.textContent = `Guess a Number between ${minRange} - ${maxRange}`
}




/**
 * END THE ENTIRE GAME & DISPLAY THE FINAL RESULT
 */
function endGmame(){
    let finalMessage = ""

    if(userScore > compScore){
        finalMessage = `🎉  Congratulations! You win the game with ${userScore} points!`;
        modalTitle.textContent = "YOU WON!"
    }else if(compScore > userScore){
        finalMessage = `😔  Computer wins the game with ${compScore} points! Better luck next time!`;
        modalTitle.textContent = "COMPUTER WON!"
    }else{
        finalMessage = `🤝  It's a tie! Both you and the computer have ${userScore} points.`;
        modalTitle.textContent = "IT'S A TIE!"
    }


    modalMessage.textContent = finalMessage;
    modal.classList.remove("hidden");

    userGuessInput.disabled = true;
    guessBtn.disabled = true;
}




// Initialize the game when the page loads
window.onload = startGame;






















