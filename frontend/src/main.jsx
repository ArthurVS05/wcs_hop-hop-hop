/* eslint-disable camelcase */
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Error404 from "./pages/Error404";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import DocShare from "./pages/DocShare";
import GroupParams from "./pages/GroupParams";
import Home from "./pages/Home";
import List from "./pages/List";
import LostPassword from "./pages/LostPassword";
import Parameters from "./pages/Parameters";
import ProfileParams from "./pages/ProfileParams";
import Recipe from "./pages/Recipe";
import CreateGroup from "./pages/CreateGroup";
import UserProvider, { UserContext } from "./context/UserContext";
import SocketProvider from "./context/SocketContext";
import RecipeProvider from "./context/RecipeContext";
import RefusedAccess from "./components/Not-Connected/RefusedAccess";
import EditTask from "./components/TodoList/EditTask";
import CreateContact from "./pages/CreateContact";
import UpdateContact from "./pages/UpdateContact";
import ModifyRecipe from "./components/Recipes/ModifyRecipe";
import CreateRecipe from "./components/Recipes/CreateRecipe";
import ShowRecipeDetailsMobile from "./components/Recipes/ShowRecipeDetailsMobile";
import ChatBox from "./components/Chat/ChatBox";

// PrivateApp englobe toutes nos routes privées
// on y vérifie si le user est connecté
// sinon on renvoie à la page de connexion
function PrivateApp() {
  // on récupère le UserContext
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  // on get by id le user connecté grâce à son token
  // si oui, on reçoit isLogged = true
  useEffect(() => {
    fetch("http://localhost:3310/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.info("Error fetching user data:", err));
  }, [setUser]);

  // Vérifie si l'utilisateur est connecté et si le chemin de l'URL n'est pas "/chat"
  const shouldDisplayChat =
    user.isLogged &&
    localStorage.getItem("group") &&
    location.pathname !== "/chat";

  return (
    <main>
      {user.isLogged && <Outlet />}
      {!user.isLogged && <RefusedAccess />}
      {shouldDisplayChat && <ChatBox />}
    </main>
  );
}

const router = createBrowserRouter([
  // Routes publiques
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/lostpassword",
    element: <LostPassword />,
  },

  {
    path: "*",
    element: <Error404 />,
  },

  // Routes privées
  {
    element: <PrivateApp />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/calendar",
        element: <Calendar />,
      },

      {
        path: "/budget",
        element: <Budget />,
      },

      {
        path: "/todolist",
        element: <List />,
      },

      {
        path: "/todolist/edittask",
        element: <EditTask />,
      },

      {
        path: "/recipes",
        element: <Recipe />,
      },

      {
        path: "/recipes/detail",
        element: <ShowRecipeDetailsMobile />,
      },
      {
        path: "/recipes/update",
        element: <ModifyRecipe />,
      },
      {
        path: "/recipes/create",
        element: <CreateRecipe />,
      },
      {
        path: "/contacts",
        element: <Contact />,
      },

      {
        path: "/documents",
        element: <DocShare />,
      },

      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/settings",
        element: <Parameters />,
      },

      {
        path: "/profile",
        element: <ProfileParams />,
      },

      {
        path: "/group",
        element: <GroupParams />,
      },
      {
        path: "/create-group",
        element: <CreateGroup />,
      },
      {
        path: "/add-contact",
        element: <CreateContact />,
      },
      {
        path: "/update-contact/:id",
        element: <UpdateContact />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <SocketProvider>
        <RecipeProvider>
          <RouterProvider router={router} />
        </RecipeProvider>
      </SocketProvider>
    </UserProvider>
  </React.StrictMode>
);
