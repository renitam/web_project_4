class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._groupID = options.groupID
    this._authToken = options.authToken
  }

  // 1 Load user info from server
  getProfileInfo() {
    const data = fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => res.json())

    return data
  }

  // 2 Load cards from server
  getInitialCards() {
    const data = fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => res.json())

    return data
  }

  // 3 Edit profile info
  saveProfile({ name, about }) {
    const data = fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
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

    return data
  }

    // 9 Update profile pic in server
    saveAvatar(link) {
      const data = fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: link
        })
      })

      return data
    }

  // 4 Add new card to server
  addCard(name, link) {
    const data = fetch(`${this._baseUrl}/${this._groupID}/cards`, {
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

    return data
  }

  // 7 Delete card from server
  trashCard(cardId) {
    const data = fetch(`${this._baseUrl}/${this._groupID}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken
      }
    })

    return data
  }

  // 8A Add like to card
  addLike(cardId) {
    const data = fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json"
      }
    })

    return data
  }

  // 8B Remove like from card
  removeLike(cardId) {
    const data = fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
      }
    })

    return data
  }

}

export default Api