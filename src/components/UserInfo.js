/**
 * Создайте класс UserInfo
 * Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
 * Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
 */

export default class UserInfo {
    constructor(info) {
        this._name = document.querySelector(info.name);
        this._about = document.querySelector(info.about);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
        }
    }

    setUserInfo(info) {
        this._name.textContent = info.name;
        this._about.textContent = info.about;
    }
}