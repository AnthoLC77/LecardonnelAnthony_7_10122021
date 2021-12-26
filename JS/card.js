//import { recipes } from "./data.js";

export default class Card {
  constructor(recipes) {
    this.container = document.querySelector(".recettes_container");
    this.recipes = recipes;
    // Method Call
    //  this.recoverAllRecipes(this.recipes);
    // this.test();
    this.testDeux();
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

  test(recipes, ingredientInfos) {
    const card = recipes
      .map((recipe) => {
        return `
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
                ${ingredientInfos}
              </ul>
              <div class="prep">${recipe.description}</div>
              <ul class="liste-ustensils"></ul>
              <p class="card_ustensils">${recipe.appliance}, ${recipe.ustensils}</p>
            </div>
          </footer>
        </article>
    `;
      })
      .join("");

    this.container.innerHTML = card;
  }

  testDeux() {
    let ingredientInfos = "";

    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((items) => {
        //  console.log(items);
        if (items.quantity) {
          if (items.unit && items.quantity) {
            ingredientInfos += `<li>${items.ingredient} : ${items.quantity} ${items.unit} </li>`;
          } else {
            ingredientInfos += `<li>${items.ingredient} : ${items.quantity}</li>`;
          }
        } else {
          ingredientInfos += `<li>${items.ingredient}</li>`;
        }
      });
    });

    return this.test(this.recipes, ingredientInfos);
  }
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
}
