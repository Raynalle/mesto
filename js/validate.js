const classValidation = {
    formSelector: '.popup__form-profile',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_noactive',
    errorClass: 'popup__input-error_visible',
    inputInvalidClass: 'invalid',
};

/**
 * Показ ошибки
 *
 * @param popupElement Модальное окно
 * @param field Поле
 */
const showError = (popupElement, field, validationParams) => {
    const errorElement = popupElement.querySelector((`.${field.id}-error`));

    field.classList.add(validationParams.inputInvalidClass);
    errorElement.textContent = field.validationMessage;
    errorElement.classList.add(validationParams.errorClass);
};

/**
 * Скрытие ошибки
 *
 * @param popupElement Модальное окно
 * @param field Поле
 */
const hideError = (popupElement, field, validationParams) => {
    const errorElement = popupElement.querySelector((`.${field.id}-error`));

    field.classList.remove(validationParams.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationParams.errorClass);
};

/**
 * Проверка поля на корректность
 *
 * @param popupElement Модальное окно
 * @param field Поле
 * @param validationParams Конфигурация валидации
 */
const validate = (popupElement, field, validationParams) => {
    if (field.validity.valid) {
        hideError(popupElement, field, validationParams);
        return true;
    }

    showError(popupElement, field, validationParams);
}

/**
 * Переключение активности кнопки действия
 *
 * @param popupElement Модальное окно
 * @param popupFields Поля модального окна
 * @param validationParams Конфигурация валидации
 */
const toggleButton = (popupElement, popupFields, validationParams) => {
    const popupSubmitButton = popupElement.querySelector(validationParams.submitButtonSelector);
    const hasInvalidInput = popupFields.some(field => {
        return !field.validity.valid;
    });

    if (hasInvalidInput) {
        popupSubmitButton.classList.add(validationParams.inactiveButtonClass);
        popupSubmitButton.setAttribute("disabled", true);
    } else {
        popupSubmitButton.classList.remove(validationParams.inactiveButtonClass);
        popupSubmitButton.removeAttribute("disabled", true);
    }
}

/**
 * Добавление слушателей
 *
 * @param popupElement Модальное окно
 * @param validationParams Конфигурация валидации
 */
const setEventListeners = (popupElement, validationParams) => {
    const popupFields = Array.from(popupElement.querySelectorAll(validationParams.inputSelector));

    popupFields.forEach(field => {
        field.addEventListener('input', function () {
            validate(popupElement, field, validationParams);
            toggleButton(popupElement, popupFields, validationParams);
        });
    });
};

/**
 * Включает валидацию
 *
 * @param validationParams Конфигурация валидации
 */
const enableValidation = (validationParams) => {
    const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

    formList.forEach(popupFormElement => {
        setEventListeners(popupFormElement, validationParams);
    });
};

enableValidation(classValidation);