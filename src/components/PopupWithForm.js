import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._submitClose = this._submitClose.bind(this)

    this.saveButton = document.querySelector(popupSelector).querySelector(".modal__save")
  }

  getInputValues() {
    // Create empty object
    this._inputList = this._popupElement.querySelectorAll(".modal__input")
    this._formValues = {}

    // Add the values of the fields to this object
    this._inputList.forEach( input => {
      this._formValues[input.name] = input.value
    })

    // Return values object
    return this._formValues
  }

  _submitClose(evt) {
    if (this._popupSelector != ".modal_type_trash") {
      this.saveButton.textContent = "Saving..."
    }

    this._handleSubmit(evt)
    this.close()
  }

  _setEventListeners() {
    super._setEventListeners()
    this._popupElement.addEventListener("submit", this._submitClose)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popupElement.removeEventListener("submit", this._submitClose)
  }
}

export default PopupWithForm