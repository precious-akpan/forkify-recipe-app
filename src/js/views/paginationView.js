import Views from './View';
import icons from '../../img/icons.svg';

class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');


  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    console.log(numberOfPages);
    //Page 1, and there are other pages
    let currentPage = this._data.page;
    if (currentPage
      === 1 && numberOfPages > 1) {
      return `
        ${this.#renderNextPageButton(currentPage)}`;
    }


    //other pages
    if (currentPage
      < numberOfPages) {
      return `${this.#renderPreviousPageButton(currentPage)}

        ${this.#renderNextPageButton(currentPage)}`;
    }

    //Last page and there are NO other pages
    if (currentPage
      === numberOfPages && numberOfPages > 1) {
      return `
        ${this.#renderPreviousPageButton(currentPage)}`;
    }

    //Page 1, and there are NO other pages
    if (currentPage
      === 1 && numberOfPages === 1) {
      return '';
    }
  }

  #renderPreviousPageButton(currentPage) {
    return `<button data-goto='${currentPage - 1}' class='btn--inline pagination__btn--prev'>
      <svg class='search__icon'>
        <use href='${icons}/icons.svg#icon-arrow-left'></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
  }

  #renderNextPageButton(currentPage) {
    return `<button data-goto='${currentPage + 1}' class='btn--inline pagination__btn--next'>
      <span>Page ${currentPage + 1}</span>
      <svg class='search__icon'>
        <use href='${icons}/icons.svg#icon-arrow-right'></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();