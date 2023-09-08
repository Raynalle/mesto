import './index.css?ver=124';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {buttonOpenPopupProfile, nameInput, jobInput, formProfilePopupElement, buttonOpenPopupAdd, addForm,
    templateElement, validationSettings, buttonOpenPopupAvatar, avatarFormElement, profileAvatarImg} from '../utils/constants.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

function errorHandler(err) {
    console.log('Ошибка: ', err)
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-74',
    headers: {
        authorization: 'bec386f2-d8fc-48c8-ac45-b8b1040f29ac',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar',
});

api.getUserInfo().then((result) => userInfo.setUserInfo(result)).catch(errorHandler);

const PopupConfirm = new PopupWithConfirm('.popup_confirm', (card) => {
    api.removeCard(card.id)
        .then(() => {
            card.removeCard();
            PopupConfirm.close();
        }).catch(errorHandler);
})

// СТАРТ: инициализация валидации
const addFormValidator = new FormValidator(validationSettings, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationSettings, formProfilePopupElement);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationSettings, avatarFormElement);
avatarFormValidator.enableValidation();
// КОНЕЦ: инициализация валидации

// СТАРТ: инициализация секции карточек
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const handleOpenPopupImage = (name, link) => {
    popupWithImage.open(name, link);
}

const section = new Section('.elements', (data) => addCard(data));

api.getCards().then((result) => {
    section.renderItems(result);
}).catch(errorHandler);

// КОНЕЦ: инициализация секции карточек

// СТАРТ: добавление карточки
const popupAddCardForm = new PopupWithForm('.popup_add', handleAddFormSubmit);
popupAddCardForm.setEventListeners();
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);

function handleAddFormSubmit({name, link}) {
    api.createCard({name, link})
        .then((result) => {
            addCard(result);
            popupAddCardForm.close();
        }).catch(errorHandler);
}

function addCard(cardItem) {
    const card = new Card(
        cardItem,
        userInfo.getUserInfo().id,
        templateElement,
        handleOpenPopupImage,
        () => PopupConfirm.open(card),
        () => {
            if (card.isLiked()) {
                api.removeLike(card.id)
                .then((result) => card.setLikes(result.likes)).catch(errorHandler);
            } else {
                api.addLike(card.id)
                .then((result) => card.setLikes(result.likes)).catch(errorHandler);
            }
        },
    );

    return section.addItem(card.createCard());
}

function handleOpenPopupAdd() {
    buttonOpenPopupProfile.blur();

    addFormValidator.resetValidation();
    popupAddCardForm.open();
}
// КОНЕЦ: добавление карточки

// СТАРТ: редактирование профиля
const popupEditProfileForm = new PopupWithForm('.popup_profile', handleEditFormSubmit);
popupEditProfileForm.setEventListeners();
buttonOpenPopupProfile.addEventListener('click', handleOpenPopupEdit);

function handleEditFormSubmit({name, description}) {
    const info = {
        name,
        about: description,
    };

    api.setUserInfo(info).then((result) => userInfo.setUserInfo(result)).catch(errorHandler);
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

const popupEditAvatarProfileForm = new PopupWithForm('.popup_editAvatar', handleUpdateAvatar);
popupEditAvatarProfileForm.setEventListeners();
buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar);
function handleOpenPopupAvatar() {
    buttonOpenPopupAvatar.blur();

    avatarFormValidator.resetValidation();
    popupEditAvatarProfileForm.open();
}

function handleUpdateAvatar ({avatar}) {
    api.updateAvatar(avatar)
        .then((result) => {
            profileAvatarImg.src = result.avatar;
            popupEditAvatarProfileForm.close();
        }).catch(errorHandler);
}
// КОНЕЦ: редактирование профиля

PopupConfirm.setEventListeners();