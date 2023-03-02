export default class View{
  #btnInit = document.querySelector('button#init')
  #statusElement = document.querySelector('#status')

  enableButton() {
    this.#btnInit.disabled = false;
  }

  configureOnBtnClick(cb) {
    this.#btnInit.addEventListener('click', cb)
  }

  log(text) {
    this.#statusElement.textContent = text
  }
}