/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import { theme } from './theme';

export var view = {};


// State representation of the ready state
view.ready = (model, intents) => {
    return {
        scorePanel: theme.scorePanel(model.score, model.moves, intents),
        deck: theme.list(model.cards, intents)
    };
};


//display the state representation
view.display = (representation) => {
    Object.keys(representation).forEach(function (el) {
        const component = document.getElementById(el);
        component.innerHTML = representation[el];
    });

    // let stateRepresentation = document.querySelector('.deck');
    // stateRepresentation.innerHTML = representation;
};
