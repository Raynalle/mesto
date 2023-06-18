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
    
    nameProfile.value = nameInput.textContent;
    jobProfile.value = jobInput.textContent;

    popupElement.classList.toggle('popup_open');
    
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    popupElement.classList.remove('popup_open');
}




editButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);

formElement.addEventListener("submit", handleFormSubmit);