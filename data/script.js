// getting elements and classes
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const title = document.querySelector("#search");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);

// close button
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients
function getMealList() {
  // removing the spaces using .trim()
  let searchInputTxt = document.getElementById("search-input").value.trim();
  //removing the text Our Finds For Your Search
  title.classList.remove("hidden");
  //getting data from API
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`
  )
    // promises
    .then((response) => response.json())
    .then((data) => {
      let html1 = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html1 += `
            
          
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                    </div>                
                    <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Recipe Ingredients</a>
                    </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else if (searchInputTxt == "") {
        html1 = "Enter Category Name/Type  !";
        mealList.classList.add("notFound");
      } else {
        html1 = "Sorry, No meals found for the searched Category!";
        mealList.classList.add("notFound");
      }
      // inputting data into Html container
      mealList.innerHTML = html1;
    });
}

// getting response to the funtions from API
function getMealRecipe(ele) {
  ele.preventDefault();
  if (ele.target.classList.contains("recipe-btn")) {
    let mealItem = ele.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      // promises
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// modal output

function mealRecipeModal(meal) {
  // array indexing object has only 1 element
  meal = meal[0];
  let html3 = `
  <h2 class = "recipe-title">${meal.strMeal}</h2> <br>
  
        <div class = "recipe-instruct">
            <h3>Ingredients:- </h3>
            <p>${meal.strIngredient1}<br>
            ${meal.strIngredient2}<br>
            ${meal.strIngredient3}<br>
            ${meal.strIngredient4}<br>
            ${meal.strIngredient5}<br>
            ${meal.strIngredient6}<br>
            ${meal.strIngredient7}<br>
            ${meal.strIngredient8}<br>
            ${meal.strIngredient9}<br>
            ${meal.strIngredient10}<br>
            </p>
        </div>
        <div class = "recipe-link">
        <a href = "${meal.strYoutube}" target = "_blank">Click here to know More! </a>
        </div>
    `;
  mealDetailsContent.innerHTML = html3;
  // Show recipe or Ingredient Button
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

// random  meal function

const mealList$random = document.getElementById("meal-random");

const mealDetailsContent$random = document.querySelector(
  ".meal-details-content-random"
);

const abc = document.querySelector(".meal-details");

const recipeCloseBtn$random = document.getElementById(
  "random-recipe-close-btn"
);

recipeCloseBtn.onclick = () => {
  abc.classList.remove('"random-showRecipe"');
};

//////////////////
// random funtion

function random() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    //promises
    .then((response) => response.json())
    .then((data) => {
      let htmlr = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          htmlr += `       
                      <h1>Our Suggested Meal for your day</h1>
                      <div class = "meal-item-random" data-id = "${meal.idMeal}">
                      <div class = "meal-img-random">
                      <img src = "${meal.strMealThumb}" alt = "food"></div>
                      <div class = "meal-name-random">
                      <h3>${meal.strMeal}</h3>
                      <a id="recipe-btn-random" class = "recipe-btn-random">Get Ingredients</a></div>
                      </div>
                `;
        });
      }

      mealList$random.innerHTML = htmlr;
      // event listeners

      let html2 = `
          
        
                <h2 class = "recipe-title-random">${data.meals[0].strMeal}</h2>
                <div class = "recipe-instruct-random">
                    <h3>INGREDIENTS:</h3>
                    <p>${data.meals[0].strIngredient1}<br>
                    ${data.meals[0].strIngredient2}<br>
                    ${data.meals[0].strIngredient3}<br>
                    ${data.meals[0].strIngredient4}<br>
                    ${data.meals[0].strIngredient5}<br>
                    ${data.meals[0].strIngredient6}<br>
                    ${data.meals[0].strIngredient7}<br>
                    ${data.meals[0].strIngredient8}<br>
                    ${data.meals[0].strIngredient9}<br>
                    ${data.meals[0].strIngredient10}<br>           
                    </p>
                </div>
                <div class = "recipe-link-random">
                <a href = "${data.meals[0].strYoutube}" target = "_blank">Watch Video</a>
                </div>
            `;

      mealDetailsContent$random.innerHTML = html2;

      //displaying the in Ingredient Modal
      document.getElementById("recipe-btn-random").onclick = () => {
        mealDetailsContent$random.parentElement.classList.add(
          "random-showRecipe"
        );
      };
    });
}

// closing the opened modal (CSS)
recipeCloseBtn$random.addEventListener("click", () => {
  mealDetailsContent$random.parentElement.classList.remove("random-showRecipe");
});

// starting the random function
window.onload = () => {
  random();
};
