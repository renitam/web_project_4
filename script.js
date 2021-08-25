// Variables

let profile = document.querySelector('.profile');
let modal = document.querySelector('.modal');
let formElement = modal.querySelector('.modal__form');
let closeBtn = modal.querySelector('.modal__close-btn');
let editBtn = profile.querySelector('.profile__edit-btn');

let nameInput =  formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="career"]');
let nameField = profile.querySelector('.profile__name');
let jobField = profile.querySelector('.profile__career');
//

// Functions

  function handleFormSubmit(evt) {
    evt.preventDefault();

    // Insert new values using the textContent property of the querySelector() method
    nameField.textContent  = nameInput.value;
    jobField.textContent = jobInput.value;

    // Close modal after saving
    modal.classList.toggle('modal_display');
  }

  function openForm(evt) {

    // Initialize form values
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    // Open modal
    modal.classList.add('modal_display');
  }

  function closeForm(evt) {

    // Close modal
    modal.classList.remove('modal_display');
  }
//

// Scripts

formElement.addEventListener('submit', handleFormSubmit);
closeBtn.addEventListener('click', closeForm);
editBtn.addEventListener('click', openForm);
//