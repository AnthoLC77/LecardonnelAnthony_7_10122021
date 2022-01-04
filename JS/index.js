//--------------------------------------
import SearchAll from "./searchAll.js";
import DropDownButton from "./dropDownMenu.js";
import { recipes } from "./data.js";
import RecipesCard from "./cardRecipes.js";

//--------------------------------------
displayRecipes(recipes);

// Search bar name, ingredients, description [PROGAMMATION FONCTIONNELLE]

const searchInput = document.getElementById("searchBar");
let containerRecipes = document.querySelector(".recettes_container");

searchInput.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    const resultFilter = recipes.filter((recipe) => {
      const inputValue = e.target.value.toLocaleLowerCase();

      // FILTRE NAME, INGREDIENTS, DESCRIPTION

      const filterAll = recipe.ingredients.filter((ingredient) => {
        if (ingredient.ingredient.toLocaleLowerCase().includes(inputValue)) {
          console.log("ingredient");
          return ingredient.ingredient
            .toLocaleLowerCase()
            .includes(searchInput.value.toLocaleLowerCase());
        } else if (recipe.name.toLocaleLowerCase().includes(inputValue)) {
          console.log("name");
          return recipe.name.toLocaleLowerCase().includes(inputValue);
        } else if (
          recipe.description.toLocaleLowerCase().includes(inputValue)
        ) {
          console.log("descript");
          return recipe.description.toLocaleLowerCase().includes(inputValue);
        }
      });

      if (filterAll && filterAll.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    containerRecipes.innerHTML = "";

    displayRecipes(resultFilter);
  } else {
    containerRecipes.innerHTML = "";

    displayRecipes(recipes);
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

// Search bar name, ingredients, description [BOUCLES NATIVES]
/*

const searchInput = document.getElementById("searchBar");
let containerRecipes = document.querySelector(".recettes_container");

searchInput.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    const inputValueTolowerCase = e.target.value.toLocaleLowerCase();
    let results = [];

    for (let recipe of recipes) {
      // console.log(recipe);

      if (
        recipe.name.toLocaleLowerCase().includes(inputValueTolowerCase) ||
        recipe.description.toLocaleLowerCase().includes(inputValueTolowerCase)
      ) {
        results.push(recipe);
        console.log(results);

        containerRecipes.innerHTML = "";

        for (let result of results) {
          console.log(result);
          new RecipesCard(
            result,
            result.name,
            result.time,
            result.description,
            result.ingredients
          );
        }
      }
    }
  } else {
    containerRecipes.innerHTML = "";

    displayRecipesDeux(recipes);
  }
});

function displayRecipesDeux(recipes) {
  for (let recipe of recipes) {
    new RecipesCard(
      recipe,
      recipe.name,
      recipe.time,
      recipe.description,
      recipe.ingredients
    );
  }
}*/

// Input search creation
const inputIngredient = document.getElementById("ingrédientsSearchDeux");
const inputAppliance = document.getElementById("applianceSearchDeux");
const inputUstensils = document.getElementById("ustensilsSearchDeux");

const listeUlIngredient = document.querySelector(".liste_ingredients");
const listeUlAppliance = document.querySelector(".liste_appareils");
const listUlUstensils = document.querySelector(".liste_ustensils");

new SearchAll(listeUlIngredient, listeUlAppliance, listUlUstensils);

new DropDownButton("ingredient", inputIngredient, listeUlIngredient);
new DropDownButton("appliance", inputAppliance, listeUlAppliance);
new DropDownButton("ustensils", inputUstensils, listUlUstensils);

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

// Search And click Tags

// Liste items Click
const listesIngredients = document.querySelectorAll(".items_ingredient");

//console.log(listes);

listesIngredients.forEach((element) => {
  element.addEventListener("click", listeChoisi);
});

function listeChoisi() {
  this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
  displayTag();
  triTagsIngredients();
}

function displayTag() {
  const crossIcone = document.getElementById("list_tags");
  const listeTrue = Array.from(
    document.querySelectorAll(".items_ingredient[data-choisi='true']")
  );

  console.log(listeTrue);

  document.getElementById("list_tags").innerHTML = listeTrue
    .map((item) => {
      return `
      <div class="list_tag_choisi">
        <li class="list_tag">${item.textContent}</li>
        <i class="far fa-times-circle croix"></i>
      </div>`;
    })
    .join("");

  const dop = document.querySelector(".list_tag_choisi");
  dop.addEventListener("click", () => {
    listeTrue.forEach((item) => {
      item.dataset.choisi = item.dataset.choisi == "true" ? "false" : "true";
      dop.style.display = "none";
      displayRecipes(recipes);
    });
  });
}

console.log(recipes);

function triTagsIngredients() {
  let targetValue = "";

  const listChoisiIngredient = Array.from(
    document.querySelectorAll(".items_ingredient[data-choisi='true']")
  );

  // console.log(listChoisiIngredient);

  listChoisiIngredient.forEach((item) => {
    targetValue = item.textContent;
  });

  const clickResult = recipes.filter((recipe) => {
    const result = recipe.ingredients.filter((ingredient) => {
      if (
        ingredient.ingredient
          .toLocaleLowerCase()
          .includes(targetValue.toLocaleLowerCase())
      ) {
        return ingredient.ingredient
          .toLocaleLowerCase()
          .includes(targetValue.toLocaleLowerCase());
      }
    });
    if (result && result.length > 0) {
      return true;
    } else {
      return false;
    }
  });

  containerRecipes.innerHTML = "";
  displayRecipes(clickResult);
}
