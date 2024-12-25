let scoreP1=0;
let scoreP2=0;
let highScoreP1=0;
let highScoreP2=0;
let dice = document.getElementById('btn-roll-dice');
let diceValue = 0;
let scoreP1Element = document.getElementById('score--0');
let scoreP2Element = document.getElementById('score--1');
let scoreP1current = document.getElementById('current--0');
let scoreP2current = document.getElementById('current--1');
let newgame = document.getElementById('btn-new-game');
let hold = document.getElementById('btn-hold');
let img = document.querySelector('.dice');
let player = 1;

dice.addEventListener('click', () => {
    if(player === 1){
    diceValue = Math.floor(Math.random() * 6) + 1;
    img.src = `dice-${diceValue}.png`;
    if(diceValue !== 1){
        scoreP1 += diceValue;
        highScoreP1 += diceValue;
        scoreP1Element.textContent = scoreP1;
    }else{
        player = player * -1;
        scoreP1 = 0;
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
    }
    }else{
        diceValue = Math.floor(Math.random() * 6) + 1;
        img.src = `dice-${diceValue}.png`;
        if(diceValue !== 1){
            scoreP2 += diceValue;
            highScoreP2 += diceValue;
            scoreP2Element.textContent = scoreP2;
        }else{
            player = player * -1;
            scoreP2 = 0;
            document.querySelector('.player--1').classList.remove('player--active');
            document.querySelector('.player--0').classList.add('player--active');
        }
    }
});

hold.addEventListener('click', () => {
    if(player === 1){
        player =player * -1;
        scoreP1current.textContent = highScoreP1;
    scoreP1 = 0;
    scoreP1Element.textContent = 0;
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    if(highScoreP1 >= 20){
        document.querySelector('.player--0').classList.add('player--winner');
        dice.disabled=true;
        hold.disabled=true;
    }else if(highScoreP2 >= 20){
        document.querySelector('.player--1').classList.add('player--winner');
        dice.disabled=true;
        hold.disabled=true;
    }
}else{
    scoreP2current.textContent = highScoreP2;
    scoreP2 = 0;
    scoreP2Element.textContent = 0;
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    if(highScoreP1 >= 20){
        document.querySelector('.player--0').classList.add('player--winner');
        dice.disabled=true;
        hold.disabled=true;
    }else if(highScoreP2 >= 20){
        document.querySelector('.player--1').classList.add('player--winner');
        dice.disabled=true;
        hold.disabled=true;
    }
}
});
    
    

newgame.addEventListener('click', () => {
    player =1;
    scoreP1 = 0;
    scoreP2 = 0;
    scoreP1Element.textContent = 0;
    scoreP2Element.textContent = 0;
    highScoreP1 = 0;
    highScoreP2 = 0;
    scoreP1current.textContent = 0;
    scoreP2current.textContent = 0;
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

});