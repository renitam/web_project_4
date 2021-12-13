import Api from "./Api"

class UserInfo {
  constructor({ nameSelector, careerSelector, picSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._careerElement = document.querySelector(careerSelector)
    this._picElement = document.querySelector(picSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      career: this._careerElement.textContent
    }
  }

  setUserInfo({ name, career }) {
    this._nameElement.textContent = name
    this._careerElement.textContent = career
  }
}

export default UserInfo