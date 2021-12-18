class Section {
  constructor({ data, renderer }, containerSelector) {
    this.items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
  }

  renderItems() {
    this.items.reverse().forEach(item => {
      this._renderer(item)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}

export default Section

