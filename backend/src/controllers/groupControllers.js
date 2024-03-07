const tables = require("../tables");

require("dotenv").config();

// créer un groupe
const create = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const id = req.payload;
    // on récupère le nom choisi par le user pour le nouveau groupe
    const { name } = req.body;
    const role = "admin";
    // on stock la réponse du manager
    const [results] = await tables.group_table.createGroup(id, name, role);
    // la réponse nous renvoie un tableau avec 2 objets, un objet concernant la création du nouveau group et un objet concernant les ajouts dans user_group
    // on vérifie donc la mise à jour dans les 2 objets
    if (results[0].affectedRows && results[1].affectedRows) {
      res.status(201).send("Group created");
    } else {
      res.status(401).send("Error during the group's creation");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// get les groups du user
const read = async (req, res) => {
  try {
    // on récupère l'id du user dans le payload du token
    const id = req.payload;
    // on récupère la réponse du manager
    const [results] = await tables.group_table.getGroupsOfUser(id);
    // on vérifie si on reçoit bien un tableau avec des données
    if (results.length) {
      res.status(201).json({
        message: "Liste des groupes de l'utilisateur récupérée",
        results,
      });
    } else {
      res.status(401).send("Erreur pour récupérer les données");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// get les users d'un group
// const readUsers = async (req, res) => {
//   try {
//     const { groupId } = req.body;
//     const [results] = await tables.group_table.updateGroup(groupId);
//     if (results.length) {
//       res.status(201).json({
//         message: "Liste des utilisateurs du groupe récupérée",
//         results,
//       });
//     } else {
//       res.status(401).send("Erreur pour récupérer les données");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const update = async (req, res) => {
  try {
    const { groupId, name } = req.body;
    const [results] = await tables.group_table.updateGroup(groupId, name);

    if (results.affectedRows) {
      res.status(201).send("Le nom a été modifié");
    } else {
      res.status(401).send("Erreur modification!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteGroup = async (req, res) => {
  try {
    // on récupère l'id du group à supprimer dans le corps de la requête
    const { groupId } = req.body;
    // on envoit au manager l'id du group et on stocke la réponse
    const [result] = await tables.group_table.deleteGroup(groupId);

    // si la suppression a fonctionné, une ligne a été affectée
    if (result.affectedRows) {
      res.status(201).send("Le groupe a été supprimé");
    } else {
      res.status(401).send("Erreur, le groupe n'a pas été supprimé");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  read,
  update,
  deleteGroup,
  // readUsers,
};
