function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    editButtonElement.blur();

    popupElement.classList.toggle('popup_open');
    
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    popupElement.classList.toggle('popup_open');
}

const editButtonElement = document.querySelector('.profile__button-edit');
const closeButtonElement = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');


editButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formElement = document.querySelector(".popup__form-profile");

let likeElement = document.querySelector('.element__like');
function likeActive() {
    likeElement.classList.toggle('element__like_active');
}

likeElement.addEventListener('click', likeActive);

formElement.addEventListener("submit", handleFormSubmit);