export default class Card {
    constructor(object, templateElement, handleImageClick, ) {
        this._name = object.name;
        this._link = object.link;
        this._template = templateElement;
        this._handleImageClick = handleImageClick;
    }

    createCard() {
        this._cardElement = this._template.content.querySelector('.element').cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector('.element__image');
        this._buttonLike = this._cardElement.querySelector('.element__like');
        this._buttonTrash = this._cardElement.querySelector('.element__trash');

        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;

        //this._onImgClick(this._cardElementImage);

        this._setEventListeners();

        return this._cardElement;
    }

    _onLikeButtonClick(_) {
        this._buttonLike.classList.toggle("element__like_active");
    }

    _onTrashButtonClick() {
        this._cardElement.remove();
    }

    _onImgClick(_cardElementImage) {
        this._handleImageClick(this._name, this._link);
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._onLikeButtonClick());
        this._cardElementImage.addEventListener('click', () => this._onImgClick());
        this._buttonTrash.addEventListener('click', () => this._onTrashButtonClick());
     } 
}