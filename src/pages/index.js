import "./index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

// Variables

const editProfileBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const formProfileEl = document.querySelector(".modal__form_type_profile");
const formCardEl = document.querySelector(".modal__form_type_card");

const formValidationConfig = {
  formSel: ".modal__form",
  inputSel: ".modal__input",
  submitBtnSel: ".modal__save",
  inactiveBtnClass: "modal__save_inactive",
  inputErrClass: "modal__input_type_error",
  errorClass: "modal__input-error"
}

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

// Create card container using Section class
const cardContainer = new Section({
  data: initialCards,
  renderer: item => {
    const newCard = new Card(item, "#card").createCard();
    cardContainer.addItem(newCard);
    }
  },
  ".cards"
);

// Render the initial card list.
cardContainer.renderItems();

// Scripts

// Create profile classes and initialize edit profile form validation.
const profileInfo = new UserInfo({ nameSelector: ".profile__name", careerSelector: ".profile__career"});

const modalProfile = new PopupWithForm({
  handleSubmit: evt => {
    evt.preventDefault();
    profileInfo.setUserInfo(modalProfile.getInputValues());
    modalProfile.close();
  },
  handleOpen: () => {
    const { name, career } = profileInfo.getUserInfo();
    modalProfile.inputList[0].value = name;
    modalProfile.inputList[1].value = career;
    editFormValidator.resetValidation();
  }
}, ".modal_type_profile");

const editFormValidator = new FormValidator(formValidationConfig, formProfileEl);
editFormValidator.enableValidation();

editProfileBtn.addEventListener("click", modalProfile.open);

// Create add card classes and initialize add card form validation.

// const modal
const modalCard = new PopupWithForm({
  handleSubmit: evt => {
    evt.preventDefault();
    const cardDetails = modalCard.getInputValues();
    const newCard = new Card(cardDetails, "#card").createCard();
    cardContainer.addNewItem(newCard);
    modalCard.close();
  },
  handleOpen: () => {
    modalCard.popupElement.querySelector(".modal__form").reset();
    addFormValidator.resetValidation();
  }
},
".modal_type_card");

export const addFormValidator = new FormValidator(formValidationConfig, formCardEl);
addFormValidator.enableValidation();

addCardBtn.addEventListener("click", modalCard.open);




