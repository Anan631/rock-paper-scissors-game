let score = JSON.parse(localStorage.getItem('score'))
    || { wins: 0, losses: 0, ties: 0 };

let intervalId;
let isAutoPlaying = false;


document.querySelector('.Rock-button').addEventListener('click', () => {
    playGame('Rock');
});
document.querySelector('.Paper-button').addEventListener('click', () => {
    playGame('Paper');
});
document.querySelector('.Scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});
document.querySelector('.auto-play').addEventListener
    ('click', () => {
        autoPlay();
    });
document.querySelector('.show_score').addEventListener
    ('click', () => {
        showScore();
    });
document.querySelector('.reset-style').addEventListener
    ('click', () => {
        confirmReset();
    });


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('Rock');
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('Paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('Scissors');
    }
    else if (event.key === 'a' || event.key === 'A') {
        autoPlay();
    }
});


function pickComputerMove() {
    let computerMove = '';
    const randomNum = Math.floor(Math.random() * 3) + 1;

    if (randomNum === 1) {
        computerMove = 'Rock';

    } else if (randomNum === 2) {
        computerMove = 'Paper';

    } else {
        computerMove = 'Scissors';
    }
    return computerMove;
}


function playGame(playerMove) {
    let result = '';
    const computerMove = pickComputerMove();
    if (computerMove === "Rock") {
        if (playerMove === 'Rock') {
            result = 'tie';

        } else if (playerMove === 'Paper') {
            result = 'win';
        } else {
            result = 'lose';
        }

    } else if (computerMove === 'Paper') {
        if (playerMove === 'Rock') {
            result = 'lose';
        } else if (playerMove === 'Paper') {
            result = 'tie';

        } else {
            result = 'win';
        }
    } else {
        if (playerMove === 'Rock') {
            result = 'win';
        } else if (playerMove === 'Paper') {
            result = 'lose';
        } else {
            result = 'tie';
        }
    }

    display_Results(playerMove, computerMove, result);
    updateScore(result);
}


function display_Results(playerMove, computerMove, result) {

    document.querySelector('.moves').innerHTML
        = `You 
     <img src="images/${playerMove}-emoji.png" class="move-icon"></img>
     <img src="images/${computerMove}-emoji.png" class="move-icon"></img> 
     computer`;

    document.querySelector('.finalResult').innerHTML = `You ${result}`;
}


function updateScore(result) {

    if (result === 'win') {
        score.wins += 1;
    } else if (result === 'lose') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }
    document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;

    localStorage.setItem('score', JSON.stringify(score));
}



function confirmReset() {
    document.querySelector('.confirm').innerHTML = `
    Are you sure you want to reset the score?
     <button class="confirm-button confirm-button-yes" >
     Yes</button>

     <button 
     class="confirm-button confirm-button-no">
     No</button>
     `;

    document.querySelector('.confirm-button-yes').addEventListener
        ('click', () => {
            reset();
        });

    document.querySelector('.confirm-button-no').addEventListener
        ('click', () => {
            document.querySelector('.confirm').innerHTML = '';
        });

}

function reset() {
    if (isAutoPlaying){
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play').innerHTML = ' Auto Play';
    }
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;

    document.querySelector('.moves').innerHTML = '';

    document.querySelector('.finalResult').innerHTML = '';

    localStorage.removeItem('score');
    document.querySelector('.confirm').innerHTML = '';

}
function showScore() {
    document.querySelector('.show_score').style.display = 'none';
    document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function autoPlay() {
    if (!isAutoPlaying) {
        document.querySelector('.auto-play').innerHTML = 'Stop Auto Play';
        intervalId = setInterval(() => {
            playGame(pickComputerMove());
        }, 500);
        isAutoPlaying = true;
    } else {

        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play').innerHTML = ' Auto Play';

    }

}
