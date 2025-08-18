let userScore = 0
let compScore = 0


function play(userGuess){
    let targetNum = Math.floor(Math.random() * 5) + 1 
    let compGuess = Math.floor(Math.random() * 5) + 1 


    let msg = `Target: ${targetNum}<br>`
    msg += `Your Guess: ${userGuess}<br>`
    msg += `Computer Guess: ${compGuess}<br><br>`


    if(userGuess == targetNum && compGuess == targetNum){
        msg += `<span>TIE! Both got it!</span>`
    }
    else if(userGuess  == targetNum){
        userScore++
        msg += `<span class="win">YOU WON!</span>`
    }
    else if(compGuess  == targetNum){
        compScore++
        msg += `<span class="lost">Computer WON!</span>`
    }else{
        msg += `<span>Nobody got it!</span>`
    }

    
    document.getElementById("result").innerHTML = msg
    document.getElementById("score").innerHTML = `YOU: ${userScore} | COMPUTER: ${compScore}`
}




























