import "./index.css"

import Card from "../components/Card"
import FormValidator from "../components/FormValidator"
import PopupWithForm from "../components/PopupWithForm"
import Section from "../components/Section"
import UserInfo from "../components/UserInfo"
import Api from "../components/Api"

// Variables //

const editProfileBtn = document.querySelector(".profile__edit-btn")
const addCardBtn = document.querySelector(".profile__add-btn")
const formProfileEl = document.querySelector(".modal__form_type_profile")
const formCardEl = document.querySelector(".modal__form_type_card")

const formValidationConfig = {
  formSel: ".modal__form",
  inputSel: ".modal__input",
  submitBtnSel: ".modal__save",
  inactiveBtnClass: "modal__save_inactive",
  inputErrClass: "modal__input_type_error",
  errorClass: "modal__input-error"
}

const renderCard = item => {
  const newCard = new Card(item, "#card").createCard()
  cardContainer.addItem(newCard)
}

// Create card container using Section class
const cardContainer = new Section(".cards")

// Modals //

// Edit Profile Modal: Create profile classes and initialize edit profile form validation.
const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  careerSelector: ".profile__career",
  avatarSelector: ".profile__avatar"})

const modalProfile = new PopupWithForm({
  handleSubmit: evt => {
    evt.preventDefault()
    profileInfo.setUserInfo(modalProfile.getInputValues())
    }
  },
  ".modal_type_profile")

const editFormValidator = new FormValidator(formValidationConfig, formProfileEl)
editFormValidator.enableValidation()

editProfileBtn.addEventListener("click", () => {
  const { name, career } = profileInfo.getUserInfo()
  document.querySelector("#name").value = name
  document.querySelector("#career").value = career
  editFormValidator.resetValidation()
  modalProfile.open()
})

// Add Card Modal: Create add card classes and initialize add card form validation.

const modalCard = new PopupWithForm({
  handleSubmit: evt => {
    evt.preventDefault()

    // Pull in name and link values from form inputs
    const cardDetails = modalCard.getInputValues()

    //Send values to API to create new card
    api.addCard(cardDetails)
    renderCard(cardDetails)
    }
  },
  ".modal_type_card")

const addFormValidator = new FormValidator(formValidationConfig, formCardEl)
addFormValidator.enableValidation()

addCardBtn.addEventListener("click", () => {
  formCardEl.reset()
  addFormValidator.resetValidation()
  modalCard.open()
})

// Trash Modal: Confirm whether user truly wants to delete a card and send delete request.

// const modalTrash = new PopupWithForm({
//   handleSubmit: evt => {
//     evt.preventDefault()

//   }
// },
// ".modal__trash")


// Api calls //

// Set constants with login information
const baseUrl = "https://around.nomoreparties.co/v1"
const groupID = "group-11"
const authToken = "dd03cd11-47a0-450d-9165-34e32dd702c6"

// Create website api
const api = new Api({baseUrl, groupID, authToken})

// Pull profile info
api.getProfileInfo()
  .then(result => {
    profileInfo.setUserInfo({name: result.name, career: result.about, avatar: result.avatar})
    return result
  })
  .catch("Error: Profile unavailable.")

// Pull initial cards
api.getCards(renderCard)
