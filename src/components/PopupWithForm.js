import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
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

  _setEventListeners() {
    super._setEventListeners()
    this._popupElement.addEventListener("submit", (evt) => {
      this._handleSubmit(evt)
      this.close()
    })
  }
}

export default PopupWithForm