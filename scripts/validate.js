// Functions

// Add error message to modal input.
function showInputError (modalEl, inputEl, errorMessage) {
  const errorEl = modalEl.querySelector(`.modal__input-error_${inputEl.id}`);
  inputEl.classList.add("modal__input_type_error");
  errorEl.textContent = errorMessage;
  errorEl.classList.add("modal__input-error_active");
};

// Remove error message from modal input.
function hideInputError (modalEl, inputEl) {
  const errorEl = modalEl.querySelector(`.modal__input-error_${inputEl.id}`);
  inputEl.classList.remove("modal__input_type_error");
  errorEl.classList.remove("modal__input-error_active");
  errorEl.textContent = "";
}

//  Check input validity and toggle error message.
function checkInputValidity (modalEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(modalEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(modalEl, inputEl);
  }
}

// Return true if inputs have invalid text. Used to toggle button state.
function hasInvalidInput (inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

// Activate or deactivate button element based on input validity.
function toggleButtonState (inputList, buttonEl) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add("modal__save_inactive");
    buttonEl.setAttribute("disabled", "");
  } else {
    buttonEl.classList.remove("modal__save_inactive");
    buttonEl.removeAttribute("disabled", "");
  }
}

// Add error message events to inputs of modal.
function setEventListeners (modalEl) {
  const inputList = Array.from(modalEl.querySelectorAll(".modal__input"));
  const buttonEl = modalEl.querySelector(".modal__save");
  toggleButtonState(inputList,  buttonEl);

  inputList.forEach( (inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(modalEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
}

function enableValidation() {
  const modalList = Array.from(document.querySelectorAll(".modal__form"));
  modalList.forEach((modalEl) => {
    modalList.forEach((modal) => {
      setEventListeners(modal);
    });
  });
}

// Scripts

//Form Validation
enableValidation();