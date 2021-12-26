import { recipes } from "./data.js";

export default class DropDownButton {
  constructor(nameOfId, input, listeTag) {
    this.input = input;
    this.nameOfId = nameOfId;
    this.listeTag = listeTag;
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.allItems = [];

    //Call Method

    this.methodBoucle(this.nameOfId);
    this.DeleteDoublons();

    if (nameOfId === "ingredient") {
      this.searchElement(this.allIngredients, this.listeTag, this.nameOfId);
    } else if (nameOfId === "appliance") {
      this.searchElement(this.allAppliances, this.listeTag, this.nameOfId);
    } else if (nameOfId === "ustensils") {
      this.searchElement(this.allUstensils, this.listeTag, this.nameOfId);
    }
  }

  methodBoucle(nameOfId) {
    recipes.forEach((recipe) => {
      if (nameOfId === "ingredient") {
        recipe.ingredients.forEach((items) => {
          this.allIngredients.push(items.ingredient);
        });
      }
      if (nameOfId === "appliance") {
        this.allAppliances.push(recipe.appliance);
      }
      if (nameOfId === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
        });
      }
    });
  }

  DeleteDoublons() {
    this.allIngredients = Array.from(new Set(this.allIngredients));
    this.allAppliances = Array.from(new Set(this.allAppliances));
    this.allUstensils = Array.from(new Set(this.allUstensils));
  }

  searchElement(array, parent, nameOfId) {
    let search = this.input;
    search.addEventListener("keyup", (e) => {
      let result = array.filter((item) =>
        item.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      );
      console.log(result);
      parent.innerHTML = result
        .map((item) => {
          if (nameOfId === "ingredient") {
            return `<li class="items ingredient" data-choisi="false">${item}</li>`;
          }
          if (nameOfId === "appliance") {
            return `<li class="items appliance" data-choisi="false">${item}</li>`;
          }
          if (nameOfId === "ustensils") {
            return `<li class="items ustensils" data-choisi="false">${item}</li>`;
          }
        })
        .join("");
    });
  }
}
