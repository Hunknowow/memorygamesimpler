// TODO difficulty chooser

let difModifier = 12

// Defining the three difficulty modifier radio buttons

let radioButtons = document.querySelectorAll('#question>input');

let difficulty = "Easy";

// MAKING THE RADIO BUTTONS WORK
for (let i=0; i < 3; i++) {
    let item = radioButtons[i];
    item.onclick = () => {
        difModifier = item.value;
        switch (difModifier) {
            case 12:
                difficulty = "Easy";
            case 18:
                difficulty = "Normal";
            case 24:
                difficulty = "Hard";
        }
        NewGame();
    }
}

let turned = 0;

let score = 0;

let tries = Math.floor(difModifier * 0.6);

let shuffled;


// Tries initialization
const TriesRefresh = () => {
    let triesDisplay = document.querySelector('#tries');
    triesDisplay.textContent = `Lives: ${tries}`;
};

TriesRefresh();

// Score Function
const ScoreRefresh = () => {
    let scoreDisplay = document.querySelector('#score');
    scoreDisplay.textContent = `Score: ${score}`;
};

ScoreRefresh();

const CreateCardIndexes = () => {
    // TODO Create a list of cards based on the modifier number

    let cardIndexList = []
    for (let i = 0; i < difModifier/2; i++) {
        cardIndexList.push(i)
        cardIndexList.push(i)
    }

// TODO Randomize list

    shuffled = [];

    shuffled = cardIndexList // Value to use later IMPORTANT
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

};

CreateCardIndexes();

let cardsTurned = [];

// TODO Create a function that, when there's two cards turned, checks if they match, and if yes, keeps them upside

const CompareCards = () => {
    if (cardsTurned.length === 2) {
        let hider = document.querySelector("#hider-div");
        hider.classList.add('overlay') // Adding the hider overlay to prevent clicks
        setTimeout(() => { // Good match
            if (cardsTurned[0].src.toString().split()[0].split("").slice(-5)[0] === cardsTurned[1].src.toString().split()[0].split("").slice(-5)[0]) {
                score += 1;
                if (score === (difModifier / 2)) {
                    alert(`You won on ${difficulty} mode with ${tries} live(s) left !`);
                    NewGame();
                }
                ScoreRefresh(); // +1 score
                cardsTurned = [];
                hider.classList.remove('overlay') // Removing hider overlay
            } else { // Wrong
                tries -= 1;
                if (tries === 0) {
                    alert(`You lost on ${difficulty} mode with a score of ${score} !`);
                    NewGame();
                    hider.classList.remove('overlay');
                }
                TriesRefresh();
                setTimeout(() => {
                    cardsTurned[0].classList.remove("front");
                    cardsTurned[0].classList.add("back")
                    cardsTurned[0].setAttribute('src', './assets/images/back.png');
                    cardsTurned[1].classList.remove("front");
                    cardsTurned[1].classList.add("back")
                    cardsTurned[1].setAttribute('src', './assets/images/back.png');
                    cardsTurned = [];
                    hider.classList.remove('overlay') // Removing hider overlay
                }, 1500)

            }
        }, 100)

    }
};

// TODO Card populate function

const PopulateCards = () => {
    let htmlDiv = document.querySelector("#flip-card-container");

    for (let i = 0; i < difModifier; i++) {

        let cardDiv = document.createElement('div');
        let card = document.createElement('img');
        cardDiv.classList.add('cardDiv')
        // card.setAttribute('src', `./assets/images/${shuffled[i]}.png`);
        card.setAttribute('src', './assets/images/back.png');
        card.setAttribute('class', `card${shuffled[i]}`)
        card.classList.add("back")
        cardDiv.appendChild(card);
        cardDiv.addEventListener('click', () => {
            // console.log(`Card ${shuffled[i]}`)
            // TODO create a function that makes it so if the card has the class
            // back, it switches with front, and vice versa

            for (let a = 0; a < card.classList.length; a++) {
                // card.classList.remove("front")
                // When a card is face up
                if (card.classList[a].toString() === "front") {
                    console.log("Hey !")
                    // When a card is revealed
                } else if (card.classList[a].toString() === "back") {
                    turned += 1;
                    // TODO keep track of turned card
                    cardsTurned.push(card);
                    CompareCards();


                    card.classList.remove("back");
                    card.classList.add("front")
                    card.setAttribute('src', `./assets/images/${shuffled[i]}.png`);
                }
            }

        });
        // END OF EVENT LISTENER FUNCTION

        htmlDiv.appendChild(cardDiv);
    }
};

PopulateCards();

// TODO Create a reset function that cleans the board

const CleanBoard = () => {
    let mainDiv = document.querySelector("#flip-card-container");
    mainDiv.innerHTML = "";
};

// TODO Function to link to the radio button for the game to reset each time they are pressed with new difficulty

const NewGame = () => {
    tries = Math.floor(difModifier * 0.6)
    score = 0;
    cardsTurned = [];
    turned = 0;
    CleanBoard();
    CreateCardIndexes();
    PopulateCards();
    ScoreRefresh();
    TriesRefresh();
};


// TODO Check if win
// TODO Check if lose