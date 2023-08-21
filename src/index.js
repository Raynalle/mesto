import './pages/index.css?ver=124';

import { initialCards } from './js/initialCards';
import Card from "./js/Card.js";
import FormValidator from "./js/FormValidator.js";
import Section from './js/Section.js';
import PopupWithImage from './js/PopupWithImage.js';
import PopupWithForm from './js/PopupWithForm.js';
import UserInfo from './js/UserInfo.js';

//постоянные редактирование профиля
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const formProfilePopupElement = document.querySelector(".popup__form-profile");

//Попап добавления и создание карточек
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupElementAdd = document.querySelector('.popup_add');
const addForm = popupElementAdd.querySelector('.popup__form-profile');
const addName = popupElementAdd.querySelector('#name-photo');
const addURL = popupElementAdd.querySelector('#link-photo');

//Постоянные карточек
const templateElement = document.querySelector('.template');
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

// СТАРТ: инициализация валидации
const addFormValidator = new FormValidator(validationSettings, addForm)
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationSettings, formProfilePopupElement)
editFormValidator.enableValidation();
// КОНЕЦ: инициализация валидации

// СТАРТ: инициализация секции карточек
const handleOpenPopupImage = (name, link) => {
    const popupWithImage = new PopupWithImage('.popup_image');

    popupWithImage.setEventListeners();
    popupWithImage.open(name, link);
}

const items = {
    items: initialCards,
    renderer: (item) => {
        const cardData = {
            ...item,
            popupElementURL,
            popupElementDescription,
            popupElementName
        };
        return new Card(cardData, templateElement, handleOpenPopupImage);
    },
}

const section = new Section(items, '.elements');
section.render();
// КОНЕЦ: инициализация секции карточек

// СТАРТ: добавления места
const popupAddCardForm = new PopupWithForm('.popup_add', handleAddFormSubmit);
popupAddCardForm.setEventListeners();
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);

function handleAddFormSubmit({name, link}) {
    const cardData = {
        name,
        link,
        popupElementURL,
        popupElementDescription,
        popupElementName
    }

    const cardElement = new Card(cardData, templateElement, handleOpenPopupImage);
    section.addItem(cardElement.createCard());

    popupAddCardForm.close();
}

function handleOpenPopupAdd() {
    buttonOpenPopupProfile.blur();

    addName.value = '';
    addURL.value = '';

    addFormValidator.resetForm();
    popupAddCardForm.open();
}
// КОНЕЦ: добавления места

// СТАРТ: редактирование профиля
const popupEditProfileForm = new PopupWithForm('.popup_profile', handleEditFormSubmit);
popupEditProfileForm.setEventListeners();
buttonOpenPopupProfile.addEventListener('click', handleOpenPopupEdit);

const userInfo = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
});

function handleEditFormSubmit({name, description}) {
    userInfo.setUserInfo({
        name,
        about: description,
    })
    popupEditProfileForm.close();
}

function handleOpenPopupEdit() {
    buttonOpenPopupProfile.blur();

    const info = userInfo.getUserInfo();

    nameInput.value = info.name;
    jobInput.value = info.about;

    popupEditProfileForm.open();
}
// КОНЕЦ: редактирование профиля