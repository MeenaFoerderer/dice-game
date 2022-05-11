// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let player1Count = 0
let player2Count = 0


// Create variables to store references to the necessary DOM nodes
const loginSection = document.getElementById('loginSection')
const loginBtn = document.getElementById("loginBtn")
const gameSection = document.getElementById('gameSection')
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const player1DiceRolls = document.getElementById('player1DiceRolls')
const player2DiceRolls = document.getElementById('player2DiceRolls')
const refreshInfo = document.getElementById('refresh')


loginBtn.addEventListener("click", function(){
    const player1Name = document.getElementById("player1Name")
    const player2Name = document.getElementById('player2Name')
    if (player1Name.value && player2Name.value) {
        loginSection.style.display = 'none'
        message.textContent = player1Name.value + "'s Turn"
        gameSection.style.display = 'block'
    }
})


function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}


/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player2Dice.textContent = '🎲'
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = player2Name.value + "'s Turn"

        player1Count++
        player1DiceRolls.textContent = player1Count
        //player1Turn = false --> see shorter code line below
    } else {
        player1Dice.textContent = '🎲'
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = player1Name.value + "'s Turn"

        player2Count++
        player2DiceRolls.textContent = player2Count
        //player1Turn = true --> see shorter code line below
    }

    if (player1Count !== player2Count){
        let score1Difference = player1Score - player2Score
        let score2Difference = player2Score - player1Score
            if (player1Score >= 20 && score1Difference > 6) {
                message.textContent = player1Name.value + " Won 🥳"
                player1Dice.classList.remove('active')
                player2Dice.classList.remove('active')
                showResetButton()
            } else if (player2Score >= 20 && score2Difference > 6) {
                message.textContent = player2Name.value + " Won 🎉"
                player1Dice.classList.remove('active')
                player2Dice.classList.remove('active')
                showResetButton()
            }
    }

    if (player1Count === player2Count){
        if ((player1Score && player2Score >= 20) && (player1Score === player2Score)) {
            message.textContent = "⭐️ Draw ⭐️"
            player1Dice.classList.remove('active')
            player2Dice.classList.remove('active')
            showResetButton()
           // refreshInfo.style.display = 'block'
        } else if (player1Score >= 20 && player1Score > player2Score) {
            message.textContent = player1Name.value + " Won 🥳"
            player1Dice.classList.remove('active')
            player2Dice.classList.remove('active')
            showResetButton()
           // refreshInfo.style.display = 'block'
        } else if (player2Score >= 20 && player2Score > player1Score) {
            message.textContent = player2Name.value + " Won 🎉"
            player1Dice.classList.remove('active')
            player2Dice.classList.remove('active')
            showResetButton()
           // refreshInfo.style.display = 'block'
        } 
    }

    // short code version to switch the turn between Player 1 and 2
    player1Turn = !player1Turn

    // could also be written in a longer version as follows:
    /*
    if (player1Turn){
        player1Turn = false
    } else {
        player1Turn = true
    }
    */ 

})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "🎲"
    player2Dice.textContent = "🎲"
    message.textContent = player1Name.value + "'s Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player1Dice.classList.add("active")
    player2Dice.classList.remove("active")

    player1Count = 0
    player2Count = 0
    player1DiceRolls.textContent = '0'
    player2DiceRolls.textContent = '0'

   // refreshInfo.style.display = 'none'
}

