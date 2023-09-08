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

const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-container');
const profileAvatarImg = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_editAvatar');
const avatarFormElement = popupAvatar.querySelector('.popup__form-profile');

const validationSettings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_noactive',
    errorClass: 'popup__input-error_visible',
    inputInvalidClass: 'invalid',
};

export {buttonOpenPopupProfile, nameInput, jobInput, formProfilePopupElement, buttonOpenPopupAdd, addForm, addName, addURL,
    templateElement, popupElementURL, popupElementDescription, popupElementName, validationSettings, buttonOpenPopupAvatar, avatarFormElement, profileAvatarImg}