import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._image = this._popup.querySelector('.popup__image');
        this._name = this._popup.querySelector('.popup__subtitle');
    }

    open(name, image) {
        super.open()

        this._image.src = image;
        this._image.alt = name;
        this._name.textContent = name;
    }
}