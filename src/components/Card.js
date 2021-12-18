import PopupWithImage from "./PopupWithImage"
import PopupWithForm from "./PopupWithForm"
import Api from "./Api"
import { apiSettings } from "../pages/index"

// Classes

class Card {
  constructor(data, me, templateSel) {
    this._templateSel = templateSel
    this.userData = me
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._owner = data.owner
    this._id = data._id

    this.card = this._getTemplate()
    this._trashButton = this.card.querySelector(".card__trash")
    this._likeButton = this.card.querySelector(".card__like")
    this._likeNumber = this.card.querySelector(".card__like-num")

    this._api = new Api({baseUrl: apiSettings.baseUrl, groupID: apiSettings.groupID, authToken: apiSettings.authToken})
    this._preview = new PopupWithImage(".modal_type_preview")
    this._modalTrash = new PopupWithForm({
      handleSubmit: evt => {
        evt.preventDefault()
        this._api.trashCard(this._id)
          .then(this.card.remove())
          .catch(err => {
            `Could not remove card: ${err}`
          })
      }
    },
    ".modal_type_trash")
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSel)
      .content.querySelector(".card")
      .cloneNode(true)
  }

  _handleLike() {
    if (this._likeButton.classList.contains("card__like_active")) {
      this._api.removeLike(this._id)
          .then(this._likeButton.classList.toggle("card__like_active"))
          .catch(err => `Could not load like: ${err}`)
       this._likeNumber.textContent = this._likeNumber.textContent - 1
    } else {
      this._api.addLike(this._id)
          .then(this._likeButton.classList.toggle("card__like_active"))
          .catch(err => `Could not load like: ${err}`)
      this._likeNumber.textContent = +this._likeNumber.textContent + 1
    }
  }

  _handleTrash() {
    this._modalTrash.open()
  }

  _handlePreview() {
    // Pull preview modal elements from utils.js constant exports
    this._preview.open(this._link, this._name)
  }

  _setEventListeners() {
    // Make card like buttons clickable & save like
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
    this._cardTitleEl = this.card.querySelector(".card__title")
    this._cardTitleEl.textContent = this._name

    // Set image to link input
    this._cardImgEl = this.card.querySelector(".card__image")
    this._cardImgEl.src = this._link
    this._cardImgEl.alt = `Image of ${this._name}`

    this._cardImgEl.onerror = () => {
      this._cardImgEl.src = "https://memegenerator.net/img/instances/60573683.jpg"
    }

    // Set image likes
    this._likeNumber.textContent = this._likes.length

    // If I don't own card, remove trash button from card
    if (this._owner._id != this.userData._id) {
      this._trashButton.remove()
    }

    // If like array contains my ID, show like button as active
    if (this._likes.some(e => e._id === this.userData._id)) {
      this._likeButton.classList.toggle("card__like_active")
    }

    this._setEventListeners(this.card)

    return this.card
  }
}

export default Card