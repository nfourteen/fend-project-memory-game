/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

export class Modal {
    constructor() {
        this.body = document.body;
        this.init();
        this.afterSetContents = function () {};
    }

    init() {
        const div = document.createElement('div');
        div.className = 'modal';

        const modalContentTemplate = `
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                    </div>
        `;
        const modalDiv = this.body.appendChild(div);
        modalDiv.innerHTML = modalContentTemplate;

        this.elem = document.querySelector(".modal");
        this.closeButton = document.querySelector(".close-button");
        this.closeButton.addEventListener("click", this.toggleModal.bind(this));
        window.addEventListener("click", this.windowOnClick.bind(this));
    }

    toggleModal() {
        this.elem.classList.toggle('open-modal');
    }

    windowOnClick(event) {
        if (event.target === this.elem) {
            this.toggleModal();
        }
    }

    setContents(html) {
        this.clearContents();
        this.elem.firstElementChild.insertAdjacentHTML('beforeend', html);
        if (this.afterSetContents && typeof this.afterSetContents === 'function') {
            this.afterSetContents();
        }
    }

    clearContents() {
        const _this = this;
        const modalContentChildren = this.elem.firstElementChild.childNodes; // modal-content div
        modalContentChildren.forEach(function (child) {
            // don't remove close-button
            if (child.nodeType === Node.ELEMENT_NODE && !child.valueOf().isEqualNode(_this.closeButton)) {
                _this.elem.firstElementChild.removeChild(child);
            }
        });
    }
}
