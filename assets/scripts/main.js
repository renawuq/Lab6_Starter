// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  if(recipes == null){
    recipes = []
  } 
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  return JSON.parse(localStorage.getItem("recipes"));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  var mainElement = document.querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (var i = 0; i < recipes.length; i++) {
    let tempCard = document.createElement('recipe-card');
    tempCard.data = recipes[i];
    mainElement.append(tempCard);
    //Do something
}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  toolTemp = JSON.stringify(recipes);
  localStorage.setItem('recipes', toolTemp);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  var getFormValue = document.querySelector("form");

  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  getFormValue.addEventListener("submit", formAct);

  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
  // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
  function formAct(){
    var formDataO = new FormData(getFormValue);
    var recipeObject = {};
    for (var pair of formDataO.entries()) {
      recipeObject[pair[0]] = pair[1];
    }

    // B6. TODO - Create a new <recipe-card> element
    var element = document.createElement("recipe-card");

    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    element.data = recipeObject;

    // B8. TODO - Append this new <recipe-card> to <main>
    var mainElement = document.querySelector('main');
    mainElement.append(element);

    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    var recipes_array = JSON.parse(localStorage.getItem("recipes"));
    if (recipes_array == null) {
      recipes_array = [];
    }
    recipes_array.push(recipeObject);
    localStorage.setItem("recipes", JSON.stringify(recipes_array));
  }
  
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  var getDeleteButton = document.getElementsByClassName("danger").item(0); 

  // B11. TODO - Add a click event listener to clear local storage button
  getDeleteButton.addEventListener("click", clearMain);

  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
  // B13. TODO - Delete the contents of <main>
  function clearMain()
  {
    localStorage.clear(); 
    document.querySelector("main").innerHTML = "";
  }

}
