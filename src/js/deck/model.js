/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import {shuffle} from '../util';

export let model = {
    isGameStarted: false,
    cardTypes: ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
        'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle'],
    selectedCards: [],
    moves: 0,
    score: 0,
    totalMatches: 0
};

model.init = (state) => {
    model.state = state;
    if (model.cards === undefined) {
        model.generateDeck();
    }
};

model.generateDeck = () => {
    const cards = model.cardTypes.concat(model.cardTypes); // duplicate cardTypes for matching
    shuffle(cards);
    const cardObjs = [];
    cards.forEach(function(card, idx) {
        cardObjs.push({id: idx, name: card, isSelected: false, isMatched: false});
    });

    model.cards = cardObjs;
};


model.present = (data) => {
    data = data || {};

    if (model.state.notStarted(model)) {
        model.isGameStarted = true;
    }

    if (data.id !== undefined) {
        const selectedCard = model.cards[data.id];
        // don't process a card that's already been selected or matched
        if (model.canProcessSelection(selectedCard)) {
            model.processSelection(selectedCard);
        }
    }

    if (data.refresh === true) {
        model.selectedCards = [];
        model.moves = 0;
        model.score = 0;
        model.totalMatches = 0;
        model.generateDeck();
    }

    if (data.noMatch === true) {
        model.selectedCards[0].isSelected = false;
        model.selectedCards[1].isSelected = false;
        model.selectedCards = [];
        model.updateNumMoves();
    }

    // next step of the reactive loop: compute the state representation
    model.state.render(model);
};

model.processSelection = (card) => {

    card.isSelected = true;
    model.selectedCards.push(card);

    if (model.selectedCards.length === 2 && model.isMatch()) {
        // If isMatch, process data. Otherwise application is in a noMatch state
        // and the state will fire noMatch nextAction predicate
        model.selectedCards[0].isSelected = false;
        model.selectedCards[1].isSelected = false;
        model.selectedCards[0].isMatched = true;
        model.selectedCards[1].isMatched = true;
        model.selectedCards = [];
        model.updateNumMoves();
        model.totalMatches += 1;
    }
};

model.isMatch = () => {
    return model.selectedCards[0].name === model.selectedCards[1].name;
};

model.canProcessSelection = (card) => {
   return !card.isSelected && !card.isMatched && !model.state.processingMatch;
};

model.updateNumMoves = () => {
    model.moves += 1;
};