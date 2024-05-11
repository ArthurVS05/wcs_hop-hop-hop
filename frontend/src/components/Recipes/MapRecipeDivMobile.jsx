/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DotsUpdateRecipe from "./DotsUpdateRecipe";

export default function MapRecipeDivMobile({
  r_id,
  r_name,
  r_category,
  u_name,
}) {
  const navigate = useNavigate();

  const [showDotsUpdateRecipe, setShowDotsUpdateRecipe] = useState(null);

  const handleClickDots = (recipeId) => {
    setShowDotsUpdateRecipe(recipeId);
  };

  const storeClickedRecipe = (recipeId) => {
    localStorage.setItem("recipeId", JSON.stringify(recipeId));
  };
  const handleClicRecipe = (recipeId) => {
    storeClickedRecipe(recipeId);
    navigate("/recipes/detail");
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
      <div className="relative flex items-center ">
        <button
          type="button"
          aria-label="ouvrir la boîte avec les boutons modifier et supprimer"
        >
          <HiOutlineDotsVertical
            className="text-3xl w-fit text-red-default mt-0 pr-3"
            onClick={() => handleClickDots(r_id)}
          />
        </button>
        {showDotsUpdateRecipe && showDotsUpdateRecipe === r_id && (
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
