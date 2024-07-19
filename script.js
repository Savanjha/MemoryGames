document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', icon: 'A' },
        { name: 'B', icon: 'B' },
        { name: 'C', icon: 'C' },
        { name: 'D', icon: 'D' },
        { name: 'E', icon: 'E' },
        { name: 'F', icon: 'F' },
        { name: 'G', icon: 'G' },
        { name: 'H', icon: 'H' },
        { name: 'A', icon: 'A' },
        { name: 'B', icon: 'B' },
        { name: 'C', icon: 'C' },
        { name: 'D', icon: 'D' },
        { name: 'E', icon: 'E' },
        { name: 'F', icon: 'F' },
        { name: 'G', icon: 'G' },
        { name: 'H', icon: 'H' }
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        const gameBoard = document.getElementById('game-board');
        shuffle(cardsArray);
        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.innerHTML = `<div class="card-content">${card.icon}</div>`;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        score += 10;
        document.getElementById('score').textContent = score;
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});
