import * as utils from "./utils.js";
import Card from "./Card.js";


// Variables

//Profile elements
const profile = document.querySelector(".profile");

const editProfileBtn = profile.querySelector(".profile__edit-btn");
const addCardBtn = profile.querySelector(".profile__add-btn");

//Edit Profile Modal elements
// const utils.modalProfile = document.querySelector(".modal_type_profile");
const formProfileEl = utils.modalProfile.querySelector(".modal__form_type_profile");

//Add Card Modal elements
// const modalCard = document.querySelector(".modal_type_card");
const formCardEl = utils.modalCard.querySelector(".modal__form_type_card");


//All Modals and close buttons
const allModals = document.querySelectorAll(".modal");
const closeModalBtns = document.querySelectorAll(".modal__close-btn");

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

//Close modal
closeModalBtns.forEach((button) => {
  button.addEventListener("click", utils.useCloseBtn);
});

// When user clicks outside of modal, close modal window.
allModals.forEach( (modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains(".modal")) {
      utils.closeModal(modal);
    }
  });
});

// When user clicks Esc, close modal window.

//Profile calls
formProfileEl.addEventListener("submit", utils.handleProfileSubmit);
editProfileBtn.addEventListener("click", utils.openProfileForm);

//Card calls
 //initialCards.reverse().forEach( (card) => createCard(card));
addCardBtn.addEventListener("click", utils.openCardForm);
formCardEl.addEventListener("submit", utils.handleCardSubmit);



initialCards.reverse().forEach( (card) => {
  const newCard = new Card(card, "#card");
  newCard.createCard();
})