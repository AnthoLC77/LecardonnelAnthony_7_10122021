//--------------------------------------
//import SearchAll from "./searchAll.js";
import DropDownButton from "./dropDownMenu.js";
import { recipes } from "./data.js";
import RecipesCard from "./cardRecipes.js";

//--------------------------------------
displayRecipes(recipes);

// Input search creation
const inputIngredient = document.getElementById("ingrédientsSearchDeux");
const inputAppliance = document.getElementById("applianceSearchDeux");
const inputUstensils = document.getElementById("ustensilsSearchDeux");

const listeUlIngredient = document.querySelector(".liste_ingredients");
const listeUlAppliance = document.querySelector(".liste_appareils");
const listUlUstensils = document.querySelector(".liste_ustensils");

//new SearchAll(listeUlIngredient, listeUlAppliance, listUlUstensils);

new DropDownButton("ingredient", inputIngredient, listeUlIngredient, recipes);
new DropDownButton("appliance", inputAppliance, listeUlAppliance, recipes);
new DropDownButton("ustensils", inputUstensils, listUlUstensils, recipes);

// Open close Input Search
const inputIngredientInactive = document.querySelector(
  ".first_input_ingredients"
);
const inputIngredientActive = document.querySelector(
  ".second_input_ingredients"
);

const inputAppareilInactive = document.querySelector(".first_input_appareils");

const inputAppareilActive = document.querySelector(".second_input_appareils");

const inputUstensileInactive = document.querySelector(
  ".first_input_ustensiles"
);

const inputUstensileActive = document.querySelector(".second_input_ustensiles");

function openDropDown(inputInactive, inputActive) {
  inputInactive.addEventListener("click", (e) => {
    inputInactive.style.display = "none";
    inputActive.style.display = "block";
    inputActive.firstChild.nextElementSibling.focus();
  });
}
openDropDown(inputIngredientInactive, inputIngredientActive);
openDropDown(inputAppareilInactive, inputAppareilActive);
openDropDown(inputUstensileInactive, inputUstensileActive);

function closeDropDownByArrow(a, b, c, d) {
  if (a.id === b) {
    document.querySelector(c).addEventListener("click", (e) => {
      a.style.display = "none";
      d.style.display = "block";
    });
  } else {
    console.log("Non");
  }
}

closeDropDownByArrow(
  inputIngredientActive,
  "second_input1",
  ".arrow_up1",
  inputIngredientInactive
);

closeDropDownByArrow(
  inputAppareilActive,
  "second_input2",
  ".arrow_up2",
  inputAppareilInactive
);

closeDropDownByArrow(
  inputUstensileActive,
  "second_input3",
  ".arrow_up3",
  inputUstensileInactive
);

function closeDropDownMenuClickOutside(inputActive, inputInactive) {
  document.addEventListener("click", (e) => {
    if (
      e.target.parentNode !== inputActive &&
      e.target.parentNode !== inputInactive
    ) {
      inputActive.style.display = "none";
      inputInactive.style.display = "block";
    }
  });
}

closeDropDownMenuClickOutside(inputIngredientActive, inputIngredientInactive);
closeDropDownMenuClickOutside(inputAppareilActive, inputAppareilInactive);
closeDropDownMenuClickOutside(inputUstensileActive, inputUstensileInactive);

//-----------------------------

// RECHERCHE BARRE PRINCIPAL

const searchInput = document.getElementById("searchBar");
let containerRecipes = document.querySelector(".recettes_container");
const listItems = document.querySelectorAll(".items");
const listeTags = document.getElementById("list_tags");

let resultFilter = [];

if (listeTags.childElementCount == 0) {
  console.log("yes");
}

searchInput.addEventListener("input", () => {
  if (listeTags.children[0]) {
    mainBarSearchFilter(resultSearchAndClick);
  } else {
    mainBarSearchFilter(recipes);
  }
});

function mainBarSearchFilter(arrayRecipes) {
  if (searchInput.value.length > 2) {
    resultFilter = arrayRecipes.filter((recipe) => {
      const inputValue = searchInput.value.toLocaleLowerCase();

      // FILTRE NAME, INGREDIENTS, DESCRIPTION

      const filterAll = recipe.ingredients.filter((ingredient) => {
        if (ingredient.ingredient.toLocaleLowerCase().includes(inputValue)) {
          return ingredient.ingredient
            .toLocaleLowerCase()
            .includes(searchInput.value.toLocaleLowerCase());
        } else if (recipe.name.toLocaleLowerCase().includes(inputValue)) {
          return recipe.name.toLocaleLowerCase().includes(inputValue);
        } else if (
          recipe.description.toLocaleLowerCase().includes(inputValue)
        ) {
          return recipe.description.toLocaleLowerCase().includes(inputValue);
        }
      });

      if (filterAll && filterAll.length > 0) {
        return true;
      } else {
        return false;
      }
    });
    console.log(resultSearchAndClick);
    console.log(resultFilter);

    containerRecipes.innerHTML = "";
    displayRecipes(resultFilter);
    showRemainingListItems(resultFilter);
    tri(resultFilter);

    //Show or suppress the error message

    if (containerRecipes.children.length < 1) {
      document.querySelector(".error_search").style.display = "block";
    } else if (containerRecipes.children.length >= 1) {
      document.querySelector(".error_search").style.display = "none";
    }
    //--------------------------------------------------------------------
  } else if (searchInput.value.length < 3 && listeTags.children[0]) {
    containerRecipes.innerHTML = "";
    tri(resultSearchAndClick);
    displayRecipes(resultSearchAndClick);
    showRemainingListItems(resultSearchAndClick);
    document.querySelector(".error_search").style.display = "none";
  } else if (searchInput.value.length < 3 && listeTags.childElementCount == 0) {
    containerRecipes.innerHTML = "";
    tri(recipes);
    displayRecipes(recipes);
    showRemainingListItems(recipes);
    document.querySelector(".error_search").style.display = "none";
  }
}

function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    new RecipesCard(
      recipe,
      recipe.name,
      recipe.time,
      recipe.description,
      recipe.ingredients
    );
  });
}

//--------------------------------------------------------------------------------
// RECHERCHE CLICK LISTITEMS

//let resultClickItems = [];

let resultSearchAndClick = [];

listItems.forEach((item) => {
  item.addEventListener("click", triTags);
});

function triTags() {
  this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
  filterRecipesOnClick();
}

//Reset the text input when clicking on an item in the list

function VideInputText() {
  inputIngredient.value = "";
  inputAppliance.value = "";
  inputUstensils.value = "";
}

//filterItemsInput(inputIngredient, result);

function filterRecipesOnClick() {
  const listTrue = Array.from(
    document.querySelectorAll(".items[data-choisi='true']")
  );
  VideInputText();
  createTagsByColor(listTrue);
  triSearchBarAndListeTags(listTrue, resultFilter);

  // Filter selon le nombre de tag séléctionné
  listTrue.forEach((liste) => {
    if (listTrue.length == 1 && searchInput.value.length < 3) {
      filterRecipeWithTags(liste, recipes);
    } else if (listTrue.length == 2 && searchInput.value.length < 3) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listTrue.length == 3 && searchInput.value.length < 3) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listTrue.length == 4 && searchInput.value.length < 3) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listTrue.length == 5 && searchInput.value.length < 3) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    }
  });

  // Si aucun tag n'est séléctionné && q

  if (listTrue.length == 0 && searchInput.value.length < 3) {
    containerRecipes.innerHTML = "";
    displayRecipes(recipes);
    showRemainingListItems(recipes);
    tri(recipes);
  }
  if (listTrue.length == 0 && searchInput.value.length > 2) {
    containerRecipes.innerHTML = "";
    displayRecipes(resultFilter);
    showRemainingListItems(resultFilter);
    tri(resultFilter);
  }

  closingTagOnTheCross(listTrue);
}

//-----------------------------------------------------------------------

// Permet d'afficher les list items disponible en fonction de la recherche par click ou sur la barre principal

function triSearchBarAndListeTags(listeTrue, resultFilter) {
  listeTrue.forEach((liste) => {
    if (listeTrue.length == 1 && searchInput.value.length > 2) {
      filterRecipeWithTags(liste, resultFilter);
    } else if (listeTrue.length == 2 && searchInput.value.length > 2) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listeTrue.length == 3 && searchInput.value.length > 2) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listeTrue.length == 4 && searchInput.value.length > 2) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    } else if (listeTrue.length == 5 && searchInput.value.length > 2) {
      filterRecipeWithTags(liste, resultSearchAndClick);
    }

    if (listeTrue.length == 0 && searchInput.value.length > 2) {
      console.log("yes");
      filterRecipeWithTags(liste, resultFilter);
    }
  });
}

function createTagsByColor(listTrue) {
  document.getElementById("list_tags").innerHTML = listTrue
    .map((liste) => {
      if (liste.classList[1] == "items_ingredient") {
        return `
        <div class="tag_choisi tag_ingredients">
          <li class="list_tag">${liste.textContent}</li>
          <i class="far fa-times-circle croix"></i>
        </div>

      `;
      } else if (liste.classList[1] == "items_appliance") {
        return `
      <div class="tag_choisi tag_appliance">
          <li class="list_tag">${liste.textContent}</li>
          <i class="far fa-times-circle croix"></i>
        </div>
      `;
      } else if (liste.classList[1] == "items_ustensils") {
        return `
      <div class="tag_choisi tag_ustensils">
          <li class="list_tag">${liste.textContent}</li>
          <i class="far fa-times-circle croix"></i>
        </div>
      `;
      }
    })
    .join("");
}

function filterRecipeWithTags(list, recettes) {
  const tagsTextContent = list.textContent.toLocaleLowerCase();

  resultSearchAndClick = recettes.filter((recipe) => {
    const filterAllElements = recipe.ingredients.filter((ingredient) => {
      if (ingredient.ingredient.toLocaleLowerCase().includes(tagsTextContent)) {
        return ingredient.ingredient
          .toLocaleLowerCase()
          .includes(tagsTextContent);
      } else if (
        recipe.appliance.toLocaleLowerCase().includes(tagsTextContent)
      ) {
        return recipe.appliance.toLocaleLowerCase().includes(tagsTextContent);
      }
    });

    const filterElementDeux = recipe.ustensils.filter((ustensil) => {
      if (ustensil.toLocaleLowerCase().includes(tagsTextContent)) {
        return ustensil.toLocaleLowerCase().includes(tagsTextContent);
      }
    });

    if (
      (filterAllElements && filterAllElements.length > 0) ||
      (filterElementDeux && filterElementDeux.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  });

  console.log(resultSearchAndClick);

  showRemainingListItems(resultSearchAndClick);
  containerRecipes.innerHTML = "";
  displayRecipes(resultSearchAndClick);
  tri(resultSearchAndClick);
}

function showRemainingListItems(result) {
  let newArr = [];

  result.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      newArr.push(ingredient.ingredient);
    });
    recipe.ustensils.forEach((ustensil) => {
      newArr.push(ustensil);
    });
    newArr.push(recipe.appliance);

    newArr = Array.from(new Set(newArr));
  });

  listItems.forEach((item) => {
    if (newArr.includes(item.textContent)) {
      if (item.dataset.choisi == "true") {
        item.style.display = "none";
      } else if (item.dataset) {
        item.style.display = "list-item";
      }
    } else {
      item.style.display = "none";
    }
  });
}

// FERME UN TAG ET RESET LA LISTE DES RECETTES
//

function closingTagOnTheCross(listeTrue) {
  const croix = document.querySelectorAll(".croix");
  for (let i = 0; i < croix.length; i++) {
    croix[i].addEventListener("click", (e) => {
      listeTrue.forEach((ingredient) => {
        if (
          ingredient.textContent == e.target.parentNode.children[0].textContent
        ) {
          ingredient.dataset.choisi =
            ingredient.dataset.choisi == "true" ? "false" : "true";
          filterRecipesOnClick();
          console.log(resultSearchAndClick);
        }
      });
    });
  }
}

// Recherche input Ingredients, Appareils, Ustensils

let listeItemsIngredient = document.querySelectorAll(".items_ingredient");
let listeItemsAppliance = document.querySelectorAll(".items_appliance");
let listeItemsUstensils = document.querySelectorAll(".items_ustensils");

function SearchItemsInput(input, array, listeItems) {
  input.addEventListener("input", (e) => {
    let resultSearchInput = array.filter((item) => {
      return item
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    console.log(resultSearchInput);

    listeItems.forEach((item) => {
      if (resultSearchInput.includes(item.textContent)) {
        item.style.display = "list-item";
      } else {
        item.style.display = "none";
      }
    });
  });
}

function tri(recipes) {
  let allIngredients = [];
  let allAppliances = [];
  let allUstensils = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.push(ingredient.ingredient);
    });
    allIngredients = Array.from(new Set(allIngredients));

    allAppliances.push(recipe.appliance);
    allAppliances = Array.from(new Set(allAppliances));

    recipe.ustensils.forEach((ustensil) => {
      allUstensils.push(ustensil);
    });

    allUstensils = Array.from(new Set(allUstensils));
  });

  SearchItemsInput(inputIngredient, allIngredients, listeItemsIngredient);
  SearchItemsInput(inputAppliance, allAppliances, listeItemsAppliance);
  SearchItemsInput(inputUstensils, allUstensils, listeItemsUstensils);
}

if (searchInput.value.length < 3) {
  tri(recipes);
}
