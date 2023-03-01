import { API_URL, KEY, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helper';

export async function uploadRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(ingredient => ingredient[0].startsWith('ingredient') && ingredient[1] !== '').map(ingredient => {
      const ingredientsArray = ingredient[1].split(',').map(element => element.trim());
      // const ingredientsArray = ingredient[1].replaceAll(' ', '').split(',');
      if (ingredientsArray.length !== 3) throw new Error('Wrong ingredients format! Please use the correct format!');
      const [quantity, unit, description] = ingredientsArray;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data)
    addBookmark(state.recipe)
  } catch (e) {
    throw e;
  }
}


export function updateServings(newServings) {
  // if (!!state.recipe) return;
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = (ingredient.quantity * newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
}


export const state = {

  recipe: {},
  search: {
    start: 0,
    end: 9,
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
  bookmarks: []
};


function persistBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

function createRecipeObject(data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  ...(recipe.key && {key: recipe.key})
  };
}

export const loadRecipe = async function(id) {

  try {

    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === state.recipe.id);

  } catch (e) {
    console.error(`${e} 💥💥💥`);
    throw e;
  }
};

export const loadSearchResult = async function(query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && {key: recipe.key})
      };
    });
    state.search.page = 1;
  } catch (e) {
    console.error(`${e} 💥💥💥`);
    throw e;
  }
};

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export function addBookmark(recipe) {
  //adding a bookmark
  state.bookmarks.push(recipe);

  //mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
}

export function removeBookmark(id) {
  //removing a bookmark
  const i = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(i, 1);

  //mark current recipe as not a bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
}

function init() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}

function clearBookmarks() {
  localStorage.clear();
}

// clearBookmarks()
init();