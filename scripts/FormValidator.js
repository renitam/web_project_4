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
    this._inputSel = config.inputSel;
    this._submitBtnSel = config.submitBtnSel;
    this._inactiveBtnClass = config.inactiveBtnClass;
    this._inputErrClass = config.inputErrClass;
    this._errorClass = config.errorClass;

    this._formEl = formEl;
  }

  _showInputErr (inputEl) {
    const errorEl = this._formEl.querySelector("."+this._errorClass+"_"+inputEl.id);
    inputEl.classList.add(this._inputErrClass);
    errorEl.textContent = errorMsg;
    errorEl.classList.add(this._errorClass+"_active");
  }

  _hideInputErr (inputEl) {
    const errorEl = modalEl.querySelector("."+this._errorClass+"_"+inputEl.id);
    inputEl.classList.remove(this._inputErrClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass+"_active");
  }

  _setEventListeners () {
    const inputList = Array.from(this._formEl.querySelectorAll(this._inputSel));
    const buttonEl = this._formEl.querySelector(this._submitBtnSel);

    _toggleBtnState(inputList, buttonEl);
  }

  _toggleBtnState (inputList, buttonEl) {
    if (hasInvalidInput(inputList)) {
      buttonEl.classList.add(this._inactiveBtnClass);
      buttonEl.setAttribute("disabled", "");
    } else {
      buttonEl.classList.remove(this._inactiveBtnClass);
      buttonEl.removeAttribute("disabled", "");
    }
  }

  _checkInputValidity (inputEl) {
    if (!inputEl.validity.valid) {
      showInputErr(inputEl, inputEl.validationMsg);
    } else {
      hideInputErr(inputEl);
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  enableValidation () {
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    _setEventListeners();
  }

}

export { FormValidator };

