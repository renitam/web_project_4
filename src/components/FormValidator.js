const formValidationConfig = {
  formSel: ".modal__form",
  inputSel: ".modal__input",
  submitBtnSel: ".modal__save",
  inactiveBtnClass: "modal__save_inactive",
  inputErrClass: "modal__input_type_error",
  errorClass: "modal__input-error"
}

class FormValidator {
  constructor(config = formValidationConfig, formEl) {
    this._inputSel = config.inputSel
    this._submitBtnSel = config.submitBtnSel
    this._inactiveBtnClass = config.inactiveBtnClass
    this._inputErrClass = config.inputErrClass
    this._errorClass = config.errorClass

    this._formEl = formEl
  }

  _showInputErr (inputEl, errorMsg) {
    this._errorEl = this._formEl.querySelector(`.${this._errorClass}_${inputEl.id}`)
    inputEl.classList.add(this._inputErrClass)
    this._errorEl.textContent = errorMsg
    this._errorEl.classList.add(`${this._errorClass}_active`)
  }

  _hideInputErr (inputEl) {
    this._errorEl = this._formEl.querySelector(`.${this._errorClass}_${inputEl.id}`)
    inputEl.classList.remove(this._inputErrClass)
    this._errorEl.textContent = ""
    this._errorEl.classList.remove(`${this._errorClass}_active`)
  }

  _checkInputValidity (inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputErr(inputEl, inputEl.validationMessage)
    } else {
      this._hideInputErr(inputEl)
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid
    })
  }

  /* set and remove attribute calls break script when 2nd arg is removed
  leaving as is considering, despite reviewer instructions */
  _toggleBtnState (inputList, buttonEl) {
    if (this._hasInvalidInput(inputList)) {
      buttonEl.classList.add(this._inactiveBtnClass)
      buttonEl.setAttribute("disabled", "")
    } else {
      buttonEl.classList.remove(this._inactiveBtnClass)
      buttonEl.removeAttribute("disabled")
    }
  }

  _setEventListeners () {
    this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSel))
    this._buttonEl = this._formEl.querySelector(this._submitBtnSel)

    this._toggleBtnState(this._inputList, this._buttonEl)

    this._inputList.forEach( (inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl)
        this._toggleBtnState(this._inputList, this._buttonEl)
      })
    })
  }

  enableValidation () {
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._setEventListeners()
  }

  resetValidation() {
    this._inputList.forEach( (input) => {
      this._hideInputErr(input)
    })
  }

}

export default FormValidator

