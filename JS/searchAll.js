import { recipes } from "./data.js";


export default class SearchAll {
  constructor(liste1, liste2, liste3, listeAll) {
    this.liste1 = liste1;
    this.liste2 = liste2;
    this.liste3 = liste3;
    this.searchAll;
    this.name = [];
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];

    //METHOD CALL

    this.InjectTagsIngredient();
    this.InjectTagsAppliance();
    this.InjectTagsUstensiles();
    this.InjectName();
    //this.searchBarAll();

    this.allItems = [
      ...this.allIngredients,
      ...this.allAppliances,
      ...this.allUstensils,
      ...this.name,
    ];

    this.allItems = Array.from(new Set(this.allItems));

    // console.log(this.allItems);
  }

  InjectTagsIngredient() {
    recipes.forEach((items) => {
      items.ingredients.forEach((item) => {
        this.allIngredients.push(item.ingredient);
      });
    });
    this.allIngredients = Array.from(new Set(this.allIngredients));

    this.liste1.innerHTML = this.allIngredients
      .map((item) => {
        return `<li class="items ingredient" data-choisi="false">${item}</li>`;
      })
      .join("");
  }

  InjectTagsAppliance() {
    recipes.forEach((items) => {
      this.allAppliances.push(items.appliance);
    });
    let results = Array.from(new Set(this.allAppliances));

    this.liste2.innerHTML = results
      .map((item) => {
        return `<li class="items appliance" data-choisi="false">${item}</li>`;
      })
      .join("");
  }

  InjectTagsUstensiles() {
    recipes.forEach((items) => {
      items.ustensils.forEach((item) => {
        this.allUstensils.push(item);
      });
    });
    this.allUstensils = Array.from(new Set(this.allUstensils));

    this.liste3.innerHTML = this.allUstensils
      .map((item) => {
        return `<li class="items ustensils" data-choisi="false">${item}</li>`;
      })
      .join("");
  }

  InjectName() {
    recipes.forEach((items) => {
      this.name.push(items.name);
    });
    this.name = Array.from(new Set(this.name));
  }
  /*
  searchBarAll() {
    const search = document.getElementById("searchBar");
    search.addEventListener("keyup", () => {
      let searchValue = search.value.toLocaleLowerCase();
      let filter = recipes.filter((recipe) => {
        return recipe.name.toLocaleLowerCase().includes(searchValue);
      });
      new Recette(filter);
      console.log(filter);
    });
  }
}*/
}
