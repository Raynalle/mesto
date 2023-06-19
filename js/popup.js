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