/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useContext } from "react";
import MapRecipeDivMobile from "./MapRecipeDivMobile";
import MapRecipeDivPC from "./MapRecipeDivPC";
import { RecipeContext } from "../../context/RecipeContext";

export default function MapRecipesByCategory({ category }) {
  const { recipesGroup } = useContext(RecipeContext);

  return (
    <>
      <div className="md:hidden">
        {recipesGroup &&
          recipesGroup.length > 0 &&
          // on filtre les recettes correspondantes et on map pour créer un button chacune
          recipesGroup
            .filter(
              ({ r_category }) =>
                category === "Toutes" || r_category === category
            )
            .map(({ r_id, r_name, r_category, u_name }) => (
              <MapRecipeDivMobile
                key={r_id}
                r_id={r_id}
                r_name={r_name}
                r_category={r_category}
                u_name={u_name}
              />
            ))}
      </div>
      <div className="hidden md:block">
        {recipesGroup
          // on filtre les recettes correspondantes et on map pour créer un button chacune
          .filter(
            ({ r_category }) => category === "Toutes" || r_category === category
          )
          .map(({ r_id, r_name, r_category, u_name }) => (
            <MapRecipeDivPC
              key={r_id}
              r_id={r_id}
              r_name={r_name}
              r_category={r_category}
              u_name={u_name}
            />
          ))}
      </div>
    </>
  );
}
