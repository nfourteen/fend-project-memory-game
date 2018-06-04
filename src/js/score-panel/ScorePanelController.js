/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import { between } from '../util';
import { Modal } from '../modal/modal';

export default class ScorePanelController {
    constructor(view, model, appEvents) {
        this.view = view;
        this.model = model;
        this.appEvents = appEvents;
        this.modal = new Modal();
    }

    init() {
        this.view.bindRestartClick(this.handleRestart.bind(this));
        this.view.renderScore(5, this.model.score);
        this.appEvents.subscribe('updateNumMoves', this.handleMoveUpdate.bind(this));
        this.appEvents.subscribe('timer', this.handleTimer.bind(this));
        this.appEvents.subscribe('gameWon', this.handleGameWon.bind(this));
        this.appEvents.subscribe('restart', this.handleRestart.bind(this));
    }

    handleRestart() {
        this.model.numMoves = 0;
        this.model.score = 5;
        this.model.stopTimer();
        this.model.finalTime = undefined;

        this.view.renderNumMoves(this.model.numMoves);
        this.view.timer.innerHTML = '';
        this.view.renderScore(5, this.model.score)
    }

    handleMoveUpdate(event) {
        this.model.numMoves += event.moves;
        this.view.renderNumMoves(this.model.numMoves);
        this.calculateScore();
    }

    handleTimer(event) {
        const _this = this;

        if (event.startTimer === true && !this.model.isTimerRunning()) {
            this.model.startTimer();
            this.model.timer.addEventListener('secondsUpdated', function () {
                _this.view.timer.innerHTML = _this.model.timer.getTimeValues().toString();
            });
        }

        if (event.stopTimer === true && this.model.isTimerRunning()) {
            this.model.finalTime = this.model.getTimeValues();
            this.model.stopTimer();
        }
    }

    handleGameWon(event) {
        if (event.gameWon === true) {
            const _this = this;
            const data = {
                score: this.model.score,
                time: this.model.finalTime,
                moves: this.model.numMoves
            };

            const template = `
                <h1>You Win!</h1>
                <p>Your score: ${data.score} out of 5</p>
                <p>Your time was: ${data.time}</p>
                <p>It took you ${data.moves} moves.</p>
                <button id="play-again">Play again!</button>
            `;

            this.modal.afterSetContents = () => {
                const playAgain = document.getElementById('play-again');
                playAgain.addEventListener('click', function () {
                    _this.appEvents.publish('restart', {});
                    _this.modal.toggleModal();
                });
            };
            this.modal.setContents(template);
            this.modal.toggleModal();
        }
    }

    calculateScore() {
        const num = this.model.numMoves;
        const oldScore = this.model.score;

        if (between(num, 0, 15)) {
            this.model.score = 5;
        } else if (between(num, 16, 25)) {
            this.model.score = 4;
        } else if (between(num, 26, 35)) {
            this.model.score = 3;
        } else if (between(num, 36, 45)) {
            this.model.score = 2;
        } else {
            this.model.score = 1;
        }

        if (oldScore !== this.model.score) {
            this.view.renderScore(5, this.model.score);
        }
    }
}
