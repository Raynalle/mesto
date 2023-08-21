/**
 * Создайте класс Popup
 * Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
 * Принимает в конструктор единственный параметр — селектор попапа.
 * Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
 * Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
 * Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
 * Модальное окно также закрывается при клике на затемнённую область вокруг формы.
 */
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
            this.close(evt.target);
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