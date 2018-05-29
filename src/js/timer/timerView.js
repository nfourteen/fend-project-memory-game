/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */


export let timerView = {};

// Initial State
timerView.init = (model, intents) => {
    return timerView.ready(model, intents);
};

// State representation of the ready state
timerView.ready = (model, intents) => {
    return model.elapsedTime;
};


//display the state representation
timerView.display = (representation) => {
    let injectLocation = document.querySelector('.moves');
    let timerElement = document.createElement('span');
    timerElement.className = 'timer';
    timerElement.innerHTML = representation;

    // insert after the injectLocation element
    injectLocation.parentNode.insertBefore(timerElement, injectLocation.nextSibling);

    // let stateRepresentation = document.querySelector('.moves');
    // stateRepresentation.innerHTML = representation;
};
