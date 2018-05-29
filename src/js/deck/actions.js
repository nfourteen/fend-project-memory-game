/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */


export let actions = {};

actions.init = (present) => {
    actions.present = present;
};

// Intents enable a further decoupling between
// the view components and the actions
actions.intents = {
    cardClicked: 'actions.cardClicked',
    restartClicked: 'actions.restartClicked',
};

actions.cardClicked = (data, present) => {
    present = present || actions.present;
    data = { id: data.id };
    // next step of the reactive loop: present values to the model
    present(data);
};

actions.restartClicked = (data, present) => {
    present = present || actions.present;
    let confirm = window.confirm('Are you sure you want to start a new game?');
    if (confirm) {
        data = {refresh: true};
        present(data);
    }
};

actions.noMatch = (data, present) => {
    present = present || actions.present;
    // next step of the reactive loop: present values to the model
    present(data);
};

actions.won = (data, present) => {
    window.alert('You\'ve won!');
};



