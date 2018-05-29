import {actions} from './actions';

/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

// import { actions } from './actions.js';

////////////////////////////////////////////////////////////////////////////////
// State
//
export let state = {};

state.init = (view) => {
    state.view = view;
};

state.representation = (model) => {
    let representation = 'Something went wrong, the game is in an invalid state';

    // This is where the State decides which component of the View should be displayed
    // here the we designed the application with a single (control) State (~page)
    // In a real-world application there would be many control states and which
    // would trigger the display of different components
    if (state.notStarted(model)) {
        representation = state.view.ready(model, actions.intents);
    }
    if (state.playing(model)) {
        representation = state.view.ready(model, actions.intents);
    }

    // complete the reactive loop
    state.view.display(representation);
};

// Derive the current state of the system
state.notStarted = (model) => !model.isGameStarted;
state.playing    = (model) => model.isGameStarted;
state.noMatch    = (model) => model.selectedCards.length === 2 && !state.processingMatch;
state.won        = (model) => model.totalMatches === model.cardTypes.length;


// Next action predicate, derives whether
// the system is in a (control) state where
// a new (next) action needs to be invoked
state.nextAction = (model) => {
    if (state.noMatch(model)) {
        state.processingMatch = true;
        setTimeout(function () {
            actions.noMatch({noMatch: true}, model.present);
            state.processingMatch = false;
        }, 600);
    }

    if (state.won(model)) {
        actions.won({}, model.present);
    }

};

state.render = (model) => {
    state.representation(model);
    state.nextAction(model);
};
