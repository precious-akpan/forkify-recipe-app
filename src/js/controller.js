import * as model from './model';
import { MODAL_CLOSE_TIME_SEC } from './config';
import recipeView from './views/recipeView';
import 'core-js';
import 'regenerator-runtime/runtime';
import searchViews from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import paginationView from './views/paginationView';



const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    recipeView.renderSpinner();
    //fetching recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

//controlSearch()

const controlSearchResult = async function() {
  try {

    resultsView.renderSpinner();

    const queryString = searchViews.getQuery();

    if (!queryString) return;

    await model.loadSearchResult(queryString);

    await resultsView.render(model.getSearchResultsPage());

    //Render pagination
    paginationView.render(model.state.search);
  } catch (e) {


    console.error(e);

  }
};

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function(newServing) {
  //update the recipe servings in state
  model.updateServings(newServing);


  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

function controlAddBookmark() {
  //add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // render recipe view
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);

}


function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {

  try {

    addRecipeView.renderSpinner()
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);


    //successful message
    addRecipeView.renderMessage()

    //close modal widow
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_TIME_SEC * 1000);

    bookmarksView.render(model.state.bookmarks)

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    console.log(model.state.recipe);
  } catch (e) {
    console.error('🥵', e);
    addRecipeView.renderError(e.message);
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchViews.addHandlerRender(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  console.log('Welcome to the application!');
};

init();
