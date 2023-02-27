import Views from './View';
import previewView from './previewView';

class BookmarksView extends Views {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet, find a nice recipe to bookmark';

  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }

}

export default new BookmarksView();