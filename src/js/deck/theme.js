/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

//////////////////////////////////////////////////////////////////////
// Theme
//
// A theme is a series of View components, each component is a mini
// code generator that generates HTML fragments from properties of
// the model following the expression:
// C = f(M.part)

export var theme = {};

theme.scorePanel = (score, numMoves, intents) => {
    let componentHtml = '';
    componentHtml += theme.stars(score);
    componentHtml += theme.moves(numMoves);
    componentHtml += theme.restart(intents);
    return componentHtml;
};

theme.stars = (score) => {
    return `
        <ul id="stars" class="stars">
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
        </ul>`;
};

theme.moves = (numMoves) => {
    return `<span class="moves"><span class="numMoves">${numMoves}</span> Moves</span>`;
};

theme.restart = (intents) => {
    return `
        <div id="restart" class="restart" onclick="return ${intents['restartClicked']}({});">
            <i class="fa fa-repeat"></i>
        </div>`;
};

theme.list = (cards, intents) => {

    return cards.map(function(card){
        let cssClass = '';

        if (card.isSelected) {
            cssClass += 'open show';
        }
        if (card.isMatched) {
            cssClass += 'match';
        }
        return `
             <li class="card ${cssClass}" onclick="return ${intents['cardClicked']}({'id':'${card.id}'});">
                 <i class="fa ${card.name}"></i>
              </li>`;
    }).join('');
};

