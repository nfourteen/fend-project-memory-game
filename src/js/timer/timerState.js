/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

export let timerState = {};

timerState.init = (view) => {
    timerState.view = view;
};

timerState.representation = (model) => {
    let representation = 'Ain\'t got time...to take a fast train';

    // This is where the State decides which component of the View should be displayed
    // here the we designed the application with a single (control) State (~page)
    // In a real-world application there would be many control states and which
    // would trigger the display of different components
    if (timerState.notStarted(model)) {
        representation = timerState.view.ready(model, actions.intents);
    }

    // complete the reactive loop
    timerState.view.display(representation);
};

timerState.notStarted = (model) => model.started;

timerState.nextAction = (model) => {

};

timerState.render = (model) => {
    timerState.representation(model);
    timerState.nextAction(model);
};
