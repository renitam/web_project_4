import "./index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import { initialCards } from "../utils/initialCards";
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

const renderCard = item => {
  const newCard = new Card(item, "#card").createCard();
  cardContainer.addItem(newCard);
}

// Create card container using Section class
const cardContainer = new Section({
  data: initialCards.reverse(),
  renderer: renderCard
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
  },
  handleOpen: () => {

  }
}, ".modal_type_profile");

const editFormValidator = new FormValidator(formValidationConfig, formProfileEl);
editFormValidator.enableValidation();

editProfileBtn.addEventListener("click", () => {
  const { name, career } = profileInfo.getUserInfo();
  modalProfile.inputList[0].value = name;
  modalProfile.inputList[1].value = career;
  editFormValidator.resetValidation();
  modalProfile.open();
});

// Create add card classes and initialize add card form validation.

// const modal

const modalCard = new PopupWithForm({
  handleSubmit: evt => {
    evt.preventDefault();
    const cardDetails = modalCard.getInputValues();
    renderCard(cardDetails);
  }
},
".modal_type_card");

export const addFormValidator = new FormValidator(formValidationConfig, formCardEl);
addFormValidator.enableValidation();

addCardBtn.addEventListener("click", () => {
  formCardEl.reset();
  addFormValidator.resetValidation();
  modalCard.open();
});




