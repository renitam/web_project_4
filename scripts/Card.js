
import * as utils from "./utils.js";

// Global constants used for _handlePreview function.
const modalPreview = document.querySelector(".modal_type_preview");
const previewCaption = modalPreview.querySelector(".modal__caption");
const previewImg = modalPreview.querySelector(".modal__image");


// Classes

class Card {
  constructor(data, templateSel) {
    this._templateSel = templateSel;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSel)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLike(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _handleTrash(evt) {
    evt.target.closest(".card").remove();
  }

  _handlePreview(evt) {
    // Pull preview modal elements from utils.js constant exports
    const _cardImg = evt.target;
    const _cardTitle = _cardImg.closest(".card").querySelector(".card__title");
    previewImg.src = _cardImg.src;
    previewImg.alt = _cardImg.alt;
    previewCaption.textContent = _cardTitle.textContent;

    utils.openModal(modalPreview);
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
    const _cardTitleEl = this._cardEl.querySelector(".card__title");
    _cardTitleEl.textContent = this._name;

    // Set image to link input
    this._cardImgEl = this._cardEl.querySelector(".card__image");
    this._cardImgEl.src = this._link;
    this._cardImgEl.alt = `Image of ${this._name}`;

    this._setEventListeners(this._cardEl);

    document.querySelector(".cards").prepend(this._cardEl);
  }

}

export default Card;