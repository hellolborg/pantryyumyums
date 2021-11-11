import Button from "@mui/material/Button";
import MealResult from "./MealResult";
import IngredientList from "./IngredientLists";
import { useEffect, useState } from "react";
import { PROTEIN, VEGETABLES, GRAINS } from "../data/ingredientList";
import styles from '../styles/Home.module.css';

function Home() {
  const [ingredientSelected, setIngredientSelected] = useState(new Set());
  const [initialized, setInitialized] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipesMatched, setRecipesMatched] = useState([]);

  const handleFindRecipes = (event) => {
    event.preventDefault();
    if (ingredientSelected.size == 0) {
      setRecipesMatched([]);
      return;
    }
    let matchedMeals = [];
    for (let meal of recipes) {
      let allFound = true;
      for (let ingredient of ingredientSelected) {
        if (!meal.ingredients.has(ingredient)) {
          allFound = false;
          break;
        }
      }
      if (allFound) {
        matchedMeals.push(meal);
      }
    }
    console.log(matchedMeals);
    setRecipesMatched(matchedMeals);
  };

  const handleClick = (e) => {
    console.log(recipes);
    console.log(e);
    let updatedCheckedState = new Set(ingredientSelected);
    const ingredient = e.target.name;
    if (e.target.checked) {
      updatedCheckedState.add(ingredient);
    } else {
      updatedCheckedState.delete(ingredient);
    }
    setIngredientSelected(updatedCheckedState);
  };

  //Grabbing the API data only once and storing it
  useEffect(() => {
    if (!initialized) {
      loadRecipes();
      setInitialized(true);
    }
  });

  const loadRecipes = () => {
    async function fetchRecipes() {
      let localRecipes = [];
      try {
        //Only grabbing all recipes beginning with letters b & c so I don't hit the API too much.
        const startingLetters = ["b", "c"];

        for (const startingLetter of startingLetters) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${startingLetter}`);
          const recipeData = await response.json();

          for (const meal of recipeData.meals) {
            let recipeIngredients = new Set();
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              if (ingredient) {
                recipeIngredients.add(ingredient);
              }
            }

            localRecipes.push({
              name: meal.strMeal,
              ingredients: recipeIngredients,
              sourceURL: meal.strSource,
              thumb: meal.strMealThumb,
            });
          }
        }

        setRecipes(localRecipes);
      } catch (error) {
        console.log("there was an error", error);
      }
    }
    fetchRecipes();
  };

  return (
    <div className="App">
      <main>
        <div className="wrapper">
          <p>
            Check off the ingredients you have, and we'll help you find a
            recipe!
          </p>
          <section className="ingredientsList">
            <div>
              <IngredientList
                ingredients={PROTEIN}
                ingredientType="Protein"
                ingredientSelected={ingredientSelected}
                handleClick={handleClick}
              />
            </div>
            <div>
              <IngredientList
                ingredients={VEGETABLES}
                ingredientType="Vegetables"
                ingredientSelected={ingredientSelected}
                handleClick={handleClick}
              />
            </div>
            <div>
              <IngredientList
                ingredients={GRAINS}
                ingredientType="Grains"
                ingredientSelected={ingredientSelected}
                handleClick={handleClick}
              />
            </div>
          </section>
          <Button
            onClick={handleFindRecipes}
            style={{ backgroundColor: "#FF6B6B", color: "#FFFFFF" }}
          >
            {" "}
            Find Recipes!
          </Button>
        </div>

        <section className="results">
          <div className="wrapper">
            {recipesMatched.length > 0 ? 
              <h2>Recipes with Selected Ingredients</h2>
              : <h2>No Results to Display. Select Ingredients.</h2>
            }
            <ul className="flexGallery">
              {recipesMatched.map((recipe) => {
                return <MealResult meal={recipe} />;
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
