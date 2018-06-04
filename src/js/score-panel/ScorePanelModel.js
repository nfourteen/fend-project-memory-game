/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import Timer from '../../../node_modules/easytimer.js/src/easytimer/easytimer';

export default class ScorePanelModel {
    numMoves = 0;
    score = 5;
    finalTime = undefined;
    timer = new Timer();

    isTimerRunning() {
        return this.timer.isRunning();
    }

    startTimer() {
        this.timer.start();
    }

    stopTimer() {
        this.timer.stop();
    }

    getTimeValues() {
        return this.timer.getTimeValues().toString();
    }
}
