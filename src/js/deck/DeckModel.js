/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import {shuffle} from '../util';


export default class DeckModel {

    cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
        'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'];
    cards = [];
    openedCards = [];
    matchedCards = [];

    init() {
        this.generateDeck();
    }

    generateDeck() {
        // duplicate cardTypes for matching
        const cards = this.cardTypes.concat(this.cardTypes);
        shuffle(cards);
        const cardObjs = [];
        cards.forEach(function(card, idx) {
            cardObjs.push({id: idx, name: card});
        });

        this.cards = cardObjs;
    }

    getCards() {
        return this.cards;
    }

    isMatch() {
        return this.openedCards[0].name === this.openedCards[1].name;
    }

    addOpenedCard(cardId) {
        this.openedCards.push(this.cards[cardId]);
    }

    addMatchedCard(cardId) {
        this.matchedCards.push(this.cards[cardId]);
    }

}


