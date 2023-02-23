import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helper';

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

export const loadRecipe = async function(id) {

  try {

    const data = await getJSON(`${API_URL}${id}`);
    console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };

    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === state.recipe.id);

    console.log(state.recipe);

  } catch (e) {
    console.error(`${e} 💥💥💥`);
    throw e;
  }
};

export const loadSearch = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
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
  // console.log(state.recipe.bookmarked);
}

export function removeBookmark(id) {
  //removing a bookmark
  const i = state.bookmarks.findIndex(bookmark => bookmark.id === id)
  state.bookmarks.splice(i, 1)

  //mark current recipe as not a bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
}