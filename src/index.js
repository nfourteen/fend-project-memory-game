/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import './css/normalize.css';
import './css/app.css';
import './css/modal.css';

import { PubSub } from './js/util';
import DeckModel from './js/deck/DeckModel';
import DeckController from './js/deck/DeckController';
import GameView from './js/GameView';
import ScorePanelModel from './js/score-panel/ScorePanelModel';
import ScorePanelController from './js/score-panel/ScorePanelController';

const appEvents = new PubSub();
const gameView = new GameView();

const deckModel = new DeckModel();
const deckCtrl = new DeckController(gameView, deckModel, appEvents);
deckCtrl.init();

const scorePanelModel = new ScorePanelModel();
const scorePanelCtrl = new ScorePanelController(gameView, scorePanelModel, appEvents);
scorePanelCtrl.init();

