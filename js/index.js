//постоянные редактирование профиля
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const buttonClosePopupElement = document.querySelectorAll('.popup__button-close');
const popupElementProfile = document.querySelector('.popup_profile');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formProfilePopupElement = document.querySelector(".popup__form-profile");
const popupElement = document.querySelector('.popup');

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

//Функция открывания всех попапов
function openPopup(popup) {
  popup.classList.add('popup_open');
}


//Функция закрывания всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_open');
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
    
    openPopup(popupElementProfile);
  
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  if (e.target === buttonClosePopupElement) {
    nameInput.value = 'Жак-Ив Кусто';
    jobInput.value = 'Исследователь океана';

    return;
  }
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

  openPopup(popupElementAdd);
}

//Создание карточек
const createCard = ({name, link}) => {
  const cardElement = tamplateElemenet.content.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
    cardElement.remove();
  });
  
  //Попап картинка
    popupElementURL.src = link;
    popupElementDescription.alt = name;
    popupElementName.textContent = name;
   
    cardElementImage.addEventListener('click', () => {
    openPopup(popupImage);
   })
   return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  cardElements.prepend(cardElement);
 
})

//Функция отправки формы добавления места
function handleAddSubmit(evt) {
  evt.preventDefault();
  const name = addName.value;
  const link = addURL.value;
  const item = {
    name, link
  }

  const cardElement = createCard(item);
  cardElements.prepend(cardElement);

  closePopup(popupElementAdd);
}

//Слушатель клика
buttonOpenPopupProfile.addEventListener('click', openPopupFormProfile);
buttonOpenPopupAdd.addEventListener('click', openPopupAdd);

//Слушатель отправки формы
formProfilePopupElement.addEventListener("submit", handleFormProfileSubmit);
addForm.addEventListener('submit', handleAddSubmit);
 