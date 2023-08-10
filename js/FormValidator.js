export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._formFields = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
		this._popupSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    enableValidation() {
       this._setEventListeners();
    }

    _setEventListeners() {
        this._formFields.forEach(field => {
            field.addEventListener('input', () => {
                this._validate(field);
                this._toggleButton(this._formFields);
            });
        });
    }

    _validate(field) {
        if (field.validity.valid) {
            this._hideError(field);
        } else {
            this._showError(field);
        }
    }

    
    _toggleButton() {
        const hasInvalidInput = this._formFields.some(field => {
            return !field.validity.valid;
        });

        if (hasInvalidInput) {
            this._popupSubmitButton.classList.add(this._settings.inactiveButtonClass);
            this._popupSubmitButton.setAttribute("disabled", true);
        } else {
            this._popupSubmitButton.classList.remove(this._settings.inactiveButtonClass);
            this._popupSubmitButton.removeAttribute("disabled", true);
        }
    }

    _hideError(field) {
        const errorElement = this._formElement.querySelector((`.${field.id}-error`));

        field.classList.remove(this._settings.inputInvalidClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._settings.errorClass);
    }

    _showError(field) {
        const errorElement = this._formElement.querySelector((`.${field.id}-error`));

        field.classList.add(this._settings.inputInvalidClass);
        errorElement.textContent = field.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    clearFormErrors() {
        this._formFields.forEach(field => {
            this._hideError(field);
        });
    }

    resetForm() {
        this.clearFormErrors();
        this._formElement.reset();
        this._toggleButton(this._formFields);
    }
}