class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._groupID = options.groupID
    this._authToken = options.authToken
  }

  getInitialCards(render) {
    fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => res.json())
      .then(cards => {
        cards.forEach(card => {
          render(card);
        });
      });
  }

  trashCard() {

  }

  getProfileInfo() {
    fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: authToken
      }
    })
      .then(res => res.json())
      .then((result) => {
        this._id = result._id;
        return result
      })
  }

  saveProfileInfo(name, about) {
    fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(console.log("Profile data saved."))
    .catch(consol.log("Error: please try saving your profile data again."))
  }


}

export default Api