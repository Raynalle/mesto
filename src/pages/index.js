import './index.css?ver=124';

import { initialCards } from '../components/initialCards';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {buttonOpenPopupProfile, nameInput, jobInput, formProfilePopupElement, buttonOpenPopupAdd, addForm,
    templateElement, popupElementURL, popupElementDescription, validationSettings} from '../utils/constants.js';

// СТАРТ: инициализация валидации
const addFormValidator = new FormValidator(validationSettings, addForm)
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationSettings, formProfilePopupElement)
editFormValidator.enableValidation();
// КОНЕЦ: инициализация валидации

// СТАРТ: инициализация секции карточек
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const handleOpenPopupImage = (name, link) => {
    popupWithImage.open(name, link);
}

const data = {
    items: initialCards,
    renderer: (cardItem) => addCard(cardItem),
}


const section = new Section(data, '.elements');
section.renderItems();
// КОНЕЦ: инициализация секции карточек

// СТАРТ: добавление места
const popupAddCardForm = new PopupWithForm('.popup_add', handleAddFormSubmit);
popupAddCardForm.setEventListeners();
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);

function handleAddFormSubmit({name, link}) {
    const cardItem = {
        name,
        link,
        popupElementURL,
        popupElementDescription
    }

    addCard(cardItem);
    popupAddCardForm.close();
}

function addCard(cardItem) {
    const card = new Card(cardItem, templateElement, handleOpenPopupImage);

    return section.addItem(card.createCard());
}

function handleOpenPopupAdd() {
    buttonOpenPopupProfile.blur();

    addFormValidator.resetValidation();
    popupAddCardForm.open();
}
// КОНЕЦ: добавление места

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

    editFormValidator.resetValidation();
    popupEditProfileForm.open();
}
// КОНЕЦ: редактирование профиля