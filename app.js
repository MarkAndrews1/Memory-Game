
const container = document.querySelector(".container");
let cards = [];
let card1;
let card2;
let noClicking = false;
let score = 0;


document.querySelector(".score").textContent = score;

fetch("../data/cards.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

function generateCards() {
    for (let card of cards) {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute("data-name", card.name)
        newCard.innerHTML = `
        <div class = "front">
          <img class = "front-img" src= ${card.image}/>
        </div>
        <div class = "back"></div>
        `;
        newCard.addEventListener("click", flipCard)
        container.appendChild(newCard);
    }
}

function shuffleCards() {
    let counter = cards.length;

    while (counter > 0) {

        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = cards[counter];
        cards[counter] = cards[index];
        cards[index] = temp;
    }

    return cards;
}

function flipCard() {
    if (noClicking) return;
    if (this === card1) return;

    this.classList.add("flipped");

    if (!card1) {
        card1 = this;
        return;
    }
    card2 = this;

    noClicking = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = card1.dataset.name === card2.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    score++;
    document.querySelector(".score").textContent = score;

    resetBoard();
}

function unflipCards() {
    setTimeout(function () {
        card1.classList.remove("flipped")
        card2.classList.remove("flipped")
        resetBoard();
    }, 1000)
}

function resetBoard() {
    card1 = null;
    card2 = null;
    noClicking = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    container.innerHTML = "";
    generateCards();
}