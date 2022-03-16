let cardsList = [
    {"name" : "mem1", "img_src" : "img/mem-1.jpg"},
    {"name" : "mem2", "img_src" : "img/mem-2.jpg"},
    {"name" : "mem3", "img_src" : "img/mem-3.jpg"},
    {"name" : "mem4", "img_src" : "img/mem-4.jpg"},
    {"name" : "mem5", "img_src" : "img/mem-5.jpg"},
    {"name" : "mem6", "img_src" : "img/mem-6.jpg"},
    {"name" : "mem7", "img_src" : "img/mem-7.jpg"},
    {"name" : "mem8", "img_src" : "img/mem-8.jpg"},
    {"name" : "mem9", "img_src" : "img/mem-9.jpg"}
];

let count = 0;
let firstCardGuess = '';
let secondCardGuess = '';
let cardBoard = document.querySelector('#card-board');

let grid = document.createElement('div');

grid.setAttribute('class', 'grid');

cardBoard.insertAdjacentElement('afterBegin', grid);

let cardGrid = cardsList.concat(cardsList);

function shuffleArray(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let shuffledCards = shuffleArray(cardGrid);

function showCardBoard() {
    shuffledCards.forEach(element => {
        let card = document.createElement('div');

        card.classList.add('card');
        card.dataset.name = element.name;
        card.innerHTML = `<img src="${element.img_src}" alt="picture">`;

        grid.insertAdjacentElement('afterBegin', card);
    });
}

showCardBoard();

grid.addEventListener('click', function(event) {
    let target = event.target;

    let selectedCard = target.parentElement;

    if(target.classList.contains('grid')) {
        return;
    }

    if(count < 2) {
        count++;
        if(count == 1) {
            firstCardGuess = selectedCard.dataset.name;
            selectedCard.classList.add('selected', 'is-clicked');
        } else {
            if(!selectedCard.classList.contains('is-clicked')) {
                secondCardGuess = selectedCard.dataset.name;
                selectedCard.classList.add('selected');

                checkCardMatch(firstCardGuess, secondCardGuess);

                document.querySelectorAll('.card').forEach((card) => {
                    card.classList.remove('is-clicked');
                }); 
            } else {
                count--;
            }
        }
    }
});

function checkCardMatch(guess1, guess2) {
    if(guess1 == guess2) {
        match();
    } else {
        unmatch();
    }
}

let match = () => {
    let selectedCards = document.querySelectorAll('.selected');

    selectedCards.forEach(card => {
        card.classList.add('matched');
        card.querySelector('img').style.opacity = '1';
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.8';
        card.classList.remove('selected');
    });

    count = 0;
};

let unmatch = () => {
    let selectedCards = document.querySelectorAll('.selected');
    setTimeout(() => {
        selectedCards.forEach(card => {
            card.classList.remove('selected');
        });
    }, 800);

    count = 0;
};