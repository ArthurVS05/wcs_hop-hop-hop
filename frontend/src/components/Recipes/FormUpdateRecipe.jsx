/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleErrorsInput } from "./FormCreateRecipe";
import FormRecipe from "./FormRecipe";

export default function FormUpdateRecipe({
  setRecipeUpdated,
  desktopOrMobile,
  setComponentToShow,
}) {
  const navigate = useNavigate();
  // Ouverture de l'input catégorie
  const [isOpen, setIsOpen] = useState(false);
  // state sur l'id de la recette sélectionnée
  const [recipeId] = useState(localStorage.getItem("recipeId"));
  // on gère les données de la recipe
  const recipe = JSON.parse(localStorage.getItem("recipeSelected"));
  const {
    r_name,
    r_description,
    r_nb_persons,
    r_list_ingredients,
    r_category,
    r_time_preparation,
  } = recipe;
  // Gérer les erreurs d'inputs
  const [errors, setErrors] = useState({
    name: "",
    time_preparation: "",
    list_ingredients: "",
    nb_persons: "",
  });
  // Par défaut, la catégorie de la recette est celle existante
  const [categorySelected, setCategorySelected] = useState(r_category || "");
  // on initialise les propriétés avec les valeurs de la recette cliquée
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

  const recipesCategories = [
    { id: 0, name: "Toutes" },
    { id: 1, name: "Apéritifs" },
    { id: 2, name: "Entrées" },
    { id: 3, name: "Plats" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Boissons" },
    { id: 6, name: "Petits-déjeuners" },
  ];

  const filteredCategories = recipesCategories.filter(
    (category) => category.name !== "Toutes"
  );

  // au clic du bouton des catégories
  const handleClickCat = () => {
    setIsOpen(!isOpen);
  };

  // au choix d'une autre catégorie
  const handleClicNewCat = (newCatName) => {
    setCategorySelected(newCatName);
    setDataRecipe({ ...dataRecipe, category: newCatName });
    setIsOpen(!isOpen);
  };

  // quand le user change les données des inputs, on update dataRecipe
  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataRecipe({ ...dataRecipe, [name]: value });
    handleErrorsInput(errors, name, value, setErrors);
  };

  // Au submit du form, on envoie dataUserUpdate avec la route PATCH
  const handleSubmit = (e) => {
    e.preventDefault();
    console.info("submit recipeId", recipeId);
    const fetchUpdateRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/recipes/${recipeId}`,
          {
            method: "PATCH",
            headers: {
              // eslint-disable-next-line prettier/prettier
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
          throw new Error(errorResponse.message || "Vérifiez vos données");
        }

        const message = await response.json();
        console.info("message", message);
        if (desktopOrMobile === "mobile") {
          navigate("/recipes/detail");
        } else if (desktopOrMobile === "desktop") {
          setComponentToShow("details recipe");
          setRecipeUpdated((prev) => !prev);
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
      alert("Vérifier vos données");
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
