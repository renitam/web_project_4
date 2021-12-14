import Api from "./Api"

class UserInfo {
  constructor({ nameSelector, careerSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._careerElement = document.querySelector(careerSelector)
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      career: this._careerElement.textContent
    }
  }

  setUserInfo({ name, career, avatar }) {
    this._nameElement.textContent = name
    this._careerElement.textContent = career
    this._avatarElement.src = avatar
    console.log(this._avatarElement)
  }
}

export default UserInfo