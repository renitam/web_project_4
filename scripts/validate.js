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
function toggleButtonState (inputList, buttonEl, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.setAttribute("disabled", "");
  } else {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.removeAttribute("disabled", "");
  }
}

// Add error message events to inputs of modal.
function setEventListeners (formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList,  buttonEl, settings.inactiveButtonClass);

  inputList.forEach( (inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl, settings.inactiveButtonClass);
    });
  });
}

function enableValidation(settings) {
  // find all forms using formSelector in settings object
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  // for each form, add validation listeners to inputs
  formList.forEach( (form) => {
    setEventListeners(form, settings);
  });
}

function resetValidation(modal, settings) {
  const inputs = modal.querySelectorAll(settings.inputSelector);
}

// Scripts

//Form Validation
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: ".modal__save_inactive",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__input-error"
});

