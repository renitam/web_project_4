
// Constants

// Functions that open and close modals

export function openModal(modal) {
  modal.classList.add("modal_display");
  document.addEventListener("keydown", escModal);
}

// Removed ternary operation since it's optional from project 6
export function closeModal(modal) {
  modal.classList.remove("modal_display");
  document.removeEventListener("keydown", escModal);
}

export function escModal(evt) {
  const openModal = document.querySelector(".modal_display");

  if (evt.key === "Escape") {
    closeModal(openModal);
  }
}

// Close card modal w/o saving
export function useCloseBtn(evt) {
  closeModal(evt.target.closest(".modal"));
}