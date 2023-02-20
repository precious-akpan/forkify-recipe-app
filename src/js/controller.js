import * as model from './model';
import recipeView from './views/recipeView';
// import 'core-js';
// import 'regenerator-runtime/runtime';
import searchViews from './views/searchViews';

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
    recipeView.render(model.state.recipe);

  } catch (e) {
    recipeView.renderError();
  }
};

//controlSearch()

const controlSearchResult = async function() {
  try {

    const queryString = searchViews.getQuery();
    if (!queryString) return;


    await model.loadSearch(queryString);
    console.log(model.state.search.results);
  } catch (e) {
    console.error(e);

  }
};


const init = function() {
  recipeView.addHandleRender(controlRecipes);
  searchViews.addHandlerRender(controlSearchResult)
};

init();
