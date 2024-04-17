/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FooterBack from "./FooterBack";
import FormUpdateRecipe from "./FormUpdateRecipe";
import ButtonAccessRefused from "../Not-Connected/ButtonAccessRefused";

export default function ModifyRecipe({ setRecipeUpdated, setComponentToShow }) {
  const recipe = JSON.parse(localStorage.getItem("recipeSelected"));

  return (
    <div className="font-Neue-Kabel bg-red-default lg:bg-opacity-0">
      <header className="lg:hidden">
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </header>
      <main className="lg:pt-5 rounded-t-3xl lg:rounded-none bg-cream lg:bg-opacity-0  shadow-top flex flex-col items-center min-h-screen">
        <h1 className="bg-red-default mx-auto text-cream text-xl rounded-[12px] h-fit w-fit px-4 my-5">
          Modifier la recette
        </h1>

        {recipe && (
          <>
            <div className="lg:hidden">
              <FormUpdateRecipe
                setRecipeUpdated={setRecipeUpdated}
                setComponentToShow={setComponentToShow}
                desktopOrMobile="mobile"
              />
            </div>
            <div className="hidden lg:block">
              <FormUpdateRecipe
                setRecipeUpdated={setRecipeUpdated}
                setComponentToShow={setComponentToShow}
                desktopOrMobile="desktop"
              />
            </div>
          </>
        )}

        {!recipe && (
          <div className="flex flex-col justify-center items-center my-20">
            <p>Vous n'avez pas sélectionné de recette</p>
            <ButtonAccessRefused
              to="/recipes"
              text="Retourner aux recettes"
              colorBg="bg-red-default"
            />
          </div>
        )}
      </main>

      <FooterBack text="Retour" to="/recipes/detail" />
    </div>
  );
}
