class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector)
  }

  addItem(element) {
    this._container.prepend(element)
  }
}

export default Section