/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleErrorsInput } from "./FormCreateRecipe";
import FormRecipe from "./FormRecipe";
import notify from "../Notify/Notify";
import { RecipeContext } from "../../context/RecipeContext";

export default function FormUpdateRecipe({ desktopOrMobile }) {
  // On récupère le RecipeConext
  const {
    setRecipeUpdated,
    setComponentToShow,
    recipeId,
    recipe,
    recipesCategories,
  } = useContext(RecipeContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const {
    r_name,
    r_description,
    r_nb_persons,
    r_list_ingredients,
    r_category,
    r_time_preparation,
  } = recipe;

  const [errors, setErrors] = useState({
    name: "",
    time_preparation: "",
    list_ingredients: "",
    nb_persons: "",
  });
  // Par défaut, la catégorie de la recette est celle existante
  const [categorySelected, setCategorySelected] = useState(r_category || "");
  const [dataRecipe, setDataRecipe] = useState(() => {
    if (recipe) {
      return {
        name: r_name || "",
        description: r_description || "",
        nb_persons: r_nb_persons || "",
        list_ingredients: r_list_ingredients || "",
        category: r_category || "",
        time_preparation: r_time_preparation || "",
      };
    }
    return {
      name: "",
      description: "",
      nb_persons: "",
      list_ingredients: "",
      category: "",
      time_preparation: "",
    };
  });

  const filteredCategories = recipesCategories.filter(
    (category) => category.name !== "Toutes"
  );

  const handleClickCat = () => {
    setIsOpen(!isOpen);
  };

  const handleClicNewCat = (newCatName) => {
    setCategorySelected(newCatName);
    setDataRecipe({ ...dataRecipe, category: newCatName });
    setIsOpen(!isOpen);
  };

  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataRecipe({ ...dataRecipe, [name]: value });
    handleErrorsInput(errors, name, value, setErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchUpdateRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/recipes/${recipeId}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
            body: JSON.stringify(dataRecipe),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          notify(
            "errorCreation",
            errorResponse.message || "Vérifiez vos données"
          );
        }

        const message = await response.json();
        notify("success", message);
        if (desktopOrMobile === "mobile") {
          navigate("/recipes/detail");
        } else if (desktopOrMobile === "desktop") {
          setRecipeUpdated((prev) => !prev);
          setTimeout(() => {
            setComponentToShow("details recipe");
          }, 500);
        }
      } catch (error) {
        console.info("Erreur pour modifier la recette >>", error);
      }
    };
    // Vérification des erreurs
    const newErrors = {};

    if (categorySelected === null) {
      newErrors.category = "Choisissez une catégorie";
    }

    if (
      errors.name ||
      errors.time_preparation ||
      errors.list_ingredients ||
      errors.nb_persons ||
      newErrors.category
    ) {
      notify("errorInputs", "Vérifiez vos données");
      // Au moins un champ contient une erreur
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    } else {
      fetchUpdateRecipe();
    }
  };

  return (
    <FormRecipe
      handleSubmit={handleSubmit}
      dataRecipe={dataRecipe}
      errors={errors}
      handlChange={handlChange}
      handleClickCat={handleClickCat}
      categorySelected={categorySelected}
      isOpen={isOpen}
      filteredCategories={filteredCategories}
      handleClicNewCat={handleClicNewCat}
    />
  );
}
