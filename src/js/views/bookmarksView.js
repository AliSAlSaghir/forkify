import view from './view.js';
import icons from "url:../../img/icons.svg";

class BookmarksView extends view{
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = "No bookmarks yet. Find a nice recipe and select it!";
  _message = '';

  addHandlerRender(handler){
    window.addEventListener('load', handler);
  }

  _generateMarkup(){
    return this._data.map(
      data => {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
          <a class="preview__link ${data.id === id ? 'preview__link--active' : ''} " href="#${data.id}">
            <figure class="preview__fig">
              <img src="${data.image}" alt="${data.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${data.title}</h4>
              <p class="preview__publisher">${data.publisher}</p>
              <div class="preview__user-generated ${data.key ? '' : "hidden"}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
              </div>
            </div>
          </a>
        </li>
        `;
      }
    ).join(' ');
  }
}

export default new BookmarksView();