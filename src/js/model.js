import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
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
     return {id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,}
    })
  } catch (e) {
    console.error(`${e} 💥💥💥`);
    throw e;
  }
};

