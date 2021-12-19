class Card {
  constructor(data, templateSel, myData, api, modalPreview, modalTrash) {
    this._templateSel = templateSel
    this._userData = myData
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._owner = data.owner
    this._id = data._id

    this._card = this._getTemplate()
    this._trashButton = this._card.querySelector(".card__trash")
    this._likeButton = this._card.querySelector(".card__like")
    this._likeNumber = this._card.querySelector(".card__like-num")

    this._api = api
    this._preview = modalPreview
    this._trash = modalTrash
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSel)
      .content.querySelector(".card")
      .cloneNode(true)
  }

  _processLike(card) {
    this._likes = card.likes
    this._likeButton.classList.toggle("card__like_active")
    this._likeNumber.textContent = card.likes.length
  }

  _handleLike() {
    if (this._likeButton.classList.contains("card__like_active")) {
      this._api.removeLike(this._id)
          .then(res => this._processLike(res))
          .catch(err => `Could not load like: ${err}`)
    } else {
      this._api.addLike(this._id)
          .then(res => this._processLike(res))
          .catch(err => `Could not load like: ${err}`)
    }
  }

  _handleTrash() {
    this._trash.open(this._card, this._id)
  }

  _handlePreview() {
    // Pull preview modal elements from utils.js constant exports
    this._preview.open(this._link, this._name)
  }

  _setEventListeners() {
    // Make _card like buttons clickable & save like
    this._likeButton
      .addEventListener("click", () => {
        this._handleLike()
      })

    // Make trash cans clickable and remove card
    if (this._trashButton) {
      this._trashButton
        .addEventListener("click", () => {
          this._handleTrash()
        })
    }

    // Make images clickable and view image preview
    this._cardImgEl
      .addEventListener("click", () => {
        this._handlePreview()
      })
  }

  createCard() {
    // Set title to name input
    this._cardTitleEl = this._card.querySelector(".card__title")
    this._cardTitleEl.textContent = this._name

    // Set image to link input
    this._cardImgEl = this._card.querySelector(".card__image")
    this._cardImgEl.src = this._link
    this._cardImgEl.alt = `Image of ${this._name}`

    this._cardImgEl.onerror = () => {
      this._cardImgEl.src = "https://memegenerator.net/img/instances/60573683.jpg"
    }

    // Set image likes
    this._likeNumber.textContent = this._likes.length

    // If I don't own _card, remove trash button from card
    if (this._owner._id != this._userData._id) {
      this._trashButton.remove()
    }

    // If like array contains my ID, show like button as active
    if (this._likes.some(e => e._id === this._userData._id)) {
      this._likeButton.classList.toggle("card__like_active")
    }

    this._setEventListeners(this._card)

    return this._card
  }
}

export default Card