import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');




// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


// controlRecipes();


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //fetching recipe
    await model.loadRecipe(id)

    //rendering recipe
    recipeView.render(model.state.recipe)

  } catch (e) {
    recipeView.renderError();
  }
};

//controlSearch()

const contronSearch = async function() {
  await model.loadSearch('pizza')
  console.log(model.state.search.results);
}

contronSearch()
const init = function() {
  recipeView.addHandleRender(controlRecipes)
}

init()
