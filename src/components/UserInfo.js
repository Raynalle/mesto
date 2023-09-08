export default class UserInfo {
    constructor(info) {
        this._name = document.querySelector(info.name);
        this._about = document.querySelector(info.about);
        this._avatar = document.querySelector(info.avatar);
    }

    getUserInfo() {
        return {
            id: this.id,
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src,
        }
    }

    setUserInfo(info) {
        this.id = info._id;
        this._name.textContent = info.name;
        this._about.textContent = info.about;
        this._avatar.src = info.avatar;
    }
}