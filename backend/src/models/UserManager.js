const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getAllUsers() {
    return this.database.query(`select * from ${this.table}`);
  }

  addUserWithGroup(
    userName,
    email,
    hashedPassword,
    avatar,
    nameGroup,
    role,
    catTransactionName,
    catDocName,
    catTaskName,
    catContactName
  ) {
    return this.database.query(
      `
  INSERT INTO ${this.table} (u_name, u_email, u_hashedPassword, u_avatar)
  VALUES (?, ?, ?, ?);
  SET @userId = LAST_INSERT_ID();
  INSERT INTO group_table (g_name) VALUES (?);
  SET @groupId = LAST_INSERT_ID();
  INSERT INTO user_group (ug_user_id, ug_group_id, ug_user_role)
  SELECT @userId, @groupId, ?;
  INSERT INTO category_transaction (ctra_name, ctra_group_id)
  SELECT ?, @groupId;
  INSERT INTO category_document (cd_name, cd_group_id)
  SELECT ?, @groupId;
  INSERT INTO category_task (cta_name, cta_user_id, cta_group_id)
  SELECT ?, @userId, @groupId;
  INSERT INTO category_contact (cc_name, cc_group_id)
  SELECT ?, @groupId;
  `,
      [
        userName,
        email,
        hashedPassword,
        avatar,
        nameGroup,
        role,
        catTransactionName,
        catDocName,
        catTaskName,
        catContactName,
      ]
    );
  }

  getUserByEmailWithoutHashedPassword(email) {
    return this.database.query(
      `SELECT u.u_id, u.u_name, u.u_active, ug.ug_group_id
      FROM user_group AS ug
      INNER JOIN user AS u ON ug.ug_user_id = u.u_id
      WHERE u_email = ?`,
      [email]
    );
  }

  getUserByEmail(email) {
    return this.database.query(
      `select * from ${this.table} where u_email = ?`,
      [email]
    );
  }
  // getUserByEmail(email) {
  //   return this.database.query(
  //     `SELECT u_id, u_name, u_email, u_hashedPassword,
  //     u_avatar, u_active, user_group.ug_user_role
  //    FROM ${this.table}
  //    JOIN user_group ON user.u_id = user_group.ug_user_id
  //    WHERE u_email = ?`,
  //     [email]
  //   );
  // }

  getUserById(id) {
    return this.database.query(
      `select u_id, u_name, u_email, u_avatar from ${this.table} where u_id = ?`,
      [id]
    );
  }

  updateUserWithoutPassword(id, userWithoutPassword) {
    // Object.keys prend pour paramètre un objet. Retourne un array avec les propriétés de l'objet
    // exemple : objet { "a", "b", "c"}, renvoie ["a", "b", "c"]
    // ici on récupère les propriétés que le user veut modifier (ex : name, email, etc.)
    const columns = Object.keys(userWithoutPassword);
    // idem mais on récupère uniquement les valeurs (ex : "Toto")
    const valuesColumns = Object.values(userWithoutPassword);
    // on crée une string avec les propriétés pour l'injecter dans la requête SQL
    // join transforme un array en string
    const values = columns.map((column) => `u_${column} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${values} where u_id = ?`,
      [...valuesColumns, id]
    );
  }

  updateUserUpload(id, avatar) {
    const column = Object.keys(avatar);
    const valueColumn = Object.values(avatar);
    return this.database.query(
      `update ${this.table} set u_${column} = ? where u_id = ?`,
      [...valueColumn, id]
    );
  }

  updateUserOnlyPassword(id, hashedPassword) {
    return this.database.query(
      `UPDATE ${this.table} set u_hashedPassword = ? where u_id=?`,
      [hashedPassword, id]
    );
  }

  desactivateUser(id, active) {
    return this.database.query(
      `UPDATE ${this.table} set u_active = ? where u_id =?`,
      [active, id]
    );
  }

  deleteUser(id) {
    return this.database.query(`delete from ${this.table} where u_id = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
