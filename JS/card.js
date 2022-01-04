//import { recipes } from "./data.js";

export default class Card {
  constructor(recipe) {
    this.container = document.querySelector(".recettes_container");
    this.recipes = recipe;

    // Method Call

    this.test(this.recipes);
  }

  test(recipe) {
    const card = `
      <article class="recette">
          <div class="img_grise"></div>
          <footer class="recette_infos">
            <div class="recette_infos_name">
              <h2>${recipe.name}</h2>
              <div class="recette_infos_timer">
                <i class="far fa-clock"></i>
                <h3>${recipe.time} min</h3>
              </div>
            </div>
            <div class="recette_infos_ingredients">
              <ul class="card_liste_ingredients">
      
              </ul>
              <div class="description">${recipe.description}</div>
              <ul class="liste-ustensils"></ul>
              <p class="card_ustensils">${recipe.appliance}, ${recipe.ustensils}</p>
            </div>
          </footer>
        </article>
    `;

    this.container.innerHTML += card;
  }

  testDeux(recipe) {
    const listeIngredient = document.querySelector(".card_liste_ingredients");
    recipe.ingredients.forEach((items) => {
      let ingredient = "";
      if (items.quantity) {
        if (items.unit && items.quantity) {
          ingredient += `<li>${items.ingredient} : ${items.quantity} ${items.unit} </li>`;
        } else {
          ingredient += `<li>${items.ingredient} : ${items.quantity}</li>`;
        }
      } else {
        ingredient += `<li>${items.ingredient}</li>`;
      }
      listeIngredient.innerHTML += ingredient;
    });
  }
}

/*
  recoverAllRecipes() {
    this.recipes.forEach((recipe) => {
      console.log(recipe);
      this.test(recipe);
      // this.createRecipesDom(recipe);
      this.metho(recipe);
    });
  }

  createRecipesDom(recipe) {
    this.container.insertAdjacentHTML(
      "beforeend",
      `
    <article class="recette">
          <div class="img_grise"></div>
          <footer class="recette_infos">
            <div class="recette_infos_name">
              <h2>${recipe.name}</h2>
              <div class="recette_infos_timer">
                <i class="far fa-clock"></i>
                <h3>${recipe.time} min</h3>
              </div>
            </div>
            <div class="recette_infos_ingredients">
              <ul class="card_liste_ingredients">
                
              </ul>
              <div class="prep">${recipe.description}</div>
              <ul class="liste-ustensils"></ul>
              <p class="card_ustensils">${recipe.appliance} ${recipe.ustensils}</p>
            </div>
          </footer>
        </article>
    `
    );
  }*/

/*
  metho(recipe) {
    let ingredientInfos = "";

    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.quantity) {
        if (ingredient.unit && ingredient.quantity) {
          ingredientInfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity} ${ingredient.unit}</li>`;
        } else {
          ingredientInfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity}</li>`;
        }
      } else {
        ingredientInfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong></li>`;
      }
    });

    document.querySelector(".card_liste_ingredients").innerHTML =
      ingredientInfos;
  }*/