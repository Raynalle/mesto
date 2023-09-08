import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);

        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form-profile');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
        this._buttonSubmit = this._form.querySelector('.popup__button-submit');
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
            this._toggleButtonSubmitText();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    _toggleButtonSubmitText(isLoading = true) {
        if (isLoading) {
            this._buttonSubmit.textContent = 'Сохранение...';
        } else {
            this._buttonSubmit.textContent = 'Сохранить';
        }
    }

    close() {
        super.close();

        this._form.reset();
        this._toggleButtonSubmitText(false);
    }
}