// Classes

export class Card {
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

  _setEventListeners() {

  }

  _like() {
    this.isLiked = !this.isLiked;
  }

  _createCard() {
    this._cardEl = _getTemplate();

    // Set title to name input
    this._cardTitleEl = this._cardEl.querySelector(".card__title");
    this._cardTitleEl.textContent = this._name;

    // Set image to link input
    this._cardImgEl = this._cardEl.querySelector(".card__image");
    this._cardImgEl.src = this._link;
    this._cardImgEl.alt = "Image of " + this._name;

    // Make card like buttons clickable & save like
    this._cardEl.querySelector(".card__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like_active");
    });

    // Make trash cans clickable and remove card
    this._cardEl
      .querySelector(".card__trash")
      .addEventListener("click", function (evt) {
        evt.target.closest(".card").remove();
      });

    // Make images clickable and view image preview
    this._cardEl
      .querySelector(".card__image")
      .addEventListener("click", openImgPreview);

    document.querySelector(".cards").prepend(this._cardEl);
  }




}