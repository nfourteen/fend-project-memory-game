/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

export let timerActions = {};

timerActions.init = (present) => {
    timerActions.present = present;
    timerActions.intervalPid = undefined;
};

timerActions.startTimer = (present) => {
    present({running: true, started: true, stopped: false});
};

timerActions.incrementTimer = (data, present) => {
    let p = present;
    setTimeout(function() {
        p({incrementBy: 1});
    }, 1000);
};

timerActions.stopTimer = (data, present) => {
    present({running: false, started: false, stopped: true});
};
