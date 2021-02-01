/*
GAME FUNCTIONS
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if lose
Let player choose to play again 
*/

// Game values
let min = 10,
    max = 20,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3; 
    
// UI Elements
const game = document.querySelector('#game'),
      minNumm = document.querySelector('.min-num'),
      maxNum =  document.querySelector('.max-num'),
      guessBtn =  document.querySelector('#guess-btn'),
      guessInput =  document.querySelector('#guess-input'),
      message =  document.querySelector('.message');
    
// Assign UI min and max      
minNumm.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again'){
      window.location.reload();
   }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);
   // Validate
   if(isNaN(guess) || guess < min || guess > max){
      setMessage(`Please, enter a number between ${min} and ${max}`, 'red')
   } 

   // Check if won
   if (guess === winningNum){
      // Game over - won
      gameOver(true, `${winningNum} is correct. you won!`)
   } else {
      // Wrong number
      guessesLeft -= 1
      if(guessesLeft === 0){
         // Game Over - lost
         
         gameOver(false, `You lost! The winning number was ${winningNum}.`);
      } else {
         // Game continues - wrong number

         // Tell it's a wrong number 
         setMessage(`The number is incorrect, ${guessesLeft} guesses left`, 'red');   

         // Change input border color
         guessInput.style.borderColor = "red"; 

         // Clear input
         guessInput.value = '';
      }
   }
});

// Game over
function gameOver(won, msg){
   let color;
   won === true ? color = 'green' : color = 'red'
   //Disable input
   guessInput.disabled = true;
   //Change border color
   guessInput.style.borderColor = color;
   // Set message 
   setMessage(msg, color);
   // Play again
   guessBtn.value = 'Play again!';
   guessBtn.className = 'play-again';
}

// Get winning number
function getRandomNum(min, max){
   return Math.floor(Math.random()*(max-min+1) + min);
}


function setMessage(msg, color){
   message.style.color = color;
   message.textContent = msg;
}