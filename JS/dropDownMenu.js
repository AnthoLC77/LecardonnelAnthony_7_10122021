export default class DropDownButton {
  constructor(nameOfId, input, listeTag, recipes) {
    this.recipes = recipes;
    this.input = input;
    this.nameOfId = nameOfId;
    this.listeTag = listeTag;
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.result = [];

    //Call Method
    this.sortEachElementInArray(recipes);
    this.pushElementInInput(nameOfId);
  }

  sortEachElementInArray(rec) {
    rec.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.allIngredients.push(ingredient.ingredient);
      });
      this.allIngredients = Array.from(new Set(this.allIngredients));
      this.triAlphabetiques(this.allIngredients);

      this.allAppliances.push(recipe.appliance);
      this.allAppliances = Array.from(new Set(this.allAppliances));
      this.triAlphabetiques(this.allAppliances);

      recipe.ustensils.forEach((ustensil) => {
        this.allUstensils.push(ustensil);
      });

      this.allUstensils = Array.from(new Set(this.allUstensils));
      this.triAlphabetiques(this.allUstensils);

      // console.log(this.allIngredients);
    });
  }

  pushElementInInput(nameOfId) {
    if (nameOfId === "ingredient") {
      this.listeTag.innerHTML = this.allIngredients
        .map((item) => {
          return `<li class="items items_ingredient" data-choisi="false">${item}</li>`;
        })
        .join("");
    }

    if (nameOfId === "appliance") {
      this.listeTag.innerHTML = this.allAppliances
        .map((item) => {
          return `<li class="items items_appliance" data-choisi="false">${item}</li>`;
        })
        .join("");
    }

    if (nameOfId === "ustensils") {
      this.listeTag.innerHTML = this.allUstensils
        .map((item) => {
          return `<li class="items items_ustensils" data-choisi="false">${item}</li>`;
        })
        .join("");
    }
  }

  triAlphabetiques(array) {
    array.sort(function (a, b) {
      return a.localeCompare(b);
    });
  }
}
