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
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    
    
}

function togglePopup () {
popupElement.classList.toggle('popup_open');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    togglePopup();
}




editButtonElement.addEventListener('click', togglePopup);
closeButtonElement.addEventListener('click', togglePopup);

formElement.addEventListener("submit", handleFormSubmit, togglePopup);