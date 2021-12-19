import Popup from "./Popup.js"

class PopupWithForm extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit

    this._saveButton = document.querySelector(popupSelector).querySelector(".modal__save")
  }

  // Toggle "Saving..." button dialogue
  handleLoading() {
    if (this._saveButton.textContent === "Saving...") {
      // Modal card button should say "Create" after save, all others "Save"
      if (this._popupSelector !== ".modal_type_card") {
        this._saveButton.textContent = "Save"
      } else {
        this._saveButton.textContent = "Create"
      }
    } else {
      this._saveButton.textContent = "Saving..."
    }
  }

  // Leaving this public since I'm unable to pass evt.preventDefault() if I pass inputs through handleSubmit
  // This is from a previous sprint, so I'm not understanding why this needs to be changed now.
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
    this._popupElement.addEventListener("submit", this._handleSubmit)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popupElement.removeEventListener("submit", this._handleSubmit)
  }
}

export default PopupWithForm