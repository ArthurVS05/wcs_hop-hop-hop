/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import CloseBox from "./CloseBox";
import notify from "../Notify/Notify";
import { RecipeContext } from "../../context/RecipeContext";

export default function DotsUpdateRecipe({
  setShowDotsUpdateRecipe,
  recipeId,
  recipeName,
}) {
  const { setRecipeUpdated } = useContext(RecipeContext);

  const [newRecipeName, setNewRecipeName] = useState({ name: recipeName });
  const [deleteRecipe, setDeleteRecipe] = useState(false);

  const handleClicClose = () => {
    setShowDotsUpdateRecipe(null);
    setNewRecipeName({ name: recipeName });
    setDeleteRecipe(false);
  };

  const handleClicDelete = () => {
    setDeleteRecipe(!deleteRecipe);
  };

  const handleConfirmDelete = () => {
    const fetchDeleteRecipe = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/recipes/${recipeId}`,
          {
            method: "DELETE",
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
          notify(
            "errorCreation",
            errorResponse.message || "échec pour supprimer la recette"
          );
        }
        const result = await results.json();
        notify("success", result);
        setRecipeUpdated((prev) => !prev);
        setShowDotsUpdateRecipe(null);
        setNewRecipeName({ name: recipeName });
        setDeleteRecipe(false);
      } catch (error) {
        console.info("Erreur pour supprimer la recette :", error);
      }
    };
    fetchDeleteRecipe();
  };

  const handleChangeRecipeName = (e) => {
    setNewRecipeName({ name: e.target.value });
  };

  const handleSubmitFormRename = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/recipes/${recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(newRecipeName),
    })
      .then((res) => res.json())
      .then((data) => {
        notify("success", data);
        setShowDotsUpdateRecipe(null);
        setRecipeUpdated((prev) => !prev);
      })
      .catch((err) => console.error("Erreur : ", err));
  };
  return (
    <div className="absolute right-0 -top-5 z-10 flex flex-col items-end h-fit w-80 px-5 pt-2 pb-20 bg-cream border-[1px] border-red-default text-cream gap-3 shadow-md rounded-xl rounded-tr-none">
      <CloseBox
        onClick={handleClicClose}
        bgColor="red-default"
        hoverColor="orange-default"
        activeColor="orange-lighter"
      />
      <form className="w-full flex flex-col" onSubmit={handleSubmitFormRename}>
        <label
          htmlFor="rename"
          className="text-dark-default text-lg font-bold mb-3 w-full t text-center"
        >
          Renommer la recette
        </label>
        <input
          type="text"
          placeholder={newRecipeName.name}
          value={newRecipeName.name}
          className="text-dark-default border border-solid border-red-default h-fit resize-y mb-4 py-2 px-5 placeholder:text-dark-default"
          onChange={handleChangeRecipeName}
        />
        <button
          type="submit"
          name="rename"
          className="bg-red-default  hover:bg-green-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        >
          Enregistrer
        </button>
      </form>
      <label
        htmlFor="delete"
        className="text-dark-default text-lg font-bold mt-2 w-full text-center"
      >
        Supprimer la recette
      </label>
      {!deleteRecipe && (
        <button
          type="button"
          name="delete"
          className="bg-orange-default  hover:bg-green-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
          onClick={handleClicDelete}
        >
          Supprimer
        </button>
      )}
      {deleteRecipe && (
        <>
          <button
            type="button"
            name="confirm-delete"
            className="border border-red-default  hover:border-red-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-red-default font-semibold shadow-md shadow-dark-shadow"
            onClick={handleClicDelete}
          >
            Annuler
          </button>
          <button
            type="button"
            name="confirm-delete"
            className="bg-red-default  hover:bg-green-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
            onClick={handleConfirmDelete}
          >
            Confirmer
          </button>
        </>
      )}
    </div>
  );
}
