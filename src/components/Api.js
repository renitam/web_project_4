class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._groupID = options.groupID
    this._authToken = options.authToken
  }

  // 1 Load user info from server
  getProfileInfo() {
    const info = fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._authToken
      }
    })
    .then(res => res.json())

    return info
  }

  // 2 Load cards from server
  getCards(render) {
    fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => res.json())
      .then(cards => {
        // console.log(cards)
        cards.forEach(card => {
          render(card)
        })
      })
  }

  // 3 Edit profile info
  saveProfileInfo(name, about) {
    fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(console.log("Profile data saved."))
    .catch(console.log("Error: please try saving your profile data again."))
  }

  // 4 Add new card to server
  addCard(name, link) {
    fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  // 7 Delete card from server
  trashCard(cardId) {
    fetch(`${this._baseUrl}/${this._groupID}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken
      }
    })
  }

  // 8A Add like to card
  addLike(cardId) {
    fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        about: this._about,
        avatar: this._avatar,
        cohort: this._groupID,
        name: this._name,
        _id: this._id
      })
    })
    .then(console.log("Profile data saved."))
    .catch(console.log("Error: please try liking the card again."))
  }

  // 8B Remove like from card
  removeLike(cardId) {
    fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        about: this._about,
        avatar: this._avatar,
        cohort: this._groupID,
        name: this._name,
        _id: this._id
      })
    })
    .then(console.log("Profile data saved."))
    .catch(console.log("Error: please try unliking the card again."))
  }

  // 9 Update profile pic in server
  updateProfilePic(link) {
    fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(console.log("Profile pic updated."))
      .catch(console.log("Error: profile pic update request failed. Please try again."))
  }

}

export default Api