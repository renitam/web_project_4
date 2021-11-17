export function escModal(evt) {
  const openModal = document.querySelector(".modal_display");

  if (evt.key === "Escape") {
    closeModal(openModal);
  }
}

// Open modal window element
export function openModal(modal) {
  modal.classList.add("modal_display");
  document.addEventListener("keydown", escModal);
}

export function closeModal(modal) {
  modal.classList.remove("modal_display");
  document.removeEventListener("keydown", escModal);
  resetValidation(modal);
}

// Close card modal w/o saving
export function initializeCloseBtns(evt) {
  closeModal(evt.target.closest(".modal"));
}

/* Profile functions* */

// Open edit profile menu
export function openProfileForm(evt) {
  // Initialize form values
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;

  // Open modal
  openModal(modalProfile);
}

// Submit new profile name and job title and close menu
export function handleProfileSubmit(evt) {
  evt.preventDefault();

  // Insert new values using the textContent property
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;

  // Close modal after saving
  closeModal(modalProfile);
}

// Open add card modal
export function openCardForm(evt) {
  formCardEl.reset();
  openModal(modalCard);
}

export function handleCardSubmit(evt) {
  evt.preventDefault();
  //Create an array of the placeInput & imageInput vars
  const cardDetails = { name: placeInput.value, link: linkInput.value };

  createCard(cardDetails);

  closeModal(modalCard);
}