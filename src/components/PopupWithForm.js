import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleSubmit, handleOpen }, popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._handleOpen = handleOpen;
    this.inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  open() {
    this._handleOpen();
    super.open();
  }

  getInputValues() {
    // Create empty object
    this._formValues = {};

    // Add the values of the fields to this object
    this.inputList.forEach( input => {
      this._formValues[input.name] = input.value;
    });

    // Return values object
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupElement.addEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithForm;