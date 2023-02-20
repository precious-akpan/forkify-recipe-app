import Views from './View';
import icons from '../../img/icons.svg'
class ResultsView extends Views{
  _parentElement = document.querySelector('.results')

  _generateMarkup() {
    return `${this._data.map(result =>`<li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`).join('')}`
  }

  _generate
}

export default new ResultsView();