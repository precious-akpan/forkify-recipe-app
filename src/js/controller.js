import * as model from './model';
import recipeView from './views/recipeView';
// import 'core-js';
// import 'regenerator-runtime/runtime';
import searchViews from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

if (module.hot) {
  module.hot.accept();
}
// controlRecipes();


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //fetching recipe
    await model.loadRecipe(id);

    //rendering recipe
    // recipeView.render(model.state.recipe);
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

    await model.loadSearch(queryString);

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

const init = function() {
  recipeView.addHandleRender(controlRecipes);
  searchViews.addHandlerRender(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings)
};

init();
