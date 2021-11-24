import * as utils from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


// Variables

const allModals = document.querySelectorAll(".modal");
const modalCard = document.querySelector(".modal_type_card");
const modalProfile = document.querySelector(".modal_type_profile");

const closeModalBtns = document.querySelectorAll(".modal__close-btn");

//Profile elements
const profile = document.querySelector(".profile");

const editProfileBtn = profile.querySelector(".profile__edit-btn");
const addCardBtn = profile.querySelector(".profile__add-btn");
const formProfileEl = modalProfile.querySelector(".modal__form_type_profile");

const nameInput = formProfileEl.querySelector("input[name='name']");
const jobInput = formProfileEl.querySelector("input[name='career']");
const nameField = profile.querySelector(".profile__name");
const jobField = profile.querySelector(".profile__career");


//Add Card Modal elements
const formCardEl = modalCard.querySelector(".modal__form_type_card");
const placeInput = modalCard.querySelector("input[name='place']");
const linkInput = modalCard.querySelector("input[name='image']");




//Card initialization values
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
//

// Scripts

//Initialize open modals

// Open edit profile menu
function openProfileForm() {
  // Initialize form values
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  // Open modal
  utils.openModal(modalProfile);
}

// Open add card modal
function openCardForm() {
  formCardEl.reset();
  utils.openModal(modalCard);
}


// Submit new profile name and job title and close menu
function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Insert new values using the textContent property
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  // Close modal after saving
  utils.closeModal(modalProfile);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  //Create an array of the placeInput & imageInput vars
  const cardDetails = { name: placeInput.value, link: linkInput.value };

  const newCard = new Card(cardDetails, "#card");
  document.querySelector(".cards").prepend(newCard.createCard());

  utils.closeModal(modalCard);
}

// Make modal close button clickable
closeModalBtns.forEach((button) => {
  button.addEventListener("click", utils.useCloseBtn);
});

allModals.forEach( (modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      utils.closeModal(modal);
    }
  });

  document.addEventListener("keydown", utils.escModal);
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

// When user clicks Esc, close modal window.

//Profile calls
formProfileEl.addEventListener("submit", handleProfileSubmit);
editProfileBtn.addEventListener("click", openProfileForm);

//Card calls
 //initialCards.reverse().forEach( (card) => createCard(card));
addCardBtn.addEventListener("click", openCardForm);
formCardEl.addEventListener("submit", handleCardSubmit);



initialCards.reverse().forEach( (card) => {
  const newCard = new Card(card, "#card");
  document.querySelector(".cards").prepend(newCard.createCard());
})