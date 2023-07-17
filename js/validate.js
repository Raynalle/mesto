const classValidation = {
    formSelector: '.popup__form-profile',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_noactive',
    errorClass: 'popup__input-error_visible',
    inputInvalidClass: 'invalid',
    buttonAdd: 'profile__button-add',
};

/**
 * Показ ошибки
 *
 * @param popupElement Модальное окно
 * @param field Поле
 */
const showError = (popupElement, field) => {
    const errorElement = popupElement.querySelector((`.${field.id}-error`));

    field.classList.add(classValidation.inputInvalidClass);
    errorElement.textContent = field.validationMessage;
    errorElement.classList.add(classValidation.errorClass);
};

/**
 * Скрытие ошибки
 *
 * @param popupElement Модальное окно
 * @param field Поле
 */
const hideError = (popupElement, field) => {
    const errorElement = popupElement.querySelector((`.${field.id}-error`));

    field.classList.remove(classValidation.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(classValidation.errorClass);
};

/**
 * Проверка поля на корректность
 *
 * @param popupElement Модальное окно
 * @param field Поле
 */
const validate = (popupElement, field) => {
    if (event.target.className.includes(classValidation.buttonAdd) || field.validity.valid) {
        hideError(popupElement, field);
        return true;
    }

    showError(popupElement, field);
}

/**
 * Переключение активности кнопки действия
 *
 * @param popupElement Модальное окно
 * @param popupFields Поля модального окна
 */
const toggleButton = (popupElement, popupFields) => {
    const popupSubmitButton = popupElement.querySelector(classValidation.submitButtonSelector);
    const hasInvalidInput = popupFields.some(field => {
        return !field.validity.valid;
    });

    if (hasInvalidInput) {
        popupSubmitButton.classList.add(classValidation.inactiveButtonClass);
        popupSubmitButton.setAttribute("disabled", true);
    } else {
        popupSubmitButton.classList.remove(classValidation.inactiveButtonClass);
        popupSubmitButton.removeAttribute("disabled", true);
    }
}

/**
 * Добавление слушателей
 *
 * @param popupElement Модальное окно
 * @param needInitListeners Параметр необходимости добавления слушателей
 */
const setEventListeners = (popupElement, needInitListeners) => {
    const popupFields = Array.from(popupElement.querySelectorAll(classValidation.inputSelector));

    popupFields.forEach(field => {
        if (needInitListeners) {
            field.addEventListener('input', function () {
                validate(popupElement, field);
                toggleButton(popupElement, popupFields);
            });
        } else {
            validate(popupElement, field);
            toggleButton(popupElement, popupFields);
        }
    });
};

/**
 * Включает валидацию
 *
 * @param needInitListeners Параметр необходимости добавления слушателей
 */
const enableValidation = (needInitListeners = true) => {
    const formList = Array.from(document.querySelectorAll(classValidation.formSelector));

    formList.forEach(popupFormElement => {
        setEventListeners(popupFormElement, needInitListeners);
    });
};

enableValidation();