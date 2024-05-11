import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { RecipeContext } from "../context/RecipeContext";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";
import MapRecipes from "../components/Recipes/MapRecipes";
import ShowRecipeDetails from "../components/Recipes/ShowRecipeDetails";
import CreateRecipe from "../components/Recipes/CreateRecipe";
import FooterRecipe from "../components/Recipes/FooterRecipe";
import ModifyRecipe from "../components/Recipes/ModifyRecipe";

export default function Recipe() {
  // On récupère le RecipeConext
  const {
    setRecipesGroup,
    recipeUpdated,
    componentToShow,
    setComponentToShow,
    currentRecipe,
  } = useContext(RecipeContext);

  // State pour récupérer le group en cours
  const [group] = useState(JSON.parse(localStorage.getItem("group")));

  // Afficher / Masquer le formulaire "Ajouter une recette"
  const handleClicCreateRecipe = () => {
    if (componentToShow !== "create recipe") {
      setComponentToShow("create recipe");
    } else if (currentRecipe) {
      setComponentToShow("details recipe");
    } else {
      setComponentToShow(null);
    }
  };

  // On récupère les recettes du groupe côté backend
  // On re-fetch si une recette a été modifiée / supprimée / ajoutée
  useEffect(() => {
    const fetchDataRecipesOfGroup = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/recipes/groups/${group.ug_group_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (!results.ok) {
          const errorResponse = await results.json();
          throw new Error(
            errorResponse.message || "Echec pour récupérer les données"
          );
        }
        const { result } = await results.json();
        setRecipesGroup(result);
      } catch (error) {
        console.info("Error fetching recipes data:", error);
      }
    };
    fetchDataRecipesOfGroup();
  }, [recipeUpdated]);

  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <main className=" md:flex rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top overflow-y-auto no-scrollbar">
        <ToastContainer />
        <div className="md:flex-1 z-10 md:shadow-lg lg:rounded-t-[4rem] lg:pt-5 lg:max-w-[800px] md:overflow-y-auto md:no-scrollbar ">
          <FilterCategories />
          <MapRecipes />
        </div>
        {/* Version PC et Tablette */}
        <div className="hidden z-0 md:block md:flex-1 md:overflow-y-auto">
          {componentToShow === "details recipe" && <ShowRecipeDetails />}
          {componentToShow === "create recipe" && <CreateRecipe media="pc" />}
          {componentToShow === "modify recipe" && <ModifyRecipe />}
        </div>
      </main>
      <FooterRecipe handleClicCreateRecipe={handleClicCreateRecipe} />
    </div>
  );
}
