const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

const groupControllers = require("./controllers/groupControllers");

const transactionControllers = require("./controllers/transactionControllers");

const eventControllers = require("./controllers/eventControllers");

const remindEventControllers = require("./controllers/remindEventControllers");

const taskControllers = require("./controllers/taskControllers");

const documentControllers = require("./controllers/documentControllers");

const recipeControllers = require("./controllers/recipeControllers");

const contactControllers = require("./controllers/contactControllers");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const hashPassword = require("./services/hashedPassword");
const verifyToken = require("./services/verifyToken");
const hashPasswordWithoutUpload = require("./services/hashedPasswordWithoutUpload");
const upload = require("./services/upload");
const uploadDoc = require("./services/uploadDoc");
const isAdmin = require("./services/isAdmin");
const userExistsAndActive = require("./services/userExistsAndActive");
const isMin2AdminInGroup = require("./services/isMin2AdminInGroup");
const categoryExists = require("./services/categoryExists");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* *************************************************************************
USER ENTITY
*************************************************************************** */

// Route to get a list of users
router.get("/users", verifyToken, userControllers.read);
// Route to create a user and his group
router.post("/users", upload, hashPassword, userControllers.create);
// Créer un user et l'ajouter dans un groupe par lien d'invitation
// router.post(
//   "/users/group/:id",
//   upload,
//   hashPassword,
//   userControllers.createFromInvite
// );
// Authentification
router.post("/login", userControllers.readByEmail);
// logout
router.post("/logout", userControllers.logout);
// read user by id
router.get("/me", verifyToken, userControllers.readById);
// update user without password with upload
router.patch(
  "/users/update-upload",
  verifyToken,
  upload,
  userControllers.updateAvatar
);
// update user without password and without upload
router.patch("/users/update", verifyToken, userControllers.updateWithoutUpload);
// update user password
router.patch(
  "/users/update-password",
  verifyToken,
  hashPasswordWithoutUpload,
  userControllers.updatePassword
);

// désactiver son compte
router.patch(
  "/users/desactivate",
  verifyToken,
  userControllers.desactivateUser
);

// delete user
router.delete("/users", verifyToken, userControllers.deleteUser);

/* *************************************************************************
 GROUP ENTITY
*************************************************************************** */
// créer un groupe
router.post("/groups", verifyToken, groupControllers.create);
// récupérer les groupes du user
router.get("/groups/users", verifyToken, groupControllers.read);
// récupérer les users d'un groupe
router.get("/groups/:id/users", verifyToken, groupControllers.readUsersOfGroup);
// modifier le nom du groupe
router.patch("/groups/update/:id", verifyToken, groupControllers.update);
// suppprimer un groupe
router.delete(
  "/groups/:id",
  verifyToken,
  isAdmin,
  groupControllers.deleteGroup
);

// Ajouter un user dans le groupe
router.post(
  "/groups/:id/users",
  verifyToken,
  isAdmin,
  userExistsAndActive,
  groupControllers.addUserInGroup
);

// Modifier le rôle du user dans le groupe
router.patch(
  "/groups/:id/users/:idUser",
  verifyToken,
  isAdmin,
  groupControllers.updateRoleUser
);

// Supprimer un user du groupe
router.delete(
  "/groups/:id/users/:idUser",
  verifyToken,
  isAdmin,
  isMin2AdminInGroup,
  groupControllers.deleteUserInGroup
);
/* *************************************************************************
TRANSACTION ENTITY
*************************************************************************** */
// Créer une transaction dans un groupe
router.post(
  "/transactions/groups/:id",
  verifyToken,
  transactionControllers.create
);

// Créer une transaction avec une nouvelle catégorie dans un groupe
router.post(
  "/transactions/groups/:id/categories",
  verifyToken,
  categoryExists,
  transactionControllers.createWithNewCategory
);
// Récupérer toutes les transactions d'un groupe
router.get(
  "/transactions/groups/:id",
  verifyToken,
  transactionControllers.read
);

// Récupérer les transactions d'un groupe par user
router.get(
  "/transactions/groups/:id/users",
  verifyToken,
  transactionControllers.readByUser
);

// Modifier une transaction
router.patch("/transactions/:id", verifyToken, transactionControllers.update);

// Supprimer une transaction
router.delete(
  "/transactions/:id",
  verifyToken,
  transactionControllers.deleteTransaction
);

/* *************************************************************************
CATEGORY TRANSACTION ENTITY
*************************************************************************** */
router.get(
  "/transactions-categories/groups/:id",
  verifyToken,
  transactionControllers.getCategoriesByGroup
);

router.patch(
  "/transactions-categories/:id",
  verifyToken,
  transactionControllers.updateCategory
);

// Désactiver une catégorie
router.patch(
  "/transactions-categories/desactivate/:id",
  verifyToken,
  transactionControllers.desactivateCategory
);

/* *************************************************************************
EVENT ENTITY
*************************************************************************** */
// Créer un Event
router.post("/events/groups/:id", verifyToken, eventControllers.create);

// Récupérer tous les event d'un groupe
router.get("/events/groups/:id", verifyToken, eventControllers.getEventByGroup);

// Récupérer un event par son id
router.get("/events/:id", verifyToken, eventControllers.getEventById);

// update un event
router.patch("/events/:id", verifyToken, eventControllers.updateEvent);

// Supprimer un Event
router.delete("/events/:id", verifyToken, eventControllers.deleteEvent);

/* *************************************************************************
REMINDER EVENT ENTITY
*************************************************************************** */

// Créer un reminder
router.post(
  "/reminders/events/:id",
  verifyToken,
  remindEventControllers.create
);

// Récupérer un reminder par id
router.get("/reminders/:id", verifyToken, remindEventControllers.readById);

// Update un reminder
router.patch("/reminders/:id", verifyToken, remindEventControllers.update);

// Récupérer les reminders de l'event
router.get(
  "/reminders/events/:id",
  verifyToken,
  remindEventControllers.readByEventId
);

// Supprimer un reminder
router.delete(
  "/reminders/:id",
  verifyToken,
  remindEventControllers.deleteReminder
);

/* *************************************************************************
TASK ENTITY
*************************************************************************** */

// Créer une task
router.post(
  "/tasks/groups/:groupId/categories/:catTaskId",
  verifyToken,
  taskControllers.create
);

// Récupérer les tâches d'une to do list
router.get("/tasks/categories/:id", verifyToken, taskControllers.getByCategory);

// Supprimer une task
router.delete("/tasks/:id", verifyToken, taskControllers.deleteTask);

// Update une task
router.patch("/tasks/:id", verifyToken, taskControllers.updateTask);

// Créer une catégorie task

router.post(
  "/tasks-categories/groups/:id",
  verifyToken,
  taskControllers.createCategory
);

// Récupérer la liste des catégories task publiques par groupe
router.get(
  "/tasks-categories/groups/:id",
  verifyToken,
  taskControllers.getPublicCatByGroup
);

// Récupérer les tasks list privées du user dans le groupe
router.get(
  "/tasks-categories/groups/:id/users",
  verifyToken,
  taskControllers.getPrivateCatByUserByGroup
);

// Update une category_task
router.patch(
  "/tasks-categories/:id",
  verifyToken,
  taskControllers.updateCategory
);

// Supprimer une category_task
router.delete(
  "/tasks-categories/:id",
  verifyToken,
  taskControllers.deleteCategory
);

/* *************************************************************************
DOCUMENT ENTITY
*************************************************************************** */

// Créer un document
router.post(
  "/documents/groups/:id/categories/:catId",
  verifyToken,
  uploadDoc,
  documentControllers.createDocument
);
// Récupérer tous les documents d'un dossier   /documents
router.get(
  "/documents/categories/:id",
  verifyToken,
  documentControllers.getDocumentByCat
);
// Récupérer les docs privés du User pour la catégorie "Privée"
router.get(
  "/documents/users/categories/:id",
  verifyToken,
  documentControllers.getPrivateDocByUserByGroup
);

// Modifier un document  | /documents/:id
router.patch("/documents/:id", verifyToken, documentControllers.updateDocument);
// Supprimer un document      /documents/:id
router.delete(
  "/documents/:id",
  verifyToken,
  documentControllers.deleteDocument
);
/* *************************************************************************
CATEGORY DOCUMENT ENTITY
*************************************************************************** */
// Créer une catégorie de documents
router.post(
  "/documents-categories/groups/:id",
  verifyToken,
  documentControllers.createCategory
);

// Récupérer toutes les catégories de documents du groupe
router.get(
  "/documents-categories/groups/:id",
  verifyToken,
  documentControllers.getCategoriesByGroup
);

// Modifier une catégorie de documents       /documents-categories/:id
router.patch(
  "/documents-categories/:id",
  verifyToken,
  documentControllers.updateCategory
);

// Supprimer une catégorie de documents   /documents-categories/:id
router.delete(
  "/documents-categories/:id",
  verifyToken,
  documentControllers.deleteCategory
);

/* *************************************************************************
RECIPE ENTITY
*************************************************************************** */
// Créer une recette
router.post("/recipes/groups/:id", verifyToken, recipeControllers.createRecipe);

//  Récupérer toutes les recettes
router.get(
  "/recipes/groups/:id",
  verifyToken,
  recipeControllers.getRecipeByGroup
);

// Modifier une recette
router.patch("/recipes/:id", verifyToken, recipeControllers.updateRecipe);

// Récupérer une recette
router.get("/recipes/:id", verifyToken, recipeControllers.getRecipeById);

// Supprimer une recette
router.delete("/recipes/:id", verifyToken, recipeControllers.deleteRecipe);

/* *************************************************************************
CONTACT ENTITY
*************************************************************************** */

// Créer un contact
router.post(
  "/contacts/groups/:id/category/:catId",
  verifyToken,
  contactControllers.createContact
);
// /contacts/:id                             Récupérer un contact
// /contacts/groups/:id                      Récupérer tous les contacts
// /contacts/:id                             Modifier un contact
// /contacts/:id                             Supprimer un contact

module.exports = router;
