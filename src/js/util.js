/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 *
 * @param array
 * @returns array
 */
export function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Simple Publish/Subscribe pattern class simplified from here:
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
 */
export class PubSub {
    constructor() {
        this.handlers = [];
    }

    subscribe(name, handler) {
        this.handlers.push({name: name, handler: handler.bind(handler)});
    }

    publish(name, data) {
        this.handlers.forEach(subscriber => {
            if (subscriber.name === name) {
                subscriber.handler(data);
            }
        });
    }
}

/**
 * Is some number between a min and max range
 *
 * @param x — the number in question
 * @param min - lowest allowed in range
 * @param max - highest allowed in range
 * @returns {boolean}
 */
export function between(x, min, max) {
    return x >= min && x <= max;
}