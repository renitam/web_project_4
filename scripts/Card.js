
import * as utils from "./utils.js";

// Open modal window element
export function openModal(modal) {
  modal.classList.add("modal_display");
  document.addEventListener("keydown", utils.escModal);
}

// Close modal when clicked outside form
export function closeModal(modal) {
  modal.classList.remove("modal_display");
  document.removeEventListener("keydown", utils.escModal);

  modal.classList.contains("modal_type_card") ?
    utils.addFormValidator.resetValidation() :
    utils.editFormValidator.resetValidation();
}

// Close modal when esc key is pressed
export function escModal(evt) {
  const openModal = document.querySelector(".modal_display");
  if (evt.key === "Escape") {
    utils.closeModal(openModal);
  }
}

// Classes

class Card {
  constructor(data, templateSel) {
    this._templateSel = templateSel;
    this._name = data.name;
    this._link = data.link;
    this.isLiked = false;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSel)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLike (evt) {
    evt.target.classList.toggle("card__like_active");
    this.isLiked = !this.isLiked;
  }

  _handleTrash (evt) {
    evt.target.closest(".card").remove();
  }

  _handlePreview () {
    // Pull preview modal elements from utils.js constant exports
    utils.previewImg.src = this._cardImgEl.src;
    utils.previewImg.alt = this._cardImg.alt;
    utils.previewCaption.textContent = this._cardTitleEl.textContent;

    utils.openModal(utils.modalPreview);
  }

  _setEventListeners() {
    // Make card like buttons clickable & save like
    this._cardEl.querySelector(".card__like")
      .addEventListener("click", this._handleLike);

    // Make trash cans clickable and remove card
    this._cardEl.querySelector(".card__trash")
      .addEventListener("click", this._handleTrash);

    // Make images clickable and view image preview
    this._cardImgEl
      .addEventListener("click", this._handlePreview);
  }

  createCard() {
    this._cardEl = this._getTemplate();

    // Set title to name input
    this._cardTitleEl = this._cardEl.querySelector(".card__title");
    this._cardTitleEl.textContent = this._name;

    // Set image to link input
    this._cardImgEl = this._cardEl.querySelector(".card__image");
    this._cardImgEl.src = this._link;
    this._cardImgEl.alt = "Image of " + this._name;

    this._setEventListeners(this._cardEl);

    document.querySelector(".cards").prepend(this._cardEl);
  }

}

export default Card;