import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {

  recipe: {},
  search: {
    start: 0,
    end: 9,
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  }
};

export const loadRecipe = async function(id) {

  try {

    const data = await getJSON(`${API_URL}${id}`);

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
    console.log(data);
  } catch (e) {
    console.error(`${e} 💥💥💥`);
    throw e;
  }
};

export const loadSearch = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      };
    });
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
