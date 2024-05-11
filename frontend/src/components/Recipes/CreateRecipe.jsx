/* eslint-disable react/prop-types */
// import { ToastContainer } from "react-toastify";

import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FooterBack from "./FooterBack";
import FormCreateRecipe from "./FormCreateRecipe";

export default function CreateRecipe({ media }) {
  return (
    <div className="font-Neue-Kabel bg-red-default md:bg-opacity-0">
      <div className="md:hidden">
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </div>
      <main className="rounded-t-3xl lg:mt-5 bg-cream md:bg-opacity-0 shadow-top md:shadow-none flex flex-col lg:w-3/4 mx-auto">
        <h1 className="bg-red-default mx-auto text-cream text-xl rounded-[12px] h-fit w-fit px-4 my-5">
          Ajouter une nouvelle recette
        </h1>
        <FormCreateRecipe media={media} />
      </main>

      <FooterBack text="Retourner aux recettes" to="/recipes" />
    </div>
  );
}
