import Popup from "./Popup";

class PopupDelete extends Popup {
  constructor({handleSubmit}, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
  }

  open(card, id) {
    this.card = card
    this.id = id
    super.open()
  }

  _setEventListeners() {
    super._setEventListeners()
    this._popupElement.addEventListener("submit", this._handleSubmit)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popupElement.removeEventListener("submit", this._handleSubmit)
  }
}

export default PopupDelete