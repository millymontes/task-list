import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  let sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  let hashedPassword = await bcrypt.hash(password, 10);
  let {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  let sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  let {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  let sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  let {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
