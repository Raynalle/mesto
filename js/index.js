import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//постоянные редактирование профиля
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const buttonClosePopupElement = document.querySelectorAll('.popup__button-close');
const popupElementProfile = document.querySelector('.popup_profile');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formProfilePopupElement = document.querySelector(".popup__form-profile");
const popupElement = document.querySelectorAll('.popup');

//Попап добавления и создание карточек
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupElementAdd = document.querySelector('.popup_add');
const addForm = popupElementAdd.querySelector('.popup__form-profile');
const addName = popupElementAdd.querySelector('#name-photo');
const addURL = popupElementAdd.querySelector('#link-photo');

//Постоянные карточек
const cardElements = document.querySelector('.elements');
const tamplateElemenet = document.querySelector('.tamplate');
const popupImage = document.querySelector('.popup_image');
const popupElementURL = popupImage.querySelector('.popup__image');
const popupElementDescription = popupImage.querySelector('.popup__image');
const popupElementName = popupImage.querySelector('.popup__subtitle');

const validationSettings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_noactive',
    errorClass: 'popup__input-error_visible',
    inputInvalidClass: 'invalid',
};


const addFormValidator = new FormValidator(validationSettings, addForm)
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationSettings, formProfilePopupElement)
editFormValidator.enableValidation();


//Функция открывания всех попапов
function openPopup(popup) {
    popup.classList.add('popup_open');

    document.addEventListener('keydown', closePopupByEsc);
}


//Функция закрывания всех попапов
function closePopup(popup) {
    popup.classList.remove('popup_open');

    document.removeEventListener('keydown', closePopupByEsc);
}


//Перебор всех кнопок закрытия и поиск ближайжего к ней родителя
buttonClosePopupElement.forEach(bttn => {
    const popup = bttn.closest('.popup');
    bttn.addEventListener('click', () => closePopup(popup));
});


//Функция открытия формы профиля
function openPopupFormProfile(e) {
    e.preventDefault();
    e.stopPropagation();

    buttonOpenPopupProfile.blur();

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    openPopup(popupElementProfile);
}

//Функция отправки формы профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupElementProfile);
}

//Функция открытия попапа добавления места
function openPopupAdd(e) {
    e.preventDefault();
    e.stopPropagation();

    buttonOpenPopupProfile.blur();

    addName.value = '';
    addURL.value = '';

    const popupElementAddFields = [addName, addURL];

    addFormValidator.resetForm();
    openPopup(popupElementAdd);
}

initialCards.forEach((item) => {
    const cardData = {
        ...item,
        popupElementURL,
        popupElementDescription,
        popupElementName
    };
    const cardElement = new Card(cardData, tamplateElemenet, () => openPopup(popupImage));
    cardElements.prepend(cardElement.createCard());

})

//Функция отправки формы добавления места
function handleAddSubmit(evt) {
    evt.preventDefault();
    const name = addName.value;
    const link = addURL.value;
    const item = {
        name,
        link
    }

    const cardElement = createCard(item);
    cardElements.prepend(cardElement);

    closePopup(popupElementAdd);
}


//закрытие попапов по клику на оверлэй
function closeOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target);
    }
};

//Закрытие попапов по эскэйпу
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_open');
        closePopup(activePopup);
    };
};

popupElement.forEach(popup => popup.addEventListener('click', closeOverlay));

//Слушатель клика
buttonOpenPopupProfile.addEventListener('click', openPopupFormProfile);
buttonOpenPopupAdd.addEventListener('click', openPopupAdd);

//Слушатель отправки формы
formProfilePopupElement.addEventListener("submit", handleFormProfileSubmit);
addForm.addEventListener('submit', handleAddSubmit);