// Variables

let profile = document.querySelector('.profile');
let modal = document.querySelector('.modal');
let formElement = modal.querySelector('.modal__body');
let closeBtn = modal.querySelector('.modal__close-btn');
let editBtn = profile.querySelector('.profile__edit-btn');

let nameInput =  formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="career"]');
let nameField = profile.querySelector('.profile__name');
let jobField = profile.querySelector('.profile__career');

console.log(profile);
console.log(nameField.textContent);
console.log(jobField.textContent);
//

// Functions

  function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput =  formElement.querySelector('input[name="name"]');
    let jobInput = formElement.querySelector('input[name="career"]');

        // Select elements where the field values will be entered
        let nameField = profile.querySelector('.profile__name');
        let jobField = profile.querySelector('.profile__career');

        // Insert new values using the textContent property of the querySelector() method
        nameField.textContent  = nameInput.value;
        jobField.textContent = jobInput.value;
  }

  function toggleForm(evt) {
    evt.preventDefault();

    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;

    modal.classList.toggle('modal_display');
  }
//

// Scripts

formElement.addEventListener('submit', handleFormSubmit);
closeBtn.addEventListener('click', toggleForm);
editBtn.addEventListener('click', toggleForm);
//