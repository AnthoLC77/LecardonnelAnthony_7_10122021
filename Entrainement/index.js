let cars = [
  {
    name: "gyro",
    vitesse: 87,
    ingredients: [
      {
        ingredient: "salade",
        number: 1,
      },
      {
        ingredient: "tomate",
        number: 3,
      },
      {
        ingredient: "cerise",
        number: 10,
      },
    ],
  },
  {
    name: "johnny",
    vitesse: 56,
    ingredients: [
      {
        ingredient: "salade",
        number: 1,
      },
      {
        ingredient: "tomate",
        number: 1,
      },
    ],
  },
  {
    name: "Hot Pants",
    vitesse: 60,
    ingredients: [
      {
        ingredient: "fraise",
        number: 1,
      },
      {
        ingredient: "pomme",
        number: 4,
      },
    ],
  },
  {
    name: "Pocolo",
    vitesse: 70,
    ingredients: [
      {
        ingredient: "salade",
        number: 1,
      },
      {
        ingredient: "tomate",
        number: 1,
      },
    ],
  },
];

let result = cars.filter((car) => {
  const test = car.ingredients.filter((item) => {
    if (item.number > 2) {
      return true;
    } else {
      return false;
    }
  });

  if (test && test.length > 0) {
    return true;
  } else {
    return false;
  }
});
console.log(result);

//-----------------------------------------------------------

/*
searchInput.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    const resultsFilterIngredienst = recipes.filter((recipe) => {
      const filterIngredients = recipe.ingredients.filter((ingredient) => {
        return ingredient.ingredient
          .toLocaleLowerCase()
          .includes(searchInput.value.toLocaleLowerCase());
      });

      if (filterIngredients && filterIngredients.length > 0) {
        return true;
      } else {
        return false;
      }
    });

    containerRecipes.innerHTML = "";

    resultsFilterIngredienst.forEach((result) => {
      new RecipesCard(
        result,
        result.name,
        result.time,
        result.description,
        result.ingredients
      );
    });

    //  console.log(resultsFilterIngredienst);
  } else {
    containerRecipes.innerHTML = "";

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
});*/
