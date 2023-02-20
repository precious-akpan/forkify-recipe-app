class SearchView {
  _parentElement = document.querySelector('.search')

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value
    this._clearInput()
    return query
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = ''
  }
  addHandlerRender(handler) {
    this._parentElement.querySelector('.search__btn').addEventListener('click', (e) => {
      e.preventDefault()
      handler()
    })
  }
}

export default new SearchView();