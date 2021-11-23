import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

// Constants

export const allModals = document.querySelectorAll(".modal");
export const modalProfile = document.querySelector(".modal_type_profile");
export const modalCard = document.querySelector(".modal_type_card");

export const closeModalBtns = document.querySelectorAll(".modal__close-btn");

export const profile = document.querySelector(".profile");
const formProfileEl = modalProfile.querySelector(".modal__form_type_profile");

export const nameInput = formProfileEl.querySelector("input[name='name']");
export const jobInput = formProfileEl.querySelector("input[name='career']");
export const nameField = profile.querySelector(".profile__name");
export const jobField = profile.querySelector(".profile__career");
const placeInput = modalCard.querySelector("input[name='place']");
const linkInput = modalCard.querySelector("input[name='image']");


// Functions that open and close modals

export function openModal(modal) {
  modal.classList.add("modal_display");
  document.addEventListener("keydown", escModal);
}

export function closeModal(modal) {
  modal.classList.remove("modal_display");
  document.removeEventListener("keydown", escModal);

  modal.classList.contains("modal_type_card") ?
    addFormValidator.resetValidation() :
    editFormValidator.resetValidation();
}

export function escModal(evt) {
  const openModal = document.querySelector(".modal_display");

  if (evt.key === "Escape") {
    closeModal(openModal);
  }
}

// Close card modal w/o saving
export function useCloseBtn(evt) {
  closeModal(evt.target.closest(".modal"));
}


// Submit new profile name and job title and close menu
export function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Insert new values using the textContent property
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  // Close modal after saving
  closeModal(modalProfile);
}

export function handleCardSubmit(evt) {
  evt.preventDefault();
  //Create an array of the placeInput & imageInput vars
  const cardDetails = { name: placeInput.value, link: linkInput.value };

  const newCard = new Card(cardDetails, "#card");
  newCard.createCard();

  closeModal(modalCard);
}

// Make modal close button clickable
closeModalBtns.forEach((button) => {
  button.addEventListener("click", useCloseBtn);
});

allModals.forEach( (modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", escModal);
});

// Validation calls
export const formValidationConfig = {
  formSel: ".modal__form",
  inputSel: ".modal__input",
  submitBtnSel: ".modal__save",
  inactiveBtnClass: "modal__save_inactive",
  inputErrClass: "modal__input_type_error",
  errorClass: "modal__input-error"
}

export const addFormValidator = new FormValidator(formValidationConfig, modalCard);
addFormValidator.enableValidation();

export const editFormValidator = new FormValidator(formValidationConfig, modalProfile);
editFormValidator.enableValidation();