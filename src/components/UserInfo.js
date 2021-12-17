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

  setUserInfo({ name = this._nameElement.textContent, about = this._aboutElement.textContent }) {
    if (name) {
      this._nameElement.textContent = name
    }

    if (about) {
      this._aboutElement.textContent = about
    }
  }

  setAvatar({ link = this._avatarElement.src }) {
    if (link) {
      this._avatarElement.src = link
    }
  }

  saveUserData(data) {
    this.userData = data
  }

}

export default UserInfo