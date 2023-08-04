export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    enableValidation() {
       this._setEventListeners();
    }

    _setEventListeners() {
        const formFields = this._getFormFields();

        formFields.forEach(field => {
            field.addEventListener('input', () => {
                this._validate(field);
                this._toggleButton(formFields);
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

    
    _toggleButton(popupFields) {
        const popupSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        const hasInvalidInput = popupFields.some(field => {
            return !field.validity.valid;
        });

        if (hasInvalidInput) {
            popupSubmitButton.classList.add(this._settings.inactiveButtonClass);
            popupSubmitButton.setAttribute("disabled", true);
        } else {
            popupSubmitButton.classList.remove(this._settings.inactiveButtonClass);
            popupSubmitButton.removeAttribute("disabled", true);
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
        const formFields = this._getFormFields();

        formFields.forEach(field => {
            this._hideError(field);
        });
    }

    resetForm() {
        this.clearFormErrors();
        this._formElement.reset();
        this._toggleButton(this._getFormFields());
    }

    _getFormFields() {
        return Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    }
}