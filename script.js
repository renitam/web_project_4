// Variables

//Profile elements
let profile = document.querySelector(".profile");
let editProfileBtn = profile.querySelector(".profile__edit-btn");
let modalProfile = document.querySelector(".modal__profile");
let closeProfileBtn = modalProfile.querySelector(".modal__close-btn");
let formProfileElement = modalProfile.querySelector(".modal__form-profile");
let nameInput =  formProfileElement.querySelector("input[name='name']");
let jobInput = formProfileElement.querySelector("input[name='career']");
let nameField = profile.querySelector(".profile__name");
let jobField = profile.querySelector(".profile__career");

//Card elements
let addCardBtn = profile.querySelector(".profile__add-btn");
let cardsContainer = document.querySelector(".cards");
let modalCard = document.querySelector(".modal__card");
let closeCardBtn = modalCard.querySelector(".modal__close-btn");
let formCardElement = modalCard.querySelector(".model__form-card");
let placeInput = modalCard.querySelector("input[name='place']");
let linkInput = modalCard.querySelector("input[name='image']");
let createBtn = modalCard.querySelector(".modal__save");
const cardTemplate = document.querySelector('#card').content;

//Card initialization values
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];
//

// Functions

 //~~`*Profile functions*`~~//

  // Open edit profile menu
  function openProfileForm(evt) {

    // Initialize form values
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    // Open modal
    modalProfile.classList.add("modal_display");
  }

  // Submit new profile name and job title and close menu
  function handleProfileSubmit(evt) {
    evt.preventDefault();

    // Insert new values using the textContent property
    nameField.textContent  = nameInput.value;
    jobField.textContent = jobInput.value;

    // Close modal after saving
    modalProfile.classList.toggle("modal_display");
  }

  // Close edit profile menu w/o changes
  function closeProfileForm(evt) {

    // Close modal
    modalProfile.classList.remove("modal_display");
  }


 //~~`*Card functions*`~~//
  // Open add card modal
  function openCardForm(evt) {
    modalCard.classList.add("modal_display");
  }

  // Close card modal w/o saving
  function closeCardForm(evt) {
    modalCard.classList.remove("modal_display");
  }

  // Create a new card
  function createCard(data) {

    console.log(data);
    // Grab and clone card template for new card element
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

      // Set title to name input
      let cardTitleElement = cardElement.querySelector(".card__title");
      cardTitleElement.textContent = data.name;

      // Set image to link input
      let cardImageElement = cardElement.querySelector(".card__image");
      cardImageElement.src = data.link;

    return cardElement;
  }

  // Add new card to cards section
  function addCard(data) {
    cardsContainer.prepend(data);
  }

  function handleCardSubmit(evt) {
    evt.preventDefault();

    //Create an array of the placeInput & imageInput vars
    let cardDetails = {'name': placeInput.value, 'image': linkInput.value};
    console.log(cardDetails);

    addCard(createCard(cardDetails));

  }
//

// Scripts

//Profile calls
formProfileElement.addEventListener("submit", handleProfileSubmit);
closeProfileBtn.addEventListener("click", closeProfileForm);
editProfileBtn.addEventListener("click", openProfileForm);

//Card calls
initialCards.forEach((card) => addCard(createCard(card)));
addCardBtn.addEventListener("click", openCardForm);
closeCardBtn.addEventListener("click", closeCardForm);
createBtn.addEventListener("submit", handleCardSubmit);

//