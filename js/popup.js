function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    editButtonElement.blur();

    if(e.target === e.currentTarget) {
        popupElement.classList.toggle('popup_open');
        nameInput.value = nameInputValue;
        jobInput.value = jobInputValue;
    }
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    nameInputValue = nameInput.value;
    jobInputValue = jobInput.value;
}

let nameInputValue = 'Жак-Ив Кусто';
let jobInputValue = 'Исследователь океана';

const editButtonElement = document.querySelector('.profile__button_edit');
const closeButtonElement = document.querySelector('.popup__button_close');
const popupElement = document.querySelector('.popup');
const popupBackgroundElement = document.querySelector('.popup__background');

editButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);
popupBackgroundElement.addEventListener('click', handleClick);

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formElement = document.querySelector("form");

formElement.addEventListener("submit", handleFormSubmit);