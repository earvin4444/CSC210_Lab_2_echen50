const board = document.getElementById('game-board'); //doesn't change
let flippedCards = [];
let matchedCount = 0; //counting
const values = [ '🀛', '🀛', '🀙', '🀙', '🀄︎', '🀄︎', '🀂', '🀂', '🀍', '🀍', '🀗', '🀗', '🀎', '🀎', '🀒', '🀒'];
values.sort(()=> Math.random()-0.5); //shuffle values array

values.forEach(val => {
    const card = document.createElement('div');
    card.classList.add('card'); 
    card.dataset.value = val; //storing value in card
    card.innerText = ""
    card.addEventListener('click', flipCard);
    board.appendChild(card);
})

//flipping card

function flipCard(){
    //flip if less than 2 cards open + is new card
    if(flippedCards.length < 2 && !this.classList.contains('flipped')){
        this.innerText = this.dataset.value;
        this.classList.add('flipped');
        flippedCards.push(this);

        if(flippedCards.length ===2){
            setTimeout(checkMatch, 500); //wait .5 sec  then check


        }
    }

}

//check match
function checkMatch(){
    const[card1,card2] = flippedCards;

    if(card1.dataset.value === card2.dataset.value){
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        matchedCount +=2;

        //only click once once paired
        card1.removeEventListener('click',flipCard);
        card2.removeEventListener('click', flipCard);
    }

    else{ //if not paired
        card1.innerText = "";
        card2.innerText = "";
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    

    flippedCards = []; //clear and restart for next turn

    //game end
    if(matchedCount === 16){
        alert("Yay! You matched all the pairs");

    }



}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () =>{
    location.reload();
})