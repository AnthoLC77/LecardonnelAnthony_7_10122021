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
    this.testMethod(recipes);
    this.pushElementInInput(nameOfId);
    //  this.createListeItemsInput(this.nameOfId, recipes);
    /*
    if (nameOfId === "ingredient") {
      this.searchElementInputItems(
        this.allIngredients,
        this.listeTag,
        this.nameOfId
      );
    } else if (nameOfId === "appliance") {
      this.searchElementInputItems(
        this.allAppliances,
        this.listeTag,
        this.nameOfId
      );
    } else if (nameOfId === "ustensils") {
      this.searchElementInputItems(
        this.allUstensils,
        this.listeTag,
        this.nameOfId
      );
    }*/
  }

  testMethod(rec) {
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

  searchElementInputItems(array, nameOfId) {
    let search = this.input;
    search.addEventListener("input", (e) => {
      let result = array.filter((item) =>
        item.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      );

      //this.createListeItemsInput(this.nameOfId, result);

      //  console.log(result);
      const items = document.querySelectorAll(".items_ingredient");
      items.forEach((item) => {
        if (result.includes(item.textContent)) {
          item.style.display = "list-item";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
}
