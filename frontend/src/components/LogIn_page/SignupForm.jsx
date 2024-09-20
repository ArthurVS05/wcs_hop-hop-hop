/* eslint-disable no-alert */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../Notify/Notify";
import SignupFormSubmitButton from "./SignupFormSubmitButton";
import LinkToLoginOrSignup from "./LinkToLoginOrSignup";
import BackLink from "./BackHomeLink";
import SignupFormTitle from "./SignupFormTitle";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

export default function SignupForm() {
  // Gérer les données rentrées dans le formulaire
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Gérer les erreurs d'inputs
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // on importe useNavigate
  const navigate = useNavigate();

  // Vérification pour exclure les séquences spécifiques
  const containsDoubleDash = (value) => /--/.test(value);

  // On gère les erreurs si input invalide
  const handleErrorsInput = (name, value) => {
    const newErrors = { ...errors };
    let regex;
    switch (name) {
      case "name":
        newErrors.name =
          value.length > 20
            ? "Le prénom ne peut pas dépasser 20 caractères."
            : "";
        break;
      case "email":
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email =
          !regex.test(value) || value.length > 50
            ? "Veuillez saisir une adresse email valide."
            : "";
        break;
      case "password":
        regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-]{8,}$/; // eslint-disable-next-line no-case-declarations
        const isValidPassword = regex.test(value);
        newErrors.password = !isValidPassword
          ? "Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
          : "";

        if (containsDoubleDash(value)) {
          newErrors.password =
            "Le mot de passe ne peut pas contenir de double tiret (--).";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // quand le user rentre des données dans le formulaire, on update notre state dataForm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
    handleErrorsInput(name, value);
  };

  // au submit du formulaire, on envoie dataForm au backend pour créer le user
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchCreateUser = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          if (errorResponse.errno === 1062) {
            notify("errorInputs", "e-mail déjà utilisé");
          } else {
            notify(
              "errorCreation",
              errorResponse || "Erreur pour créer le compte"
            );
          }
        } else {
          notify("success", "Compte créé, redirection vers la page connexion");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.info("erreur pour créer le user :>> ", error);
      }
    };

    // Vérifie et met à jour les erreurs pour chaque champ du formulaire
    handleErrorsInput("name", dataForm.name);
    handleErrorsInput("email", dataForm.email);
    handleErrorsInput("password", dataForm.password);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Vérifie s'il y a des erreurs dans les données du formulaire
    if (hasErrors) {
      notify("errorInputs", "Vérifiez vos données");
    } else {
      fetchCreateUser();
    }
  };

  return (
    <div>
      <BackLink />
      <SignupFormTitle />
      <form
        className="flex flex-col text-blue-default text-xl mx-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="font-bold -mt-2">
          Prénom <RedStarForRequiredInput />
        </label>
        <input
          id="name"
          name="name"
          value={dataForm.name}
          type="text"
          placeholder="Quel est votre prénom ?"
          required
          className={`border ${
            errors.name &&
            "border-red-default text-red-default focus:border-red-default"
          } border border-solid border-blue-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-blue-default focus:border-blue-default focus:border-2 focus:outline-none`}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-default text-[1rem] italic">{errors.name}</p>
        )}
        <label htmlFor="email" className="font-bold mt-4">
          Adresse e-mail <RedStarForRequiredInput />
        </label>
        <input
          id="email"
          type="text"
          name="email"
          value={dataForm.email}
          required
          placeholder="nom@exemple.com"
          className={`border ${
            errors.email &&
            "border-red-default text-red-default focus:border-red-default"
          } border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default focus:border-blue-default focus:border-2 focus:outline-none`}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-default text-[1rem] italic">{errors.email}</p>
        )}
        <label htmlFor="password" className="font-bold mt-4">
          Mot de passe <RedStarForRequiredInput />
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={dataForm.password}
          placeholder="Top secret"
          required
          className={`${
            errors.password &&
            "border-red-default text-red-default focus:border-red-default"
          } border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default focus:border-blue-default focus:border-2 focus:outline-none`}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-default text-[0.85rem] italic flex flex-wrap max-w-[20rem] leading-[1.2]">
            {errors.password}
          </p>
        )}
        <SignupFormSubmitButton />
      </form>
      <LinkToLoginOrSignup
        to="/login"
        text=" J'ai déjà un compte : me connecter"
      />
    </div>
  );
}
