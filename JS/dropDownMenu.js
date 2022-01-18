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
    this.createListeItemsInput(this.nameOfId, recipes);
    // this.methodTest();

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
    }
  }

  createListeItemsInput(nameOfId, recipes) {
    this.allIngredients = [];
    recipes.forEach((recipe) => {
      if (nameOfId === "ingredient") {
        recipe.ingredients.forEach((items) => {
          this.allIngredients.push(items.ingredient);
        });
        this.allIngredients = Array.from(new Set(this.allIngredients));
        this.triAlphabetiques(this.allIngredients);

        this.listeTag.innerHTML = this.allIngredients
          .map((item) => {
            return `<li class="items items_ingredient" data-choisi="false">${item}</li>`;
          })
          .join("");
      }
      if (nameOfId === "appliance") {
        this.allAppliances.push(recipe.appliance);

        this.allAppliances = Array.from(new Set(this.allAppliances));
        this.triAlphabetiques(this.allAppliances);

        this.listeTag.innerHTML = this.allAppliances
          .map((item) => {
            return `<li class="items items_appliance" data-choisi="false">${item}</li>`;
          })
          .join("");
      }
      if (nameOfId === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
        });

        this.allUstensils = Array.from(new Set(this.allUstensils));
        this.triAlphabetiques(this.allUstensils);

        this.listeTag.innerHTML = this.allUstensils
          .map((item) => {
            return `<li class="items items_ustensils" data-choisi="false" >${item}</li>`;
          })
          .join("");
      }
    });
  }

  triAlphabetiques(array) {
    array.sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  searchElementInputItems(array, parent, nameOfId) {
    let search = this.input;
    search.addEventListener("keyup", (e) => {
      let result = array.filter((item) =>
        item.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      );
      console.log(result);
      parent.innerHTML = result
        .map((item) => {
          if (nameOfId === "ingredient") {
            return `<li class="items items_ingredient">${item}</li>`;
          }
          if (nameOfId === "appliance") {
            return `<li class="items items_appliance">${item}</li>`;
          }
          if (nameOfId === "ustensils") {
            return `<li class="items items_ustensils">${item}</li>`;
          }
        })
        .join("");
    });
  }

  //-------------------------------------------------------------------------
  /*
  methodTest() {
    const testItems = document.querySelectorAll(".items");

    testItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(e.target.dataset);
        item.dataset.choisi = item.dataset.choisi == "true" ? "false" : "true";

        const listTrue = Array.from(
          document.querySelectorAll(".items[data-choisi='true']")
        );

        this.createTagsElement(listTrue);
          /*
        listTrue.forEach((liste) => {
          if (listTrue.length == 1) {
            this.filterRecipeWithTags(liste, this.recipes);
          }
        });
      });
    });
  }

  createTagsElement(listTrue) {
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

  filterRecipeWithTags(list, recettes) {
    const tagsTextContent = list.textContent.toLocaleLowerCase();

    this.result = recettes.filter((recipe) => {
      const filterAllElements = recipe.ingredients.filter((ingredient) => {
        if (
          ingredient.ingredient.toLocaleLowerCase().includes(tagsTextContent)
        ) {
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

    this.methodBoucleD(this.nameOfId, this.result);

    console.log(this.result);
    //displayListeItemsInput(result);
  }*/
}

//----------------------------------------------------

/*
  methodBoucle(nameOfId) {
    this.recipes.forEach((recipe) => {
      if (nameOfId === "ingredient") {
        recipe.ingredients.forEach((items) => {
          this.allIngredients.push(items.ingredient);
        });
        this.allIngredients = Array.from(new Set(this.allIngredients));
        this.triAlphabetiques(this.allIngredients);

        this.listeTag.innerHTML = this.allIngredients
          .map((item) => {
            return `<li class="items items_ingredient" data-choisi="false">${item}</li>`;
          })
          .join("");
      }
      if (nameOfId === "appliance") {
        this.allAppliances.push(recipe.appliance);

        this.allAppliances = Array.from(new Set(this.allAppliances));
        this.triAlphabetiques(this.allAppliances);

        this.listeTag.innerHTML = this.allAppliances
          .map((item) => {
            return `<li class="items items_appliance" data-choisi="false">${item}</li>`;
          })
          .join("");
      }
      if (nameOfId === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
        });

        this.allUstensils = Array.from(new Set(this.allUstensils));
        this.triAlphabetiques(this.allUstensils);

        this.listeTag.innerHTML = this.allUstensils
          .map((item) => {
            return `<li class="items items_ustensils" data-choisi="false" >${item}</li>`;
          })
          .join("");
      }
    });
  }*/
