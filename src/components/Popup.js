export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._buttonClose = this._popup.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_open');

        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_open');

        document.removeEventListener('keydown', this._handleEscClose);
    }

    _closePopupOnOverlay(evt) {
        if (evt.currentTarget === evt.target) {
            this.close();
        }
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this._closePopupOnOverlay(evt));
    }
}