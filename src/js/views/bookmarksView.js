import Views from './View';
import previewView from './previewView';

class BookmarksView extends Views {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet, find a nice recipe to bookmark';

  _message = '';

  _generateMarkup() {
    console.log(this._data.map(bookmark => previewView.render(bookmark, false)).join(''));
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }

}

export default new BookmarksView();