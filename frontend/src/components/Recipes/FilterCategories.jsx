/* eslint-disable react/prop-types */
import { useContext } from "react";
import FilterCategoriesButton from "./FilterCategoriesButton";
import { RecipeContext } from "../../context/RecipeContext";

export default function FilterCategories() {
  const { recipesCategories, setFilterSelected } = useContext(RecipeContext);

  // on met à jour le state filterSelected avec le nom récupéré
  const handleClick = (name) => {
    return setFilterSelected(name);
  };

  return (
    <div className="flex gap-2 flex-wrap p-6 lg:pl-10">
      {recipesCategories.map(({ id, name }) => (
        <FilterCategoriesButton
          key={id}
          id={id}
          name={name}
          onClick={() => handleClick(name)}
        />
      ))}
    </div>
  );
}
