class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._aboutElement = document.querySelector(aboutSelector)
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  setUserInfo({ name = this._nameElement.textContent, about = this._aboutElement.textContent, link = this._avatarElement.src, owner}) {
    this._nameElement.textContent = name
    this._aboutElement.textContent = about
    this._avatarElement.src = link
    this.owner = owner
  }
}

export default UserInfo