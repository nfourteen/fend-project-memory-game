/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */


export default class GameView {

    constructor() {
        this.deck = document.querySelector('.deck');
        this.numMoves = document.querySelector('.numMoves');
        this.score = document.querySelectorAll('.stars li');
        this.restart = document.querySelector('.restart');
        this.timer = document.querySelector('.timer');
    }

    renderDeck(cards) {
        let cardMarkup = '';
        cards.forEach((card) => {
            cardMarkup += `
                 <li id="${card.id}" class="card">
                    <i class="fa ${card.name}"></i>
                 </li>`;
        });

        this.deck.innerHTML = cardMarkup;
    }

    renderNumMoves(numMoves) {
        this.numMoves.innerHTML = numMoves;
    }

    renderScore(maxScore, curScore) {
        let i = 0;

        while (i < maxScore) {
            if (i < curScore) {
                this.score[i].firstChild.classList.add('highlight');
            } else {
                this.score[i].firstChild.classList.remove('highlight');
            }
            i++;
        }
    }

    openCard(cardId) {
        const target = document.getElementById(cardId);
        target.classList.add('open', 'show');
    }

    closeCard(cardId) {
        const target = document.getElementById(cardId);
        target.classList.remove('open', 'show');
    }

    matchCard(cardId) {
        const target = document.getElementById(cardId);
        target.classList.add('match');
        target.classList.remove('open', 'show');
    }

    bindCardClick(handler) {
        this.deck.addEventListener('click', function(event) {
            if (event.target.nodeName === 'LI') {
                handler(event.target.getAttribute('id'));
            }
        });
    }

    bindRestartClick(handler) {
        this.restart.addEventListener('click', handler);
    }
}
