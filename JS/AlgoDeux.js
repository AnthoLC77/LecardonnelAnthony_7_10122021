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

/////////////////////////////////////////////////////////////////////////

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

//---------------------------------------------------------------------------------

// Search bar name, ingredients, description [PROGAMMATION FONCTIONNELLE]

const searchInput = document.getElementById("searchBar");
let containerRecipes = document.querySelector(".recettes_container");
let arrayOfItemsD = [...document.querySelectorAll(".items")];
let items = document.querySelectorAll(".items");
console.log(items);

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

    arrayOfItemsD.forEach((item) => {
      console.log(item);
    });
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
