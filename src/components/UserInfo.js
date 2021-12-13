class UserInfo {
  constructor({ nameSelector, careerSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._careerElement = document.querySelector(careerSelector)
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