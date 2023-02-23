import icons from 'url:../../img/icons.svg';

export default class Views {


  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDom.querySelectorAll('*');
    const currentElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newElement, i) => {
      let currentElement = currentElements[i];
//update changed TEXT
      if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
        currentElement.textContent = newElement.textContent;
      }
//UPDATE CHANGED ATTRIBUTE
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute => currentElement.setAttribute(attribute.name, attribute.value));
      }


    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `<div class='spinner'>
          <svg>
            <use href='${icons}#icon-loader'></use>
          </svg>
        </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  };

  renderError(message = this._errorMessage) {
    const markup = `
          <div class='error'>
            <div>
              <svg>
                <use href='${icons}#icon-alert-triangle'></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class='message'>
            <div>
              <svg>
                <use href='${icons}icons.svg#icon-smile'></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}