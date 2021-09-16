// Variables

let profile = document.querySelector(".profile");
let modal = document.querySelector(".modal");
let formElement = modal.querySelector(".modal__form");
let closeBtn = modal.querySelector(".modal__close-btn");
let editBtn = profile.querySelector(".profile__edit-btn");

let nameInput =  formElement.querySelector("input[name='name']");
let jobInput = formElement.querySelector("input[name='career']");
let nameField = profile.querySelector(".profile__name");
let jobField = profile.querySelector(".profile__career");
let cardsContainer = document.querySelector(".cards");

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

  function handleFormSubmit(evt) {
    evt.preventDefault();

    // Insert new values using the textContent property
    nameField.textContent  = nameInput.value;
    jobField.textContent = jobInput.value;

    // Close modal after saving
    modal.classList.toggle("modal_display");
  }

  function openForm(evt) {

    // Initialize form values
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    // Open modal
    modal.classList.add("modal_display");
  }

  function closeForm(evt) {

    // Close modal
    modal.classList.remove("modal_display");
  }

  function createCard(data) {
    console.log(data.name);

    // Grab and clone card template for new card element
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

      // Set title to name input
      const cardTitleElement = cardElement.querySelector(".card__title");
      console.log(cardTitleElement);
      cardTitleElement.textContent = data.name;

      // Set image to link input
      const cardImageElement = cardElement.querySelector(".card__image");
      cardImageElement.src = data.link;

    return cardElement;
  }

  function addCard(data) {
    cardsContainer.prepend(data);
  }
//

// Scripts

 initialCards.forEach((card) => addCard(createCard(card)));
formElement.addEventListener("submit", handleFormSubmit);
closeBtn.addEventListener("click", closeForm);
editBtn.addEventListener("click", openForm);
//