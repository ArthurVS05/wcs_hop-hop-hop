/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useContext, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DotsUpdateRecipe from "./DotsUpdateRecipe";
import { RecipeContext } from "../../context/RecipeContext";

export default function MapRecipeDivPC({ r_id, r_name, r_category, u_name }) {
  const { setRecipeId, setComponentToShow } = useContext(RecipeContext);

  const [showDotsUpdateRecipe, setShowDotsUpdateRecipe] = useState(null);

  // console.info("showDots", showDotsUpdateRecipe);
  const handleClickDots = (recipeIdClicked) => {
    // Fermer la boîte des points si elle est déjà ouverte pour le même élément
    if (showDotsUpdateRecipe) {
      setShowDotsUpdateRecipe(null);
    } else {
      // Ouvrir la boîte des points pour l'élément correspondant
      setShowDotsUpdateRecipe(recipeIdClicked);
    }
  };
  const storeClickedRecipe = (recipeId) => {
    localStorage.setItem("recipeId", JSON.stringify(recipeId));
  };

  const handleClicRecipe = (recipeIdClicked) => {
    storeClickedRecipe(recipeIdClicked);
    setRecipeId(recipeIdClicked);
    setShowDotsUpdateRecipe(null);
    setComponentToShow("details recipe");
  };

  return (
    <div className="flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3 pr-0">
      <button
        type="button"
        key={r_id}
        name={r_category}
        onClick={() => handleClicRecipe(r_id)}
        className="flex w-full mr-4 flex-col items-start"
      >
        <h2 className="font-bold">{r_name}</h2>
        <h3 className="font-light">{`Ajoutée par ${u_name}`}</h3>
      </button>
      <div className="relative flex items-center">
        <button
          type="button"
          aria-label="ouvrir la boîte pour modifier ou supprimer la recette"
          onClick={() => handleClickDots(r_id)}
        >
          <HiOutlineDotsVertical className="text-3xl w-fit text-red-default mt-0 pr-3" />
        </button>
        {showDotsUpdateRecipe === r_id && (
          <DotsUpdateRecipe
            showDotsUpdateRecipe={showDotsUpdateRecipe}
            setShowDotsUpdateRecipe={setShowDotsUpdateRecipe}
            recipeId={r_id}
            recipeName={r_name}
          />
        )}
      </div>
    </div>
  );
}
