/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ButtonPenModify from "./ButtonPenModify";
import ShowRecipeDivInfo from "./ShowRecipeDivInfo";
import ShowRecipeIconsDetails from "./ShowRecipeIconsDetails";
import { RecipeContext } from "../../context/RecipeContext";
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-useless-fragment */

export default function ShowRecipeDetails() {
  // On récupère le RecipeConext
  const { recipeUpdated, recipeId, setComponentToShow } =
    useContext(RecipeContext);

  const [recipe, setRecipe] = useState();

  const handleClickModify = () => {
    setComponentToShow("modify recipe");
  };

  useEffect(() => {
    if (recipeId) {
      fetch(`http://localhost:3310/api/recipes/${recipeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((res) => {
          localStorage.setItem("recipeSelected", JSON.stringify(res.result[0]));
          setRecipe(JSON.parse(localStorage.getItem("recipeSelected")));
        })
        .catch((err) => console.info("Error fetching recipes data:", err));
    }
  }, [recipeId, recipeUpdated]);

  return (
    <>
      {recipe && recipe.r_id && (
        <main className="relative rounded-t-3xl lg:mt-5 bg-cream shadow-top lg:shadow-none flex flex-col items-center lg:rounded-t-[4rem] lg:bg-none lg:bg-opacity-0">
          <div className=" bg-red-default text-cream text-xl rounded-[12px] h-fit px-4 my-5">
            {recipe.r_category}
          </div>

          <ButtonPenModify
            label="bouton modifier la recette"
            colorBg="bg-red-default"
            onClick={() => handleClickModify(recipe)}
          />

          <h1 className="text-2xl font-bold text-center">{recipe.r_name}</h1>
          {/* section sur le nombre de persons et le temps requis */}
          <section className="bg-red-clear w-full flex justify-center my-4 py-4 gap-10">
            <ShowRecipeIconsDetails
              icon="Persons"
              content={`${recipe.r_nb_persons} pers`}
            />
            <ShowRecipeIconsDetails
              icon="Time"
              content={recipe.r_time_preparation}
            />
          </section>
          {/* section sur les ingrédients et instructions */}
          <section className="px-10 w-full lg:max-w-[950px] text-lg lg:px-20">
            <ShowRecipeDivInfo
              title="Ingrédients"
              text={recipe.r_list_ingredients}
            />
            <ShowRecipeDivInfo
              title="Instructions"
              text={recipe.r_description}
            />
          </section>
        </main>
      )}
    </>
  );
}
