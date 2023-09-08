export default class Card {
    constructor(data, userId, templateElement, handleImageClick, handleRemoveCard, handleLike) {
        this._name = data.name;
        this._link = data.link;
        this.id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this.likes = data.likes;
        this._template = templateElement;
        this._handleImageClick = handleImageClick;
        this._handleRemoveCard = handleRemoveCard;
        this._handleLike = handleLike;
    }

    createCard() {
        this._cardElement = this._template.content.querySelector('.element').cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector('.element__image');
        this._buttonLike = this._cardElement.querySelector('.element__like');
        this._buttonTrash = this._cardElement.querySelector('.element__trash');
        this._likesCounter = this._cardElement.querySelector('.element__like-counter');

        if (this._ownerId !== this._userId) {
            this._buttonTrash.remove();
        }

        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;

        this.setLikes(this.likes);
        this._setEventListeners();

        return this._cardElement;
    }

    removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _onImgClick(_cardElementImage) {
        this._handleImageClick(this._name, this._link);
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLike(this.id));
        this._cardElementImage.addEventListener('click', () => this._onImgClick());
        if (this._ownerId === this._userId) {
            this._buttonTrash.addEventListener('click', () => this._handleRemoveCard(this.id));
        }
     }

     isLiked() {
        return this.likes.find(user => user._id === this._userId);
     }

     setLikes(likes) {
        this.likes = likes;

        if (this.isLiked()) {
            this._buttonLike.classList.add("element__like_active");
        } else {
            this._buttonLike.classList.remove("element__like_active");
        }

        this._likesCounter.textContent  = likes.length;
     }
}