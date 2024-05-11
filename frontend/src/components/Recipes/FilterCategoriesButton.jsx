import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";

/* eslint-disable react/prop-types */
export default function FilterCategoriesButton({ id, name, onClick }) {
  const { filterSelected } = useContext(RecipeContext);

  return (
    <button
      key={id}
      aria-label={name}
      type="button"
      name={name}
      onClick={onClick}
      className={
        filterSelected === name // vérifie si filterSelected correspond à l'id du filtre
          ? "bg-cream border-2 border-red-default active:bg-red-lighter active:border-red-default text-red-default font-semibold rounded-[11px] h-full px-4" // Si oui, on lui applique la classe border rouge et fond cream
          : "bg-red-default border-2 border-red-default hover:bg-blue-default hover:border-blue-default active:border-red-default active:bg-red-lighter text-cream rounded-[11px] h-full px-4" // Si non, classe normale fond rouge
      }
    >
      {name}
    </button>
  );
}
