/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FormRecipe from "./FormRecipe";
import notify from "../Notify/Notify";
import { RecipeContext } from "../../context/RecipeContext";

// Fonction pour gérer les erreurs des inputs Create Recipe
// Réutilisable pour UpdateRecipe
export const handleErrorsInput = (errors, name, value, setErrors) => {
  const newErrors = { ...errors };
  switch (name) {
    case "name":
      newErrors.name = value.length > 50 ? "Limite de caractères dépassée" : "";
      break;
    case "time_preparation":
      if (!/^(?:(\d{1,2})h(?:([0-5]\d|min))?)$/.test(value)) {
        newErrors.time_preparation =
          "Format invalide. (Préférer: 0h30, 2h, 1h30)";
      } else {
        newErrors.time_preparation =
          value.length > 20 ? "Limite de caractères dépassée" : "";
      }
      break;
    case "list_ingredients":
      newErrors.list_ingredients =
        value.length > 255 ? "Limite de caractères dépassée" : "";
      break;
    case "nb_persons":
      if (Number.isNaN(Number(value)) || value < 1 || value > 999) {
        newErrors.nb_persons = "Entre un nombre entre 1 et 999";
      } else {
        newErrors.nb_persons = "";
      }
      break;
    default:
      break;
  }
  setErrors(newErrors);
};

export default function FormCreateRecipe({ media = "mobile" }) {
  // On récupère le RecipeConext
  const { setRecipeUpdated, setComponentToShow } = useContext(RecipeContext);
  const navigate = useNavigate();
  // Ouverture de l'input catégorie
  const [isOpen, setIsOpen] = useState(false);

  // Par défaut, la catégorie de la recette est celle existante
  const [categorySelected, setCategorySelected] = useState(null);

  // on initialise les propriétés avec les valeurs de la recette cliquée
  const [dataRecipe, setDataRecipe] = useState({
    name: "",
    description: "",
    nb_persons: "",
    list_ingredients: "",
    category: "",
    time_preparation: "",
  });

  // Gérer les erreurs d'inputs
  const [errors, setErrors] = useState({
    name: "",
    time_preparation: "",
    list_ingredients: "",
    nb_persons: "",
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

  const currentGroup = JSON.parse(localStorage.getItem("group"));

  const filteredCategories = recipesCategories.filter(
    (category) => category.name !== "Toutes"
  );

  // au clic du bouton des catégories
  const handleClickCat = () => {
    setIsOpen(!isOpen);
  };

  // au choix d'une autre catégorie
  const handleClicNewCat = (newCatName) => {
    if (newCatName === categorySelected) {
      setCategorySelected(null);
      setIsOpen(!isOpen);
    } else {
      setCategorySelected(newCatName);
      setDataRecipe({ ...dataRecipe, category: newCatName });
      setIsOpen(!isOpen);
    }
  };

  // quand le user change les données des inputs, on update dataRecipe
  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataRecipe({ ...dataRecipe, [name]: value });
    // Validation des données
    // On initialise un objet avec l'état actuel des errors
    // On met à jours les erreurs si besoin
    handleErrorsInput(errors, name, value, setErrors);
  };

  // Au submit du form, on envoie dataRecipe avec la route PATCH
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchCreateRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/recipes/groups/${currentGroup.ug_group_id}`,
          {
            method: "POST",
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
          notify("errorInputs", errorResponse || "Vérifiez vos données");
        }

        const message = await response.json();
        setDataRecipe({
          name: "",
          description: "",
          nb_persons: "",
          list_ingredients: "",
          category: "",
          time_preparation: "",
        });
        setCategorySelected(null);
        notify("success", message);

        setErrors({
          name: "",
          time_preparation: "",
          list_ingredients: "",
          nb_persons: "",
        });

        if (media === "mobile") {
          navigate("/recipes");
        }
        setRecipeUpdated((prev) => !prev);
        setComponentToShow(null);
      } catch (error) {
        console.info("Erreur pour créer la recette >>", error);
      }
    };
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
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    } else {
      fetchCreateRecipe();
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
