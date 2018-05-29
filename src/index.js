/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import './css/normalize.css';
import './css/app.css';

import { state } from './js/deck/state.js';
import { model } from './js/deck/model.js';
import { actions as a } from './js/deck/actions.js';
import { view } from './js/deck/view.js';


// wire the elements of the SAM pattern
state.init(view);
model.init(state);
a.init(model.present);

// init
state.representation(model);

// make the actions available to the DOM so the action.intents
// map correctly to the elements
window.actions = a;
