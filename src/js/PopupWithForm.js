import Popup from "./Popup.js";

/**
 * Создайте класс PopupWithForm
 * Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
 * Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 * Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
 * Перезаписывает родительский метод setEventListeners.
 * Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
 * Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
 * Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
 */

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);

        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form-profile');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach(input => values[input.name] = input.value);

        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();

        this._form.reset();
    }
}