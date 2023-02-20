class SearchViews {
  #parentElement = document.querySelector('.search')

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value
    this.clearInput()
    return query
  }

  clearInput() {
    this.#parentElement.querySelector('.search__field').value = ''
  }
  addHandlerRender(handler) {
    this.#parentElement.querySelector('.search__btn').addEventListener('click', (e) => {
      e.preventDefault()
      handler()
    })
  }
}

export default new SearchViews();