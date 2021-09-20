// Variables

//Profile elements
const profile = document.querySelector(".profile");
const nameField = profile.querySelector(".profile__name");
const jobField = profile.querySelector(".profile__career");

const editProfileBtn = profile.querySelector(".profile__edit-btn");
const addCardBtn = profile.querySelector(".profile__add-btn");

//Edit Profile Modal elements
const modalProfile = document.querySelector(".modal_type_profile");
const closeProfileBtn = modalProfile.querySelector(".modal__close-btn");
const formProfileElement = modalProfile.querySelector(".modal__form_type_profile");
const nameInput =  formProfileElement.querySelector("input[name='name']");
const jobInput = formProfileElement.querySelector("input[name='career']");


//Card elements
const cardsContainer = document.querySelector(".cards");

//Add Card Modal elements
const modalCard = document.querySelector(".modal_type_card");
const closeCardBtn = modalCard.querySelector(".modal__close-btn");
const formCardElement = modalCard.querySelector(".modal__form_type_card");
const placeInput = modalCard.querySelector("input[name='place']");
const linkInput = modalCard.querySelector("input[name='image']");
const createBtn = modalCard.querySelector(".modal__save");
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

//Image Popup Modal elements
const modalPreview = document.querySelector(".modal_type_preview");
const modalImage = modalPreview.querySelector(".modal__body_type_preview").querySelector(".modal__image");
const modalCaption = modalPreview.querySelector(".modal__caption");
const closePreviewBtn = modalPreview.querySelector(".modal__close-btn");

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

//~~`*Image preview functions*`~~//
  function openImagePreview(evt) {
    modalImage.src = evt.target.src;
    modalImage.alt = "Image preview of " + evt.target.closest(".card").querySelector(".card__title").textContent;
    modalCaption.textContent = evt.target.closest(".card").querySelector(".card__title").textContent;

    modalPreview.classList.add("modal_display");
  }

  function closeImagePreview(evt) {
    modalPreview.classList.remove("modal_display");
  }


 //~~`*Card functions*`~~//

  // Open add card modal
  function openCardForm(evt) {
    placeInput.value = "";
    linkInput.value = "";
    modalCard.classList.add("modal_display");
  }

  // Close card modal w/o saving
  function closeCardForm(evt) {
    modalCard.classList.remove("modal_display");
  }

  // Create a new card
  function createCard(data) {
    // Grab and clone card template for new card element
    let cardElement = cardTemplate.cloneNode(true);

      // Set title to name input
      let cardTitleElement = cardElement.querySelector(".card__title");
      cardTitleElement.textContent = data.name;

      // Set image to link input
      let cardImageElement = cardElement.querySelector(".card__image");
      cardImageElement.src = data.link;

      // Make card like buttons clickable & save like
      cardElement.querySelector(".card__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like_active");
    });

      // Make trash cans clickable and remove card
      cardElement.querySelector(".card__trash").addEventListener("click", function(evt) {
        evt.target.closest(".card").remove();
      });

      // Make images clickable and view image preview
      cardElement.querySelector(".card__image").addEventListener("click", openImagePreview);

    return cardElement;
  }

  // Add new card to cards section
  function addCard(data) {
    cardsContainer.prepend(data);
  }

  function handleCardSubmit(evt) {
    evt.preventDefault();
    //Create an array of the placeInput & imageInput vars
    let cardDetails = {'name': placeInput.value, 'link': linkInput.value};

    addCard(createCard(cardDetails));

    closeCardForm();
  }

//

// Scripts

//Profile calls
formProfileElement.addEventListener("submit", handleProfileSubmit);
closeProfileBtn.addEventListener("click", closeProfileForm);
editProfileBtn.addEventListener("click", openProfileForm);

//Card calls
initialCards.reverse().forEach((card) => addCard(createCard(card)));
addCardBtn.addEventListener("click", openCardForm);
closeCardBtn.addEventListener("click", closeCardForm);
formCardElement.addEventListener("submit", handleCardSubmit);

//Image preview calls
closePreviewBtn.addEventListener("click", closeImagePreview);

//