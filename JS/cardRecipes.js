export default class RecipesCard {
  constructor(recipe, name, time, description, ingredients) {
    this.recipes = recipe;
    this.name = name;
    this.time = time;
    this.description = description;
    this.ingredients = ingredients;

    // Method Call

    this.createRecipeContainer(
      this.recipes,
      this.name,
      this.time,
      this.description,
      this.ingredients
    );
  }
  createRecipeContainer(
    recipe,
    recipeName,
    recipeTime,
    recipeDescription,
    recipeIngredient
  ) {
    const article = document.createElement("article");
    article.setAttribute("class", "recette");

    const imageGrise = document.createElement("div");
    imageGrise.setAttribute("class", "img_grise");

    const footer = document.createElement("footer");
    footer.setAttribute("class", "recette_infos");

    const infosNameTimer = document.createElement("div");
    infosNameTimer.setAttribute("class", "recette_infos_name");
    infosNameTimer.innerHTML = `<h2>${recipeName}</h2>
      <div class="recette_infos_timer">
        <i class="far fa-clock"></i>
        <h3>${recipeTime} min</h3>`;

    const infosIngredients = document.createElement("div");
    infosIngredients.setAttribute("class", "recette_infos_ingredients");

    const listeIngredients = document.createElement("ul");
    listeIngredients.setAttribute("class", "card_liste_ingredients");

    recipeIngredient.forEach((ingredient) => {
      if (ingredient.quantity) {
        if (ingredient.unit && ingredient.quantity) {
          listeIngredients.insertAdjacentHTML(
            "beforeend",
            `<li><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity} ${ingredient.unit}</li>`
          );
        } else {
          listeIngredients.insertAdjacentHTML(
            "beforeend",
            `<li><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</li>`
          );
        }
      } else {
        listeIngredients.insertAdjacentHTML(
          "beforeend",
          `<li><strong>${ingredient.ingredient}</strong></li>`
        );
      }
    });

    const descriptionRecettes = document.createElement("p");
    descriptionRecettes.setAttribute("class", "description");
    descriptionRecettes.innerHTML = `${recipeDescription}`;

    const ustensils = document.createElement("p");
    ustensils.setAttribute("class", "ustensils");
    ustensils.style.display = "none";
    ustensils.innerHTML = `${recipe.ustensils}`;

    article.appendChild(imageGrise);
    article.appendChild(footer);
    footer.appendChild(infosNameTimer);
    footer.appendChild(infosIngredients);
    infosIngredients.appendChild(listeIngredients);
    infosIngredients.appendChild(descriptionRecettes);
    infosIngredients.appendChild(ustensils);

    document.querySelector(".recettes_container").appendChild(article);
  }
}
