class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._groupID = options.groupID
    this._authToken = options.authToken
  }

  // 1 Load user info from server
  getProfileInfo() {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  // 2 Load cards from server
  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
      })
  }

  // 3 Edit profile info
  saveProfile({ name, about }) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
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
  }

    // 9 Update profile pic in server
    saveAvatar(link) {
      return fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: link
        })
      })
    }

  // 4 Add new card to server
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
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
    return fetch(`${this._baseUrl}/${this._groupID}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken
      }
    })
  }

  // 8A Add like to card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      }
    })
  }

  // 8B Remove like from card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      }
    })
  }

}

export default Api