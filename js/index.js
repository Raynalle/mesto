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



function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

buttonClosePopupElement.forEach(bttn => {
  const popup = bttn.closest('.popup');
  bttn.addEventListener('click', () => closePopup(popup));
});

console.log(buttonClosePopupElement);


function openPopupForm(e) {
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



function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    closePopup(popupElementProfile);
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}




buttonOpenPopupProfile.addEventListener('click', openPopupForm);

formProfilePopupElement.addEventListener("submit", handleFormProfileSubmit);

//Попап добавления и создание карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupElementAdd = document.querySelector('.popup_add');
const addForm = popupElementAdd.querySelector('.popup__form-profile');
const addName = popupElementAdd.querySelector('#name-photo');
const addURL = popupElementAdd.querySelector('#link-photo');




function openPopupAdd(e) {
  e.preventDefault();
  e.stopPropagation();

  buttonOpenPopupProfile.blur();
  
  addName.value = '';
  addURL.value = '';

  openPopup(popupElementAdd);
}




const cardElements = document.querySelector('.elements');
const tamplateElemenet = document.querySelector('.tamplate');
const popupImage = document.querySelector('.popup_image');

const createCard = ({name, link}) => {
  const cardElement = tamplateElemenet.content.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.querySelector('.element__flex');
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
    cardElement.remove();
  });
  
  //Попап картинка
    const popupElementURL = popupImage.querySelector('.popup__image').src = link;
    const popupElementDescription = popupImage.querySelector('.popup__image').alt = name;
    const popupElementName = popupImage.querySelector('.popup__subtitle').textContent = name;
   
    cardElementImage.addEventListener('click', () => {
    openPopup(popupImage);
   })
   return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  cardElements.prepend(cardElement);
 
})

function handleAddSubmit(evt) {
  evt.preventDefault();
  const name = addName.value;
  const link = addURL.value;
  const item = {
    name, link
  }

  const cardElement = createCard(item);
  cardElements.prepend(cardElement);

  closePopup(popupImage);
}

buttonOpenPopupAdd.addEventListener('click', openPopupAdd);

addForm.addEventListener('submit', handleAddSubmit);
 