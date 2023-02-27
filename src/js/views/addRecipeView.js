import Views from './View';
class AddRecipeView extends Views {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  _modalOpenButton = document.querySelector('.nav__btn--add-recipe');
  _modalCloseButton = document.querySelector('.btn--close-modal');


  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _addHandlerShowWindow() {
    this._modalOpenButton.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._modalCloseButton.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }


  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }


  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault()
      const dataArray = [...new FormData(this._parentElement)]
      const data = Object.fromEntries(dataArray)
      handler(data)
    })
  }
  _generateMarkup() {
  }

}

export default new AddRecipeView();