import "./index.css"

import Card from "../components/Card"
import FormValidator from "../components/FormValidator"
import PopupDelete from "../components/PopupDelete"
import PopupWithForm from "../components/PopupWithForm"
import PopupWithImage from "../components/PopupWithImage"
import Section from "../components/Section"
import UserInfo from "../components/UserInfo"
import Api from "../components/Api"

// Variables //
  const formValidationConfig = {
    formSel: ".modal__form",
    inputSel: ".modal__input",
    submitBtnSel: ".modal__save",
    inactiveBtnClass: "modal__save_inactive",
    inputErrClass: "modal__input_type_error",
    errorClass: "modal__input-error"
  }

  const apiSettings = {
    baseUrl: "https://around.nomoreparties.co/v1",
    groupID: "group-11",
    authToken: "dd03cd11-47a0-450d-9165-34e32dd702c6"
  }

  const updateSaveBtn = (modal) => {
    modal.saveButton.textContent = "Save"
  }
//


// Modals //

// Edit Profile Info Modal: Create profile classes and initialize edit profile form validation.
  // Create edit profile description modal and set behavior for form submissions
  const modalProfile = new PopupWithForm({
    handleSubmit: evt => {
      evt.preventDefault()

      const entries = modalProfile.getInputValues()
      api.saveProfile(entries)
        .then(() => {
          myProfileInfo.setUserInfo(entries)
          updateSaveBtn(modalProfile)
          modalProfile.close()
        })
        .catch(err => {`Could not edit profile: ${err}`})
      }
    },
    ".modal_type_profile")

  // Set up validator for edit profile description form inputs
  const formProfileEl = document.querySelector(".modal__form_type_profile")
  const editFormValidator = new FormValidator(formValidationConfig, formProfileEl)
  const nameInput = document.querySelector("#name")
  const aboutInput = document.querySelector("#about")

  editFormValidator.enableValidation()

  const editProfileBtn = document.querySelector(".profile__edit-btn")
  editProfileBtn.addEventListener("click", () => {
    const { name, about } = myProfileInfo.getUserInfo()
    nameInput.value = name
    aboutInput.value = about
    editFormValidator.resetValidation()
    modalProfile.open()
  })
//

// Edit Profile Avatar Modal: Allow user to submit an image link to update avatar

  // Pull avatar image element
  const avatarEl = document.querySelector(".profile__avatar")

  // Create edit avatar modal and set behavior for form submission
  const modalAvatar = new PopupWithForm({
    handleSubmit: evt => {
      evt.preventDefault()

      const entries = modalAvatar.getInputValues()

      api.saveAvatar(entries.link)
        .then(() => {
          myProfileInfo.setAvatar(entries)
          modalAvatar.close()
        })
        .catch(err => {`Could not edit avatar: ${err}`})
    }
  },
  ".modal_type_avatar")

  // Set validator for edit avatar link input
  const formAvatarEl = document.querySelector(".modal__form_type_avatar")
  const avatarValidator = new FormValidator(formValidationConfig, formAvatarEl)
  avatarValidator.enableValidation()

  // Add event listener to profile avatar so it behaves like a link; initialize input
  avatarEl.addEventListener("click", () => {
    formAvatarEl.reset()
    avatarValidator.resetValidation()
    updateSaveBtn(modalAvatar)
    modalAvatar.open()
  })
//

// Add Card Modal: Create add card classes and initialize add card form validation.

  // Define the card rendering steps
  const renderCard = (item) => {
    const newCard = new Card(item, "#card", myData, api, modalPreview, modalTrash).createCard()
    cardContainer.addItem(newCard)
  }

  // Create add card modal and define submit behavior (send card to api then render)
  const modalCard = new PopupWithForm({
    handleSubmit: (evt) => {
      evt.preventDefault()

      // Pull in name and link values from form inputs
      const cardDetails = modalCard.getInputValues()

      //Send values to API to create new card
      api.addCard(cardDetails)
        .then(cardResponse => renderCard(cardResponse))
        .then(modalCard.close())
        .catch(err => `Could not add card: ${err}`)

    }
  },
  ".modal_type_card")

  const formCardEl = document.querySelector(".modal__form_type_card")
  const addFormValidator = new FormValidator(formValidationConfig, formCardEl)
  addFormValidator.enableValidation()

  // Add interaction to add card button and initialize inputs
  const addCardBtn = document.querySelector(".profile__add-btn")
  addCardBtn.addEventListener("click", () => {
    formCardEl.reset()
    addFormValidator.resetValidation()
    updateSaveBtn(modalCard)
    modalCard.open()
  })
//

// Trash Card Modal: Create trash modal when trash button is clicked

  // Send card to api to remove
  const modalTrash = new PopupDelete({
    handleSubmit: evt => {
      evt.preventDefault()
      api.trashCard(modalTrash.id)
        .then(modalTrash.card.remove())
        .then(modalTrash.close())
        .catch(err => {
          `Could not remove card: ${err}`
        })
    }
  },
  ".modal_type_trash")
//

// Preview Card Modal: Create preview modal when card is clicked

  const modalPreview = new PopupWithImage(".modal_type_preview")
//

// Load page: initial API calls //

  // Create website API
  const api = new Api({baseUrl: apiSettings.baseUrl, groupID: apiSettings.groupID, authToken: apiSettings.authToken})

  // Create card container using Section class
  const cardContainer = new Section({
    // Pull initial cards and assign to data input
    data: null,
    renderer: renderCard
  }, ".cards")

  // Create profile description container class
  const myProfileInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar"
  })

  let myData = null

  // Pull profile info then render cards in card container
  Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then( ([initialCards, userInfo]) => {
      myData = userInfo
      cardContainer.items = initialCards
      cardContainer.renderItems()
      myProfileInfo.setAvatar({link: myData.avatar})
      myProfileInfo.setUserInfo({name: myData.name, about: myData.about})
    })
    .catch(err => `Unable to load data: ${err}`)
//
