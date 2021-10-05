// Variables

//Profile elements
const profile = document.querySelector(".profile");
const nameField = profile.querySelector(".profile__name");
const jobField = profile.querySelector(".profile__career");

const editProfileBtn = profile.querySelector(".profile__edit-btn");
const addCardBtn = profile.querySelector(".profile__add-btn");

const closeModalBtns = document.querySelectorAll(".modal__close-btn");

//Edit Profile Modal elements
const modalProfile = document.querySelector(".modal_type_profile");
const formProfileEl = modalProfile.querySelector(".modal__form_type_profile");
const nameInput = formProfileEl.querySelector("input[name='name']");
const jobInput = formProfileEl.querySelector("input[name='career']");

//Card elements
const cardsContainer = document.querySelector(".cards");

//Add Card Modal elements
const modalCard = document.querySelector(".modal_type_card");
const formCardEl = modalCard.querySelector(".modal__form_type_card");
const placeInput = modalCard.querySelector("input[name='place']");
const linkInput = modalCard.querySelector("input[name='image']");
const createBtn = modalCard.querySelector(".modal__save");
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");

//Img Popup Modal elements
const modalPreview = document.querySelector(".modal_type_preview");
const previewImg = modalPreview
  .querySelector(".modal__body_type_preview")
  .querySelector(".modal__image");
const previewCaption = modalPreview.querySelector(".modal__caption");

//All Modals
const allModals = document.querySelectorAll(".modal");

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

// Functions

function escModal(evt) {
  const openModal = document.querySelector(".modal_display");

  if (evt.key === "Escape") {
    closeModal(openModal);
  }
}

// Open modal window element
function openModal(modal) {
  modal.classList.add("modal_display");
  document.addEventListener("keydown", escModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_display");
  document.removeEventListener("keydown", escModal);
}

// Close card modal w/o saving
function initializeCloseBtns(evt) {
  closeModal(evt.target.closest(".modal"));
}

/* Profile functions* */

// Open edit profile menu
function openProfileForm(evt) {
  // Initialize form values
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  // Open modal
  openModal(modalProfile);
}

// Submit new profile name and job title and close menu
function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Insert new values using the textContent property
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  // Close modal after saving
  closeModal(modalProfile);
}

// Close edit profile menu w/o changes

/* Preview functions */

// Open preview modal
function openImgPreview(evt) {
  //Idk how to set up the attr the reviewer suggested here, so leaving as is.
  const previewTitle = evt.target
    .closest(".card")
    .querySelector(".card__title");
  const previewImage = evt.target;

  previewImg.src = previewImage.src;
  // Using title for alt since title already describes > why alt is left out
  previewImg.alt = evt.target.alt;
  previewCaption.textContent = previewTitle.textContent;

  openModal(modalPreview);
}

/* Card functions */

// Open add card modal
function openCardForm(evt) {
  formCardEl.reset();
  openModal(modalCard);
}

// Create a new card
function createCard(data) {
  // Grab and clone card template for new card element
  const cardEl = cardTemplate.cloneNode(true);

  // Set title to name input
  const cardTitleEl = cardEl.querySelector(".card__title");
  cardTitleEl.textContent = data.name;

  // Set image to link input
  const cardImgEl = cardEl.querySelector(".card__image");
  cardImgEl.src = data.link;
  cardImgEl.alt = "Image of " + data.name;

  // Make card like buttons clickable & save like
  cardEl.querySelector(".card__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  // Make trash cans clickable and remove card
  cardEl
    .querySelector(".card__trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });

  // Make images clickable and view image preview
  cardEl
    .querySelector(".card__image")
    .addEventListener("click", openImgPreview);

  return cardEl;
}

//Close card modal

// Add new card to cards section
function addCard(data) {
  cardsContainer.prepend(data);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  //Create an array of the placeInput & imageInput vars
  const cardDetails = { name: placeInput.value, link: linkInput.value };

  addCard(createCard(cardDetails));

  closeModal(modalCard);
}

// Scripts

//Close modal
closeModalBtns.forEach((button) => {
  button.addEventListener("click", initializeCloseBtns);
});

// When user clicks outside of modal, close modal window.
allModals.forEach( (modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains(".modal")) {
      closeModal(modal);
    }
  });
});

// When user clicks Esc, close modal window.

//Profile calls
formProfileEl.addEventListener("submit", handleProfileSubmit);
editProfileBtn.addEventListener("click", openProfileForm);

//Card calls
initialCards.reverse().forEach((card) => addCard(createCard(card)));
addCardBtn.addEventListener("click", openCardForm);
formCardEl.addEventListener("submit", handleCardSubmit);

