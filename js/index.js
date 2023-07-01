const editButtonElement = document.querySelector('.profile__button-edit');
const closeButtonElement = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formElement = document.querySelector(".popup__form-profile");

function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    editButtonElement.blur();
    
    togglePopup();
  
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  if (e.target === closeButtonElement) {
    nameInput.value = 'Жак-Ив Кусто';
    jobInput.value = 'Исследователь океана';

    return;
  }
}

function togglePopup () {
  popupElement.classList.toggle('popup_open');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    togglePopup();
  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}




editButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);

formElement.addEventListener("submit", handleFormSubmit);

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
const addButtonElement = document.querySelector('.profile__button-add');
const popupElementAdd = document.querySelector('.popup_add');
const closePopupAdd = popupElementAdd.querySelector('.popup__button-close');
const addForm = popupElementAdd.querySelector('.popup__form-profile');
const addName = popupElementAdd.querySelector('#name-photo');
const addURL = popupElementAdd.querySelector('#link-photo');




function openPopupAdd(e) {
  e.preventDefault();
  e.stopPropagation();

  editButtonElement.blur();
  
  addName.value = '';
  addURL.value = '';

  togglePopupAdd();
}

function togglePopupAdd() {
  popupElementAdd.classList.toggle('popup_open');
}




const cardElements = document.querySelector('.elements');
const tamplateElemenet = document.querySelector('.tamplate');
const popupImage = document.querySelector('.popup_image');

const createCard = ({name, link}) => {
  const clone = tamplateElemenet.content.cloneNode(true);
  const cardElement = clone.querySelector('.element').cloneNode(true);
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
   cardElementImage.addEventListener('click', () => {
    popupImage.classList.add('popup_open');
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__subtitle').textContent = name;
   })

   const closeButtonPopupImgElement = popupImage.querySelector('.popup__button-close');

   closeButtonPopupImgElement.addEventListener('click', () => {
    popupImage.classList.remove('popup_open');
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

  togglePopupAdd();
}

addButtonElement.addEventListener('click', openPopupAdd);
closePopupAdd.addEventListener('click', openPopupAdd);

addForm.addEventListener('submit', handleAddSubmit);