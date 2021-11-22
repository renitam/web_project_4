import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

// Constants

export const modalProfile = document.querySelector(".modal_type_profile");
export const modalCard = document.querySelector(".modal_type_card");
export const modalPreview = document.querySelector(".modal_type_preview");
export const previewCaption = modalPreview.querySelector(".modal__caption");
export const previewImg = modalPreview
  .querySelector(".modal__body_type_preview")
  .querySelector(".modal__image");

export const closeModalBtns = document.querySelectorAll(".modal__close-btn");

const profile = document.querySelector(".profile");
const formCardEl = modalCard.querySelector(".modal__form_type_card");
const formProfileEl = modalProfile.querySelector(".modal__form_type_profile");

const nameInput = formProfileEl.querySelector("input[name='name']");
const jobInput = formProfileEl.querySelector("input[name='career']");
const nameField = profile.querySelector(".profile__name");
const jobField = profile.querySelector(".profile__career");
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

//Initialize open modals

// Open edit profile menu
export function openProfileForm() {
  // Initialize form values
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  // Open modal
  openModal(modalProfile);
}

// Open add card modal
export function openCardForm() {
  formCardEl.reset();
  openModal(modalCard);
}

export function openImgPreview(evt) {
  //Idk how to set up the attr the reviewer suggested here, so leaving as is.
  const cardTitle = evt.target
    .closest(".card")
    .querySelector(".card__title");
  const cardImg = evt.target;

  previewImg.src = cardImg.src;
  // Using title for alt since title already describes > why alt is left out
  previewImg.alt = evt.target.alt;
  previewCaption.textContent = cardTitle.textContent;

  openModal(modalPreview);
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