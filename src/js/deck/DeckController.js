/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

export default class DeckController {
    constructor(view, model, appEvents) {
        this.view = view;
        this.model = model;
        this.appEvents = appEvents;
    }

    init() {
        this.model.init();

        const cards = this.model.getCards();
        this.view.renderDeck(cards);

        this.view.bindCardClick(this.handleCardClick.bind(this));
        this.view.bindRestartClick(this.handleRestart.bind(this));
        this.appEvents.subscribe('restart', this.handleRestart.bind(this));
    }

    handleCardClick(cardId) {
        // check if card was already clicked or matched and don't process if so
        const alreadySelected = this.model.openedCards.find(card => card.id === parseInt(cardId));
        const alreadyMatched = this.model.matchedCards.find(card => card.id === parseInt(cardId));

        this.appEvents.publish('timer', {startTimer: true});

        if (!alreadySelected && !alreadyMatched) {
            this.model.addOpenedCard(cardId);
            this.view.openCard(cardId);
            if (this.model.openedCards.length === 2) {
                this.appEvents.publish('updateNumMoves', {moves: 1});
                this.checkForMatch();
            }
        }
    }

    handleRestart() {
        this.model.cards = [];
        this.model.openedCards = [];
        this.model.matchedCards = [];

        this.model.generateDeck();
        this.view.renderDeck(this.model.getCards());
    }

    checkForMatch() {
        if (this.model.isMatch()) {
            this.model.addMatchedCard(this.model.openedCards[0].id);
            this.model.addMatchedCard(this.model.openedCards[1].id);
            this.view.matchCard(this.model.openedCards[0].id);
            this.view.matchCard(this.model.openedCards[1].id);
        } else {
            const _this = this;
            const cardsToClose = this.model.openedCards;

            setTimeout(function () {
                _this.view.closeCard(cardsToClose[0].id);
                _this.view.closeCard(cardsToClose[1].id);
            }, 700);
        }

        if (this.gameWon()) {
            this.appEvents.publish('timer', {stopTimer: true});
            this.appEvents.publish('gameWon', {gameWon: true});
            this.model.matchedCards = [];
        }

        this.model.openedCards = [];
    }

    gameWon() {
        return this.model.matchedCards.length === this.model.cardTypes.length * 2;
    }

}
