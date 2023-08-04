export default class Card {
    constructor(object, templateElement, handleOpenPopup) {
        this._name = object.name;
        this._link = object.link;
        this._template = templateElement;
        this._popupElementURL = object.popupElementURL;
        this._popupElementDescription = object.popupElementDescription;
        this._popupElementName = object.popupElementName;
        this._handleOpenPopup = handleOpenPopup;
    }

    createCard() {
        const cardElement = this._template.content.querySelector('.element').cloneNode(true);
        const cardElementImage = cardElement.querySelector('.element__image');

        cardElementImage.src = this._link;
        cardElementImage.alt = this._name;
        cardElement.querySelector('.element__title').textContent = this._name;

        this._onLikeButtonClick(cardElement);
        this._onTrashButtonClick(cardElement);
        this._onImgClick(cardElementImage);

        return cardElement;
    }

    _onLikeButtonClick(cardElement) {
        cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        });
    }

    _onTrashButtonClick(cardElement) {
        cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
            cardElement.remove();
        });
    }

    _onImgClick(cardElementImage) {
        cardElementImage.addEventListener('click', () => {
            this._popupElementURL.src = this._link;
            this._popupElementDescription.alt = this._name;
            this._popupElementName.textContent = this._name;
    
            this._handleOpenPopup();
        })
    }
}