/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import MapRecipesByCategory from "./MapRecipesByCategory";
import { RecipeContext } from "../../context/RecipeContext";

export default function MapRecipes() {
  const {
    filterSelected,
    recipesGroup,
    // recipesCategories,
  } = useContext(RecipeContext);

  // On récupère les catégories qui ont des recettes
  const categoriesNotEmpty = recipesGroup
    ? [...new Set(recipesGroup.map((recipe) => recipe.r_category))]
    : [];

  const customOrder = [
    "Apéritifs",
    "Entrées",
    "Plats",
    "Desserts",
    "Boissons",
    "Petits-déjeuners",
  ];

  const categoriesNotEmptyAndSorted = categoriesNotEmpty.sort((a, b) => {
    return customOrder.indexOf(a) - customOrder.indexOf(b);
  });

  // // ????????????? stocker est vraimen utile ???
  // const storeRecipesCategories = () => {
  //   localStorage.setItem(
  //     "recipesCategories",
  //     JSON.stringify(recipesCategories)
  //   );
  // };

  // storeRecipesCategories();

  return (
    <div className="flex flex-col gap-5 px-5 pb-20 lg:px-10 w-full">
      {/* Parcourir les recettes par catégorie
      / Par défaut, on affiche toutes les catégories de recettes
      / Si clic, On filtre les catégories par la catégorie cliquée
      */}
      {categoriesNotEmptyAndSorted
        .filter(
          (category) =>
            filterSelected === "Toutes" || category === filterSelected
        )
        .map((category) => (
          <div key={category}>
            <h1 className="text-xl font-bold mb-2">{category.toUpperCase()}</h1>
            <MapRecipesByCategory category={category} />
          </div>
        ))}
      {!recipesGroup && (
        <div className="italic">
          <p>Chargement des recettes...</p>
        </div>
      )}

      {recipesGroup && recipesGroup.length === 0 && (
        <div className="italic">
          <p>Aucune recette à afficher.</p>
          <p>Cliquez sur le bouton "+" pour ajouter une recette.</p>
        </div>
      )}
    </div>
  );
}
