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

//------------------------------------------------------------------------------------

// RECHERCHE BARRE PRINCIPAL

const searchInput = document.getElementById("searchBar");
let containerRecipes = document.querySelector(".recettes_container");
const listItems = document.querySelectorAll(".items");

searchInput.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    const resultFilter = recipes.filter((recipe) => {
      const inputValue = e.target.value.toLocaleLowerCase();

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

    console.log(resultFilter);

    containerRecipes.innerHTML = "";
    displayRecipes(resultFilter);

    // Renvoie les listes items filtré selon les recettes restantes

    new DropDownButton(
      "ingredient",
      inputIngredient,
      listeUlIngredient,
      resultFilter
    );

    new DropDownButton(
      "appliance",
      inputAppliance,
      listeUlAppliance,
      resultFilter
    );
    new DropDownButton(
      "ustensils",
      inputUstensils,
      listUlUstensils,
      resultFilter
    );
  } else {
    containerRecipes.innerHTML = "";
    displayRecipes(recipes);

    new DropDownButton(
      "ingredient",
      inputIngredient,
      listeUlIngredient,
      recipes
    );

    new DropDownButton("appliance", inputAppliance, listeUlAppliance, recipes);
    new DropDownButton("ustensils", inputUstensils, listUlUstensils, recipes);
  }
});

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

let result = [];
let stockListe = [];

listItems.forEach((item) => {
  item.addEventListener("click", triTags);
});

function triTags(e) {
  this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
  displayTag();
}

function displayTag(e) {
  const listTrue = Array.from(
    document.querySelectorAll(".items[data-choisi='true']")
  );

  console.log(listTrue);

  createTagsByColor(listTrue);

  // Filter selon le nombre de tag séléctionné
  listTrue.forEach((list) => {
    if (listTrue.length == 1) {
      filterRecipeWithTags(list, recipes);
    } else if (listTrue.length == 2) {
      filterRecipeWithTags(list, result);
    } else if (listTrue.length == 3) {
      filterRecipeWithTags(list, result);
    }
  });

  // Si aucun tag n'est séléctionné on reset la liste des recettes
  if (listTrue.length == 0) {
    containerRecipes.innerHTML = "";
    displayRecipes(recipes);

    new DropDownButton(
      "ingredient",
      inputIngredient,
      listeUlIngredient,
      recipes
    );

    new DropDownButton("appliance", inputAppliance, listeUlAppliance, recipes);
    new DropDownButton("ustensils", inputUstensils, listUlUstensils, recipes);
  }

  closingTagOnTheCross(listTrue);
}

//-----------------------------------------------------------------------

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

  result = recettes.filter((recipe) => {
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

  console.log(result);

  new DropDownButton("ingredient", inputIngredient, listeUlIngredient, result);
  new DropDownButton("appliance", inputAppliance, listeUlAppliance, result);
  new DropDownButton("ustensils", inputUstensils, listUlUstensils, result);

  containerRecipes.innerHTML = "";
  displayRecipes(result);
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
          displayTag();
        }
      });
    });
  }
}

// AFFICHE LES LISTES DISPO EN FONCTION DES RECETTES
//
/*
function displayListeItemsInput(result) {
  result.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      stockListe.push(ingredient.ingredient);
      stockListe = Array.from(new Set(stockListe));
    });
    recipe.ustensils.forEach((ustensil) => {
      stockListe.push(ustensil);
      stockListe = Array.from(new Set(stockListe));
    });
    stockListe.push(recipe.appliance);
    stockListe = Array.from(new Set(stockListe));

    arrayOfItems.forEach((item) => {
      if (stockListe.includes(item.textContent)) {
        console.log("oui");
        item.classList.toggle("affiche");
        //  console.log(item);
      } else {
        console.log("non");
        item.classList.toggle("none");
        //  console.log(item);
      }
    });
  });
}

/*
    arrayOfItems.forEach((item) => {
      if (
        item.className == "items items_ingredient affiche" ||
        item.className == "items items_ustensils affiche" ||
        item.className == "items items_appliance affiche"
      ) {
        item.classList.remove("affiche");
      } else if (
        item.className == "items items_ingredient none" ||
        item.className == "items items_ustensils none" ||
        item.className == "items items_appliance none"
      ) {
        item.classList.remove("none");
      }
    });*/

// stockListe = [];
//console.log(stockListe);

// Reset liste Input*/
