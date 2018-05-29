import {model} from '../deck/model';

/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */


export let timerModel = {
    started: false,
    running: false,
    stopped: true,
    unitsInMilliseconds: {
        seconds: 1000,
        minutes: 60000,
        hours: 3600000,
    },
    elapsedTime: 0
};

timerModel.init = (state) => {
    timerModel.state = state;
};

timerModel.present = (data) => {
    data = data || {};

    if (data.incrementBy !== undefined) {
        timerModel.elapsedTime += data.incrementBy;
    }

};

timerModel.resetTimer = () => {
    timerModel.started = false;
    timerModel.running = false;
    timerModel.stopped = true;
    timerModel.elapsedTime = 0;
};
