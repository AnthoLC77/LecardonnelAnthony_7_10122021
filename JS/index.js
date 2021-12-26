//--------------------------------------
import SearchAll from "./searchAll.js";
import DropDownButton from "./dropDownMenu.js";
import { recipes } from "./data.js";
import Card from "./card.js";

//--------------------------------------

//--------------------------------------------

new Card(recipes);

let articlesArray = [...document.querySelectorAll(".recette")];
console.log(articlesArray);

let search = document.getElementById("searchBar");
search.addEventListener("input", (e) => {
  console.log(e.target.value);
});

// Search bar ingredients

// Input search creation
const inputIngredient = document.getElementById("ingrédientsSearchDeux");
const inputAppliance = document.getElementById("applianceSearchDeux");
const inputUstensils = document.getElementById("ustensilsSearchDeux");

const listeUlIngredient = document.querySelector(".liste_ingredients");
const listeUlAppliance = document.querySelector(".liste_appareils");
const listUlUstensils = document.querySelector(".liste_ustensils");

new SearchAll(listeUlIngredient, listeUlAppliance, listUlUstensils);

new DropDownButton("ingredient", inputIngredient, listeUlIngredient);
new DropDownButton("appliance", inputAppliance, listeUlAppliance);
new DropDownButton("ustensils", inputUstensils, listUlUstensils);

// Open close Input Search
const inputIngredientInactive = document.querySelector(
  ".first_input_ingredients"
);
const inputIngredientActive = document.querySelector(
  ".second_input_ingredients"
);

const inputAppareilInactive = document.querySelector(".first_input_appareils");

const inputAppareilActive = document.querySelector(".second_input_appareils");

const inputUstensileInactive = document.querySelector(
  ".first_input_ustensiles"
);

const inputUstensileActive = document.querySelector(".second_input_ustensiles");

function openDropDown(inputInactive, inputActive) {
  inputInactive.addEventListener("click", (e) => {
    inputInactive.style.display = "none";
    inputActive.style.display = "block";
    inputActive.firstChild.nextElementSibling.focus();
  });
}
openDropDown(inputIngredientInactive, inputIngredientActive);
openDropDown(inputAppareilInactive, inputAppareilActive);
openDropDown(inputUstensileInactive, inputUstensileActive);

function closeDropDownByArrow(a, b, c, d) {
  if (a.id === b) {
    document.querySelector(c).addEventListener("click", (e) => {
      a.style.display = "none";
      d.style.display = "block";
    });
  } else {
    console.log("Non");
  }
}

closeDropDownByArrow(
  inputIngredientActive,
  "second_input1",
  ".arrow_up1",
  inputIngredientInactive
);

closeDropDownByArrow(
  inputAppareilActive,
  "second_input2",
  ".arrow_up2",
  inputAppareilInactive
);

closeDropDownByArrow(
  inputUstensileActive,
  "second_input3",
  ".arrow_up3",
  inputUstensileInactive
);

function closeDropDownMenuClickOutside(inputActive, inputInactive) {
  document.addEventListener("click", (e) => {
    if (
      e.target.parentNode !== inputActive &&
      e.target.parentNode !== inputInactive
    ) {
      inputActive.style.display = "none";
      inputInactive.style.display = "block";
    }
  });
}

closeDropDownMenuClickOutside(inputIngredientActive, inputIngredientInactive);
closeDropDownMenuClickOutside(inputAppareilActive, inputAppareilInactive);
closeDropDownMenuClickOutside(inputUstensileActive, inputUstensileInactive);

/*

// Liste items Click
const listes = document.querySelectorAll(".items");
//console.log(listes);

listes.forEach((element) => {
  element.addEventListener("click", listeChoisi);
});

function listeChoisi() {
  this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
  returnTag();
}

function returnTag() {
  const listeTrue = Array.from(
    document.querySelectorAll(".items[data-choisi='true']")
  );

  console.log(listeTrue);

  document.getElementById("tags_choisi").innerHTML = listeTrue
    .map((item) => {
      return `<li class="list_tag">${item.textContent}</li>`;
    })
    .join("");
}*/
