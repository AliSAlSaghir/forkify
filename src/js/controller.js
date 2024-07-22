import * as modal from './modal.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import "core-js/stable";
import {async} from "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner(); 

    resultsView.update(modal.getSearchResultsPage());
    bookmarksView.update(modal.state.bookmarks);
    await modal.loadRecipe(id);

    recipeView.render(modal.state.recipe);
  } catch(err){
    recipeView.renderError(err);
  }
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query) return;
    await modal.loadSearchResults(query);
    resultsView.render(modal.getSearchResultsPage());
    paginationView.render(modal.state.search);
  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(goTo){
  console.log(goTo);
  resultsView.render(modal.getSearchResultsPage(goTo));
  paginationView.render(modal.state.search);
}

const controlServings = function(newServings){
  modal.updateServings(newServings);
  recipeView.update(modal.state.recipe);
}

const controlAddBookmark = function(){
  if(!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe);
  else modal.deleteBookmark(modal.state.recipe.id);
  recipeView.update(modal.state.recipe);
  bookmarksView.render(modal.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(modal.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{
    addRecipeView.renderSpinner();
    await modal.UploadRecipe(newRecipe);
    recipeView.render(modal.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(modal.state.bookmarks);
    window.history.pushState(null,'', `#${modal.state.recipe.id}`);
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, 2500);
  }catch(err){
    addRecipeView.renderError(err.message);
  }
}

bookmarksView.addHandlerRender(controlBookmarks);
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings);
recipeView.addHandlerBookmark(controlAddBookmark);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
addRecipeView.addHandlerUpload(controlAddRecipe);




