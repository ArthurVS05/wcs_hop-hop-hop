const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "group_table" });
  }

  createGroup(
    nameGroup,
    idUser,
    role,
    catTransactionName,
    catDocName,
    catTaskName,
    catContactName
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (g_name) VALUES (?);
   SET @groupId = LAST_INSERT_ID();
   INSERT INTO user_group (ug_user_id, ug_group_id, ug_user_role)
   SELECT ?, @groupId, ?;
   INSERT INTO category_transaction (ctra_name, ctra_group_id)
   SELECT ?, @groupId;
   INSERT INTO category_document (cd_name, cd_group_id)
   SELECT ?, @groupId;
   INSERT INTO category_task (cta_name, cta_user_id, cta_group_id)
   SELECT ?, ?, @groupId;
   INSERT INTO category_contact (cc_name, cc_group_id)
   SELECT ?, @groupId;
     `,
      [
        nameGroup,
        idUser,
        role,
        catTransactionName,
        catDocName,
        catTaskName,
        idUser,
        catContactName,
      ]
    );
  }

  getGroupsOfUser(userId) {
    return this.database.query(
      `SELECT group_table.g_name, user_group.ug_user_id, user_group.ug_group_id   
      FROM user_group     
    JOIN user ON user_group.ug_user_id = user.u_id
    JOIN group_table ON user_group.ug_group_id = group_table.g_id
    WHERE user.u_id = ?`,
      [userId]
    );
  }

  getUsersofGroup(groupId) {
    return this.database.query(
      `SELECT user.u_name, user_group.ug_user_id, user_group.ug_user_role, user_group.ug_group_id, group_table.g_name
    FROM user_group
    JOIN user ON user_group.ug_user_id = user.u_id
    JOIN group_table ON user_group.ug_group_id = group_table.g_id
    WHERE ug_group_id = ? `,
      [groupId]
    );
  }

  updateGroup(groupId, groupName) {
    return this.database.query(
      `UPDATE ${this.table} SET g_name = ? WHERE g_id = ?`,
      [groupName, groupId]
    );
  }

  deleteGroup(groupId) {
    return this.database.query(
      `DELETE FROM ${this.table} 
       WHERE g_id = ?`,
      [groupId]
    );
  }
}

module.exports = GroupManager;
