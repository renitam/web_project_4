import Popup from "./Popup";

class PopupWithImage extends Popup {

  open(link, name) {
    this._popupElement.querySelector('.modal__caption').textContent = name;
    const previewImg = this._popupElement.querySelector('.modal__image');
    previewImg.src = link;
    previewImg.alt = `Image of ${name}`;

    super.open();
  }
}

export default PopupWithImage;