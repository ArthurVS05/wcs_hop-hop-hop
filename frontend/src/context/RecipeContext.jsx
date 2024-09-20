/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const RecipeContext = createContext();

export default function RecipeProvider({ children }) {
  // On gère le state du filtre de catégorie sélectionné
  // Par défaut : filtre "Toutes"
  const [filterSelected, setFilterSelected] = useState("Toutes");

  // State pour gérer les recettes du groupe
  const [recipesGroup, setRecipesGroup] = useState(null);

  // state pour re-render si recipe updated
  const [recipeUpdated, setRecipeUpdated] = useState(false);

  // state pour gérer l'id de la recette cliquée
  const [recipeId, setRecipeId] = useState(
    localStorage.getItem("recipeId") || null
  );

  // state pour gérer si on affiche les composents afficher la recette, modifier la recette ou créer une recette
  const currentRecipe = JSON.parse(localStorage.getItem("recipeSelected"));
  const [componentToShow, setComponentToShow] = useState(
    currentRecipe ? "details recipe" : null
  );

  const recipesCategories = [
    { id: 0, name: "Toutes" },
    { id: 1, name: "Apéritifs" },
    { id: 2, name: "Entrées" },
    { id: 3, name: "Plats" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Boissons" },
    { id: 6, name: "Petits-déjeuners" },
  ];

  // recipe à afficher
  const [recipe, setRecipe] = useState();

  return (
    // On fournit le state Recipe aux composants enfants
    <RecipeContext.Provider
      value={{
        filterSelected,
        setFilterSelected,
        recipesGroup,
        setRecipesGroup,
        recipeUpdated,
        setRecipeUpdated,
        recipeId,
        setRecipeId,
        componentToShow,
        setComponentToShow,
        currentRecipe,
        recipesCategories,
        recipe,
        setRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
